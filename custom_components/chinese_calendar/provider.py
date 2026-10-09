"""lunar-python 封装：农历/节气/干支/法定节假日/纪念日换算。

所有函数为纯计算/同步，需在 executor 线程中调用。
"""
from __future__ import annotations

import datetime
import logging
from datetime import date, timedelta

from lunar_python import Lunar, Solar
from lunar_python.util import HolidayUtil

from .const import (
    STATUS_ADJUSTED_WORKDAY,
    STATUS_CN,
    STATUS_HOLIDAY,
    STATUS_WEEKEND,
    STATUS_WORKDAY,
    WEEKDAY_CN,
)

_LOGGER = logging.getLogger(__name__)

_CN_TZ = timedelta(hours=8)

_applied_extra: str | None = None


def today_cn() -> date:
    """UTC+8 的今天。"""
    return (datetime.datetime.utcnow() + _CN_TZ).date()


def apply_holiday_extra(extra: str) -> None:
    """应用节假日增量/修正数据（幂等）。"""
    global _applied_extra
    if not extra or extra == _applied_extra:
        return
    try:
        HolidayUtil.fix(None, extra)
        _applied_extra = extra
    except Exception as exc:  # noqa: BLE001
        _LOGGER.warning("holiday_extra 应用失败: %s", exc)


def lunar_from_solar(d: date) -> Lunar:
    """公历 → 农历。"""
    return Solar.fromYmd(d.year, d.month, d.day).getLunar()


def lunar_to_solar(year: int, month: int, day: int) -> date:
    """农历(非闰) → 公历 date。"""
    s = Lunar.fromYmd(year, month, day).getSolar()
    return date(s.getYear(), s.getMonth(), s.getDay())


def holiday_status(d: date) -> tuple[str, str, bool]:
    """返回 (status, holiday_name, is_adjusted)。"""
    h = HolidayUtil.getHoliday(d.year, d.month, d.day)
    if h is None:
        return (STATUS_WEEKEND if d.weekday() >= 5 else STATUS_WORKDAY, "", False)
    if h.isWork():
        # 调休补班：保留关联节假日名，供卡片 tooltip/标注使用
        return (STATUS_ADJUSTED_WORKDAY, h.getName(), True)
    return (STATUS_HOLIDAY, h.getName(), False)


def next_holiday(today: date) -> dict | None:
    """最近法定节假日 {name, date, days_left}；无则 None。"""
    cands: list[tuple[date, str]] = []
    for y in (today.year, today.year + 1):
        try:
            hs = HolidayUtil.getHolidays(y)
        except Exception:  # noqa: BLE001
            continue
        for h in hs or []:
            if h.isWork():
                continue
            d = _parse_iso(h.getDay())
            if d is None or d < today:
                continue
            cands.append((d, h.getName()))
    if not cands:
        return None
    d, name = min(cands, key=lambda x: x[0])
    return {"name": name, "date": d.isoformat(), "days_left": (d - today).days}


def _parse_iso(s: str) -> date | None:
    try:
        return date.fromisoformat(s)
    except Exception:  # noqa: BLE001
        return None


def _days_in_month(year: int, month: int) -> int:
    nxt = date(year + 1, 1, 1) if month == 12 else date(year, month + 1, 1)
    return (nxt - date(year, month, 1)).days


def _parse_anniversary(item: dict) -> dict:
    """解析单条纪念日，返回规范化字段；非法则抛 ValueError。"""
    name = str(item.get("name", "")).strip()
    atype = str(item.get("type", "solar"))
    raw = str(item.get("date", "")).strip()
    if atype not in ("solar", "lunar"):
        atype = "solar"
    if len(raw) not in (4, 8):
        raise ValueError("date 需为 MMDD 或 YYYYMMDD")
    has_year = len(raw) == 8
    year = int(raw[:4]) if has_year else None
    month = int(raw[-4:-2])
    day = int(raw[-2:])
    if not 1 <= month <= 12 or not 1 <= day <= 31:
        raise ValueError("月份/日期不合法")
    if not name:
        raise ValueError("name 不能为空")
    return {
        "name": name,
        "type": atype,
        "date": raw,
        "has_year": has_year,
        "year": year,
        "month": month,
        "day": day,
    }


