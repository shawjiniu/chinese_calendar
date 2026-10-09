"""chinese_calendar 集成。"""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, SupportsResponse

from .const import DOMAIN, PLATFORMS
from .services import (
    GET_MONTH_SCHEMA,
    REMOVE_ANNIVERSARY_SCHEMA,
    SERVICE_GET_MONTH,
    SERVICE_REMOVE_ANNIVERSARY,
    SERVICE_SET_ANNIVERSARY,
    SET_ANNIVERSARY_SCHEMA,
    async_get_month,
    async_remove_anniversary,
    async_set_anniversary,
)


_LOGGER = logging.getLogger(__name__)

_FRONTEND_URL_PATH = "/chinese_calendar"
_FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    hass.data.setdefault(DOMAIN, {})
    # 由 HA 直接托管打包好的前端卡片，URL：/chinese_calendar/chinese-calendar-card.js
    hass.http.register_static_path(
        _FRONTEND_URL_PATH,
        str(_FRONTEND_DIR),
        cache_headers=False,
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = entry
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(async_update_options))
    _register_services(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok


async def async_update_options(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """选项变更时重载。"""
    await hass.config_entries.async_reload(entry.entry_id)


def _register_services(hass: HomeAssistant) -> None:
    if not hass.services.has_service(DOMAIN, SERVICE_SET_ANNIVERSARY):
        hass.services.async_register(
            DOMAIN,
            SERVICE_SET_ANNIVERSARY,
            async_set_anniversary,
            schema=SET_ANNIVERSARY_SCHEMA,
        )
    if not hass.services.has_service(DOMAIN, SERVICE_REMOVE_ANNIVERSARY):
        hass.services.async_register(
            DOMAIN,
            SERVICE_REMOVE_ANNIVERSARY,
            async_remove_anniversary,
            schema=REMOVE_ANNIVERSARY_SCHEMA,
        )
    if not hass.services.has_service(DOMAIN, SERVICE_GET_MONTH):
        hass.services.async_register(
            DOMAIN,
            SERVICE_GET_MONTH,
            async_get_month,
            schema=GET_MONTH_SCHEMA,
            supports_response=SupportsResponse.OPTIONAL,
        )
