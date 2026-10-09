"""服务：set_anniversary / remove_anniversary。"""
from __future__ import annotations

import re

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN

SERVICE_SET_ANNIVERSARY = "set_anniversary"
SERVICE_REMOVE_ANNIVERSARY = "remove_anniversary"
SERVICE_GET_MONTH = "get_month"


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


def _get_entry(hass: HomeAssistant):
    entries = hass.config_entries.async_entries(DOMAIN)
    return entries[0] if entries else None


async def async_set_anniversary(hass: HomeAssistant, call: ServiceCall) -> None:
    """新增或更新纪念日（按 name upsert）。"""
    entry = _get_entry(hass)
    if entry is None:
        return
    options = dict(entry.options)
    anniversaries = [dict(a) for a in options.get("anniversaries", [])]
    name = str(call.data["name"]).strip()
    new_item = {
        "name": name,
        "type": call.data.get("type", "solar"),
        "date": str(call.data["date"]).strip(),
    }
    anniversaries = [a for a in anniversaries if a.get("name") != name]
    anniversaries.append(new_item)
    options["anniversaries"] = anniversaries
    hass.config_entries.async_update_entry(entry, options=options)


async def async_remove_anniversary(hass: HomeAssistant, call: ServiceCall) -> None:
    """按 name 删除纪念日。"""
    entry = _get_entry(hass)
    if entry is None:
        return
    name = str(call.data["name"]).strip()
    options = dict(entry.options)
    anniversaries = [
        a for a in options.get("anniversaries", []) if a.get("name") != name
    ]
    options["anniversaries"] = anniversaries
    hass.config_entries.async_update_entry(entry, options=options)


async def async_get_month(hass: HomeAssistant, call: ServiceCall):
    """返回指定月份的日历数据（响应式服务）。"""
    # 延迟导入，避免 __init__ 在依赖安装前就加载 lunar_python
    from . import provider

    entry = _get_entry(hass)
    if entry is None:
        return None
    options = entry.options
    return await hass.async_add_executor_job(
        provider.build_month,
        call.data["year"],
        call.data["month"],
        provider.today_cn(),
        options.get("anniversaries", []),
        options.get("holiday_extra", ""),
    )
