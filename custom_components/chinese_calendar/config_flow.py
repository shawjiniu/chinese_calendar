"""Config flow for chinese_calendar。"""
from __future__ import annotations

import re

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv

from .const import DEFAULT_NAME, DOMAIN

_SINGLETON = DOMAIN


def _parse_anniversaries_text(text: str) -> list[dict]:
    """解析 '名称|类型|日期' 条目（以 ; 或换行分隔）。

    类型：solar(公历) / lunar(农历)，缺省 solar。
    日期：MMDD 或 YYYYMMDD。非法条目自动跳过。
    """
    result: list[dict] = []
    for chunk in re.split(r"[;\n]+", text or ""):
        chunk = chunk.strip()
        if not chunk:
            continue
        parts = [p.strip() for p in chunk.split("|")]
        if len(parts) < 3:
            continue
        name, atype, date = parts[0], parts[1].lower(), parts[2]
        if atype not in ("solar", "lunar"):
            atype = "solar"
        if not name or not re.fullmatch(r"\d{4}|\d{8}", date):
            continue
        result.append({"name": name, "type": atype, "date": date})
    return result


def _format_anniversaries_text(items) -> str:
    out: list[str] = []
    for it in items or []:
        try:
            name = str(it.get("name", "")).strip()
            atype = str(it.get("type", "solar"))
            date = str(it.get("date", "")).strip()
        except Exception:  # noqa: BLE001
            continue
        if name and date:
            out.append(f"{name}|{atype}|{date}")
    return "; ".join(out)


def _parse_custom_holidays_text(text: str) -> list[dict]:
    """解析 '名称|日期' 条目（以 ; 或换行分隔），日期为 MMDD 或 YYYYMMDD。"""
    result: list[dict] = []
    for chunk in re.split(r"[;\n]+", text or ""):
        chunk = chunk.strip()
        if not chunk:
            continue
        parts = [p.strip() for p in chunk.split("|")]
        if len(parts) < 2:
            continue
        name, date = parts[0], parts[1]
        if not name or not re.fullmatch(r"\d{4}|\d{8}", date):
            continue
        month = int(date[-4:-2])
        day = int(date[-2:])
        if not (1 <= month <= 12 and 1 <= day <= 31):
            continue
        result.append({"name": name, "date": date})
    return result


def _format_custom_holidays_text(items) -> str:
    out: list[str] = []
    for it in items or []:
        try:
            name = str(it.get("name", "")).strip()
            date = str(it.get("date", "")).strip()
        except Exception:  # noqa: BLE001
            continue
        if name and date:
            out.append(f"{name}|{date}")
    return "; ".join(out)


def _step_user_schema(defaults: dict | None = None) -> vol.Schema:
    d = defaults or {}
    return vol.Schema({
        vol.Optional("name", default=d.get("name", DEFAULT_NAME)): cv.string,
        vol.Optional("holiday_extra", default=d.get("holiday_extra", "")): cv.string,
    })


def _step_anniversary_schema(defaults: dict | None = None) -> vol.Schema:
    d = defaults or {}
    return vol.Schema({
        vol.Optional(
            "anniversaries_text", default=d.get("anniversaries_text", "")
        ): cv.string,
        vol.Optional(
            "custom_holidays_text", default=d.get("custom_holidays_text", "")
        ): cv.string,
    })


class ChineseCalendarConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """配置流（单实例）。"""

    VERSION = 1

    def __init__(self) -> None:
        self._data: dict = {}

    async def async_step_user(self, user_input: dict | None = None):
        await self.async_set_unique_id(_SINGLETON)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            self._data.update(user_input)
            return await self.async_step_anniversary()

        return self.async_show_form(step_id="user", data_schema=_step_user_schema())

    async def async_step_anniversary(self, user_input: dict | None = None):
        if user_input is not None:
            self._data.update(user_input)
            name = self._data.get("name", DEFAULT_NAME)
            return self.async_create_entry(
                title=name,
                data={},
                options={
                    "name": name,
                    "holiday_extra": self._data.get("holiday_extra", ""),
                    "anniversaries": _parse_anniversaries_text(
                        self._data.get("anniversaries_text", "")
                    ),
                    "custom_holidays": _parse_custom_holidays_text(
                        self._data.get("custom_holidays_text", "")
                    ),
                },
            )
        return self.async_show_form(
            step_id="anniversary",
            data_schema=_step_anniversary_schema({
                "anniversaries_text": _format_anniversaries_text(
                    self._data.get("anniversaries", [])
                ),
                "custom_holidays_text": _format_custom_holidays_text(
                    self._data.get("custom_holidays", [])
                ),
            }),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry):
        return ChineseCalendarOptionsFlow()


class ChineseCalendarOptionsFlow(config_entries.OptionsFlow):
    """选项流：编辑名称/节假日数据/纪念日。"""

    def __init__(self) -> None:
        self._updated: dict = {}

    def _defaults(self) -> dict:
        o = dict(self.config_entry.options)
        return {
            "name": o.get("name", DEFAULT_NAME),
            "holiday_extra": o.get("holiday_extra", ""),
            "anniversaries_text": _format_anniversaries_text(o.get("anniversaries", [])),
            "custom_holidays_text": _format_custom_holidays_text(o.get("custom_holidays", [])),
        }

    async def async_step_init(self, user_input: dict | None = None):
        if user_input is not None:
            self._updated.update(user_input)
            return await self.async_step_anniversary()
        return self.async_show_form(
            step_id="init", data_schema=_step_user_schema(self._defaults())
        )

    async def async_step_anniversary(self, user_input: dict | None = None):
        if user_input is not None:
            self._updated.update(user_input)
            d = self._defaults()
            merged = {
                "name": self._updated.get("name", d["name"]),
                "holiday_extra": self._updated.get("holiday_extra", d["holiday_extra"]),
                "anniversaries": _parse_anniversaries_text(
                    self._updated.get("anniversaries_text", d["anniversaries_text"])
                ),
                "custom_holidays": _parse_custom_holidays_text(
                    self._updated.get("custom_holidays_text", d["custom_holidays_text"])
                ),
            }
            return self.async_create_entry(title=merged["name"], data=merged)
        return self.async_show_form(
            step_id="anniversary", data_schema=_step_anniversary_schema(self._defaults())
        )
