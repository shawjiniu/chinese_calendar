"""DataUpdateCoordinator：一次计算、多实体共享。"""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from . import provider, store
from .const import DOMAIN, UPDATE_INTERVAL

_LOGGER = logging.getLogger(__name__)


class ChineseCalendarCoordinator(DataUpdateCoordinator[dict]):
    """每天重算一次全量日历数据，供主实体与直读子实体共享。"""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
        )
        self.entry = entry

    async def _async_update_data(self) -> dict:
        runtime = await store.load_runtime(self.hass)
        holiday_extra = self.entry.options.get("holiday_extra", "")
        return await self.hass.async_add_executor_job(
            provider.build_attributes,
            runtime["anniversaries"],
            holiday_extra,
            provider.today_cn(),
            runtime["custom_holidays"],
        )
