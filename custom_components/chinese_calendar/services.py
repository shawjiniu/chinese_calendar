"""服务：纪念日 / 自定义假日 / 月份查询。"""
from __future__ import annotations

import re

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
import homeassistant.helpers.config_validation as cv

from . import store
from .const import DOMAIN

SERVICE_SET_ANNIVERSARY = "set_anniversary"
SERVICE_REMOVE_ANNIVERSARY = "remove_anniversary"
SERVICE_GET_MONTH = "get_month"
SERVICE_SET_CUSTOM_HOLIDAY = "set_custom_holiday"
SERVICE_REMOVE_CUSTOM_HOLIDAY = "remove_custom_holiday"


def _date_validator(value: str) -> str:
    if not re.fullmatch(r"\d{4}|\d{8}", value):
        raise vol.Invalid("日期需为 MMDD 或 YYYYMMDD")
    return value


SET_ANNIVERSARY_SCHEMA = vol.Schema({
    vol.Required("name"): cv.string,
    vol.Optional("type", default="solar"): vol.In(["solar", "lunar"]),
    vol.Required("date"): vol.All(cv.string, _date_validator),
})

REMOVE_ANNIVERSARY_SCHEMA = vol.Schema({
    vol.Required("name"): cv.string,
})

GET_MONTH_SCHEMA = vol.Schema({
    vol.Required("year"): vol.Coerce(int),
    vol.Required("month"): vol.All(vol.Coerce(int), vol.Range(min=1, max=12)),
})

SET_CUSTOM_HOLIDAY_SCHEMA = vol.Schema({
    vol.Required("name"): cv.string,
    vol.Required("date"): vol.All(cv.string, _date_validator),
})

REMOVE_CUSTOM_HOLIDAY_SCHEMA = vol.Schema({
    vol.Required("name"): cv.string,
})


def _get_entry(hass: HomeAssistant):
    entries = hass.config_entries.async_entries(DOMAIN)
    return entries[0] if entries else None


async def _refresh(hass: HomeAssistant) -> None:
    """通知 coordinator 刷新（不触发整体 reload）。"""
    coordinator = hass.data.get(DOMAIN, {}).get("coordinator")
    if coordinator is not None:
        await coordinator.async_request_refresh()


async def async_set_anniversary(call: ServiceCall) -> None:
    """新增或更新纪念日（按 name upsert）。"""
    hass = call.hass
    runtime = await store.load_runtime(hass)
    anniversaries = [dict(a) for a in runtime["anniversaries"]]
    name = str(call.data["name"]).strip()
    new_item = {
        "name": name,
        "type": call.data.get("type", "solar"),
        "date": str(call.data["date"]).strip(),
    }
    anniversaries = [a for a in anniversaries if a.get("name") != name]
    anniversaries.append(new_item)
    runtime["anniversaries"] = anniversaries
    await store.save_runtime(hass, runtime)
    await _refresh(hass)


async def async_remove_anniversary(call: ServiceCall) -> None:
    """按 name 删除纪念日。"""
    hass = call.hass
    name = str(call.data["name"]).strip()
    runtime = await store.load_runtime(hass)
    runtime["anniversaries"] = [
        a for a in runtime["anniversaries"] if a.get("name") != name
    ]
    await store.save_runtime(hass, runtime)
    await _refresh(hass)


async def async_set_custom_holiday(call: ServiceCall) -> None:
    """新增或更新自定义假日（按 name upsert）。"""
    hass = call.hass
    runtime = await store.load_runtime(hass)
    custom_holidays = [dict(h) for h in runtime["custom_holidays"]]
    name = str(call.data["name"]).strip()
    new_item = {"name": name, "date": str(call.data["date"]).strip()}
    custom_holidays = [h for h in custom_holidays if h.get("name") != name]
    custom_holidays.append(new_item)
    runtime["custom_holidays"] = custom_holidays
    await store.save_runtime(hass, runtime)
    await _refresh(hass)


async def async_remove_custom_holiday(call: ServiceCall) -> None:
    """按 name 删除自定义假日。"""
    hass = call.hass
    name = str(call.data["name"]).strip()
    runtime = await store.load_runtime(hass)
    runtime["custom_holidays"] = [
        h for h in runtime["custom_holidays"] if h.get("name") != name
    ]
    await store.save_runtime(hass, runtime)
    await _refresh(hass)


async def async_get_month(call: ServiceCall):
    """返回指定月份的日历数据（响应式服务）。"""
    # 延迟导入，避免 __init__ 在依赖安装前就加载 lunar_python
    from . import provider

    hass = call.hass
    runtime = await store.load_runtime(hass)
    holiday_extra = ""
    entry = _get_entry(hass)
    if entry is not None:
        holiday_extra = entry.options.get("holiday_extra", "")
    return await hass.async_add_executor_job(
        provider.build_month,
        call.data["year"],
        call.data["month"],
        provider.today_cn(),
        runtime["anniversaries"],
        holiday_extra,
        runtime["custom_holidays"],
    )
