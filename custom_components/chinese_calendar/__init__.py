"""chinese_calendar 集成。"""
from __future__ import annotations

import logging
import shutil
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PLATFORMS
from .services import (
    REMOVE_ANNIVERSARY_SCHEMA,
    SERVICE_REMOVE_ANNIVERSARY,
    SERVICE_SET_ANNIVERSARY,
    SET_ANNIVERSARY_SCHEMA,
    async_remove_anniversary,
    async_set_anniversary,
)


_LOGGER = logging.getLogger(__name__)
_FRONTEND_FILENAME = "chinese-calendar-card.js"
_FRONTEND_SRC = Path(__file__).parent / "frontend" / _FRONTEND_FILENAME


def _copy_frontend_to_www(hass: HomeAssistant) -> None:
    """把打包好的前端卡片复制到 www/（经 /local/ 访问），幂等。"""
    if not _FRONTEND_SRC.is_file():
        _LOGGER.warning("前端文件不存在，跳过复制: %s", _FRONTEND_SRC)
        return
    try:
        www_dir = Path(hass.config.path("www"))
        www_dir.mkdir(parents=True, exist_ok=True)
        dst = www_dir / _FRONTEND_FILENAME
        if not dst.is_file() or _FRONTEND_SRC.read_bytes() != dst.read_bytes():
            shutil.copyfile(_FRONTEND_SRC, dst)
            _LOGGER.info("已复制前端卡片到 %s", dst)
    except Exception as exc:  # noqa: BLE001
        _LOGGER.error("复制前端文件失败: %s", exc)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    hass.data.setdefault(DOMAIN, {})
    await hass.async_add_executor_job(_copy_frontend_to_www, hass)
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