def _parse_anniversaries(items) -> list[dict]:
    parsed: list[dict] = []
    for item in items or []:
        try:
            parsed.append(_parse_anniversary(item))
        except Exception:  # noqa: BLE001
            continue
    return parsed


def anniversary_full_date(p: dict, today: date) -> tuple[date, int | None]:
    """返回 (下一次公历发生日, age)；age=None 表示不带年份。"""
    m, d = p["month"], p["day"]

    if p["type"] == "lunar":
        occurrence_year = lunar_from_solar(today).getYear()
        full = lunar_to_solar(occurrence_year, m, d)
        if full < today:
            occurrence_year += 1
            full = lunar_to_solar(occurrence_year, m, d)
        age = (occurrence_year - p["year"]) if p["has_year"] else None
        return full, age

    occurrence_year = today.year
    full = date(occurrence_year, m, d)
    if full < today:
        occurrence_year += 1
        full = date(occurrence_year, m, d)
    age = (occurrence_year - p["year"]) if p["has_year"] else None
    return full, age


def resolve_anniversaries(parsed: list[dict], today: date) -> list[dict]:
    """解析纪念日，返回未来项（按 days_left 升序）。"""
    result: list[dict] = []
    for p in parsed:
        try:
            full, age = anniversary_full_date(p, today)
        except Exception:  # noqa: BLE001
            continue
        days_left = (full - today).days
        if days_left < 0:
            continue
        age_label = ""
        if age is not None:
            age_label = f"{age}周岁" if "生日" in p["name"] else f"{age}周年"
        result.append({
            "id": f"{p['type']}-{p['date']}-{p['name']}",
            "name": p["name"],
            "type": p["type"],
            "date": p["date"],
            "has_year": p["has_year"],
            "year": p["year"],
            "month": p["month"],
            "day": p["day"],
            "full_date": full.isoformat(),
            "days_left": days_left,
            "age": age,
            "age_label": age_label,
        })
    result.sort(key=lambda x: x["days_left"])
    return result


def festivals_of(solar: Solar, lunar: Lunar) -> list[str]:
    """今日公历+农历节日名（去重、保序）。"""
    out: list[str] = []
    for name in (
        list(solar.getFestivals())
        + list(solar.getOtherFestivals())
        + list(lunar.getFestivals())
        + list(lunar.getOtherFestivals())
    ):
        if name and name not in out:
            out.append(name)
    return out


def term_of(lunar: Lunar) -> tuple[str, str]:
    """返回 (今日节气名, 交接时刻)；无则 ('', '')。"""
    name = lunar.getJieQi() or ""
    if not name:
        return "", ""
    try:
        t = lunar.getJieQiTable().get(name)
        if t:
            return name, "%04d-%02d-%02d %02d:%02d:%02d" % (
                t.getYear(), t.getMonth(), t.getDay(),
                t.getHour(), t.getMinute(), t.getSecond(),
            )
    except Exception:  # noqa: BLE001
        pass
    return name, ""


def _parse_custom_holidays(items) -> list[dict]:
    """解析自定义假日，返回 [{name, month, day}]。"""
    result: list[dict] = []
    for item in items or []:
        try:
            name = str(item.get("name", "")).strip()
            raw = str(item.get("date", "")).strip()
            if len(raw) != 4:
                continue
            month = int(raw[:2])
            day = int(raw[2:])
            if not (1 <= month <= 12 and 1 <= day <= 31):
                continue
            if not name:
                continue
            result.append({"name": name, "month": month, "day": day})
        except Exception:  # noqa: BLE001
            continue
    return result


def _custom_holiday_name(dd: date, custom_holidays) -> str:
    """返回当天自定义假日名，无则空串。"""
    for h in custom_holidays or []:
        if (dd.month, dd.day) == (h["month"], h["day"]):
            return h["name"]
    return ""


