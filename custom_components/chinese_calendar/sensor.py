"""主实体 + 6 个直读子实体。"""
from __future__ import annotations

import datetime
import logging
from datetime import timedelta

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceEntryType
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_point_in_time
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DEFAULT_NAME, DOMAIN, STATE_CN, SUB_SENSORS
from .coordinator import ChineseCalendarCoordinator

_LOGGER = logging.getLogger(__name__)

_CN_TZ = timedelta(hours=8)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """创建 coordinator 与全部实体。"""
    coordinator = ChineseCalendarCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    entities: list[SensorEntity] = [ChineseCalendarMainSensor(coordinator, entry)]
    entities.extend(
        ChineseCalendarSubSensor(coordinator, entry, suffix, label)
        for suffix, label in SUB_SENSORS.items()
    )
    async_add_entities(entities)

    _schedule_midnight_refresh(hass, coordinator)


@callback
def _schedule_midnight_refresh(hass: HomeAssistant, coordinator: ChineseCalendarCoordinator) -> None:
    """每天 00:00:15（UTC+8）对齐刷新，并重新调度下一次。"""
    now_cn = datetime.datetime.utcnow() + _CN_TZ
    next_cn = (now_cn + timedelta(days=1)).replace(
        hour=0, minute=0, second=15, microsecond=0
    )
    next_utc = (next_cn - _CN_TZ).replace(tzinfo=datetime.timezone.utc)

    @callback
    def _listener(_now: datetime.datetime) -> None:
        _schedule_midnight_refresh(hass, coordinator)
        hass.async_create_task(coordinator.async_request_refresh())

    async_track_point_in_time(hass, _listener, next_utc)


def _device_info(entry: ConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name=entry.title or DEFAULT_NAME,
        entry_type=DeviceEntryType.SERVICE,
    )


class ChineseCalendarMainSensor(CoordinatorEntity, SensorEntity):
    """主实体：state=今日状态，attributes=全量数据。"""

    _attr_has_entity_name = True
    _attr_icon = "mdi:calendar-star"

    def __init__(self, coordinator: ChineseCalendarCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator)
        self._attr_name = "日历"
        self._attr_unique_id = DOMAIN
        self.entity_id = f"sensor.{DOMAIN}"
        self._attr_device_info = _device_info(entry)

    @property
    def native_value(self) -> str | None:
        data = self.coordinator.data
        if not data:
            return None
        return STATE_CN.get(data.get("holiday_status"), "")

    @property
    def extra_state_attributes(self) -> dict:
        return self.coordinator.data or {}


class ChineseCalendarSubSensor(CoordinatorEntity, SensorEntity):
    """直读子实体：从 coordinator.data 取对应字段。"""

    _attr_has_entity_name = True
    _attr_icon = "mdi:calendar"

    def __init__(
        self,
        coordinator: ChineseCalendarCoordinator,
        entry: ConfigEntry,
        suffix: str,
        label: str,
    ) -> None:
        super().__init__(coordinator)
        self._suffix = suffix
        self._attr_name = label
        self._attr_unique_id = f"{DOMAIN}_{suffix}"
        self.entity_id = f"sensor.{DOMAIN}_{suffix}"
        self._attr_device_info = _device_info(entry)

    @property
    def native_value(self) -> str | None:
        data = self.coordinator.data
        if not data:
            return None
        s = self._suffix
        if s == "solar":
            return data.get("solar_date")
        if s == "lunar":
            return data.get("lunar_date_cn")
        if s == "weekday":
            return data.get("weekday_cn")
        if s == "term":
            return data.get("term") or "无"
        if s == "next_holiday":
            return (data.get("next_holiday") or {}).get("name") or "无"
        if s == "next_anniversary":
            return (data.get("next_anniversary") or {}).get("name") or "无"
        return None

    @property
    def extra_state_attributes(self) -> dict:
        data = self.coordinator.data or {}
        s = self._suffix
        if s == "solar":
            return {
                "solar": data.get("solar"),
                "solar_date_cn": data.get("solar_date_cn"),
            }
        if s == "lunar":
            return {
                "lunar": data.get("lunar"),
                "lunar_month_cn": data.get("lunar_month_cn"),
                "lunar_day_cn": data.get("lunar_day_cn"),
            }
        if s == "weekday":
            return {"weekday": data.get("weekday"), "week_number": data.get("week_number")}
        if s == "term":
            return {"term_time": data.get("term_time")}
        if s == "next_holiday":
            return data.get("next_holiday") or {}
        if s == "next_anniversary":
            return data.get("next_anniversary") or {}
        return {}
