"""服务：set_anniversary / remove_anniversary。"""
from __future__ import annotations

import re

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN

SERVICE_SET_ANNIVERSARY = "set_anniversary"
SERVICE_REMOVE_ANNIVERSARY = "remove_anniversary"


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
