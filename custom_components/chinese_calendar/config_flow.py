"""Config flow for chinese_calendar。"""
from __future__ import annotations

import re

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv, selector

from .const import DEFAULT_NAME, DOMAIN

_SINGLETON = DOMAIN

_TYPE_SELECTOR = selector.selector({
    "select": {
        "options": [
            {"value": "solar", "label": "公历"},
            {"value": "lunar", "label": "农历"},
        ],
        "mode": "dropdown",
    }
})


def _date_validator(value: str) -> str:
    if not re.fullmatch(r"\d{4}|\d{8}", value):
        raise vol.Invalid("日期需为 MMDD 或 YYYYMMDD")
    month = int(value[-4:-2])
    day = int(value[-2:])
    if not 1 <= month <= 12 or not 1 <= day <= 31:
        raise vol.Invalid("月份或日期不合法")
    return value


_ANNIVERSARY_ITEM = vol.Schema({
    vol.Required("name"): cv.string,
    vol.Optional("type", default="solar"): _TYPE_SELECTOR,
    vol.Required("date"): vol.All(cv.string, _date_validator),
})


def _step_user_schema(defaults: dict | None = None) -> vol.Schema:
    d = defaults or {}
    return vol.Schema({
        vol.Optional("name", default=d.get("name", DEFAULT_NAME)): cv.string,
        vol.Optional("holiday_extra", default=d.get("holiday_extra", "")):
            selector.selector({"text": {"multiline": True}}),
    })


def _step_anniversary_schema(defaults: dict | None = None) -> vol.Schema:
    d = defaults or {}
    return vol.Schema({
        vol.Optional("anniversaries", default=d.get("anniversaries", [])):
            vol.All(cv.ensure_list, [_ANNIVERSARY_ITEM]),
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
                    "anniversaries": self._data.get("anniversaries", []),
                },
            )
        return self.async_show_form(
            step_id="anniversary", data_schema=_step_anniversary_schema()
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
            "anniversaries": o.get("anniversaries", []),
        }

    async def async_step_init(self, user_input: dict | None = None):
        if user_input is not None:
            self._updated.update(user_input)
            return await self.async_step_anniversary()
        return self.async_show_form(step_id="init", data_schema=_step_user_schema(self._defaults()))

    async def async_step_anniversary(self, user_input: dict | None = None):
        if user_input is not None:
            self._updated.update(user_input)
            d = self._defaults()
            merged = {
                "name": self._updated.get("name", d["name"]),
                "holiday_extra": self._updated.get("holiday_extra", d["holiday_extra"]),
                "anniversaries": self._updated.get("anniversaries", d["anniversaries"]),
            }
            return self.async_create_entry(title=merged["name"], data=merged)
        return self.async_show_form(
            step_id="anniversary", data_schema=_step_anniversary_schema(self._defaults())
        )
