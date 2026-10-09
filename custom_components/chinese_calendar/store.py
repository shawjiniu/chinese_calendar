"""运行时数据存储（纪念日 + 自定义假日）。

这两项是用户高频增删的运行时数据，存到独立 Store（.storage/chinese_calendar.runtime），
避免每次增删都触发 config entry reload。
"""
from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN

STORAGE_VERSION = 1
STORAGE_KEY = f"{DOMAIN}.runtime"


def _get_store(hass: HomeAssistant) -> Store:
    return Store(hass, STORAGE_VERSION, STORAGE_KEY)


async def load_runtime(hass: HomeAssistant) -> dict:
    """加载运行时数据，返回 {anniversaries, custom_holidays}。"""
    data = await _get_store(hass).async_load()
    if not data:
        return {"anniversaries": [], "custom_holidays": []}
    return {
        "anniversaries": list(data.get("anniversaries") or []),
        "custom_holidays": list(data.get("custom_holidays") or []),
    }


async def save_runtime(hass: HomeAssistant, data: dict) -> None:
    """保存运行时数据。"""
    await _get_store(hass).async_save({
        "anniversaries": list(data.get("anniversaries") or []),
        "custom_holidays": list(data.get("custom_holidays") or []),
    })