def _month_day(dd: date, today: date, parsed: list[dict], custom_holidays: list[dict]) -> dict:
    solar = Solar.fromYmd(dd.year, dd.month, dd.day)
    lunar = solar.getLunar()
    status, holiday_name, _ = holiday_status(dd)
    term, _ = term_of(lunar)

    lm = abs(lunar.getMonth())
    ld = lunar.getDay()
    names: list[str] = []
    for p in parsed:
        if p["type"] == "solar":
            if (dd.month, dd.day) == (p["month"], p["day"]):
                names.append(p["name"])
        else:
            if (lm, ld) == (p["month"], p["day"]):
                names.append(p["name"])

    return {
        "day": dd.day,
        "date": dd.isoformat(),
        "weekday": dd.weekday(),
        "lunar": {"year": lunar.getYear(), "month": lm, "day": ld, "is_leap": lunar.getMonth() < 0},
        "lunar_day_cn": lunar.getDayInChinese(),
        "term": term,
        "holiday_status": status,
        "holiday_name": holiday_name,
        "custom_holiday_name": _custom_holiday_name(dd, custom_holidays),
        "festivals": festivals_of(solar, lunar),
        "anniversaries": names,
        "is_today": dd == today,
    }


def build_month(
    year: int,
    month: int,
    today: date,
    anniversaries,
    holiday_extra: str = "",
    custom_holidays=None,
) -> dict:
    """构建指定月份的日历数据（供实体属性与 get_month 服务调用）。"""
    apply_holiday_extra(holiday_extra)
    parsed = _parse_anniversaries(anniversaries)
    ch = _parse_custom_holidays(custom_holidays)
    days_in_month = _days_in_month(year, month)
    first_weekday = date(year, month, 1).weekday()
    month_days = [
        _month_day(date(year, month, d), today, parsed, ch)
        for d in range(1, days_in_month + 1)
    ]
    return {
        "year": year,
        "month": month,
        "days_in_month": days_in_month,
        "first_weekday": first_weekday,
        "days": month_days,
    }


def build_attributes(anniversaries, holiday_extra: str, today: date, custom_holidays=None) -> dict:
    """§2 全量属性 + next_holiday/next_anniversary。"""
    apply_holiday_extra(holiday_extra)
    ch = _parse_custom_holidays(custom_holidays)

    solar = Solar.fromYmd(today.year, today.month, today.day)
    lunar = solar.getLunar()
    weekday = today.weekday()  # 0=周一
    status, holiday_name, is_adjusted = holiday_status(today)
    term, term_time = term_of(lunar)

    parsed = _parse_anniversaries(anniversaries)
    anniv_list = resolve_anniversaries(parsed, today)

    next_anniv = None
    if anniv_list:
        a = anniv_list[0]
        next_anniv = {
            "name": a["name"],
            "date": a["full_date"],
            "days_left": a["days_left"],
            "type": a["type"],
            "age_label": a["age_label"],
        }

    return {
        "solar_date": today.isoformat(),
        "solar_date_cn": "%d年%d月%d日" % (today.year, today.month, today.day),
        "solar": {"year": today.year, "month": today.month, "day": today.day},
        "weekday": weekday,
        "weekday_cn": WEEKDAY_CN[weekday],
        "week_number": today.isocalendar()[1],
        "lunar": {
            "year": lunar.getYear(),
            "month": abs(lunar.getMonth()),
            "day": lunar.getDay(),
            "is_leap": lunar.getMonth() < 0,
        },
        "lunar_date_cn": (
            f"{lunar.getYearInGanZhi()}{lunar.getYearShengXiao()}年 "
            f"{lunar.getMonthInChinese()}{lunar.getDayInChinese()}"
        ),
        "lunar_month_cn": lunar.getMonthInChinese(),
        "lunar_day_cn": lunar.getDayInChinese(),
        "term": term,
        "term_time": term_time,
        "holiday_status": status,
        "holiday_status_cn": STATUS_CN[status],
        "holiday_name": holiday_name,
        "custom_holiday_name": _custom_holiday_name(today, ch),
        "is_adjusted_workday": is_adjusted,
        "festivals": festivals_of(solar, lunar),
        "next_holiday": next_holiday(today),
        "next_anniversary": next_anniv,
        "anniversaries": anniv_list,
        "month": build_month(today.year, today.month, today, anniversaries, holiday_extra, custom_holidays),
    }
