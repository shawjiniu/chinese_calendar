"""Constants for chinese_calendar."""
from __future__ import annotations

from datetime import timedelta

DOMAIN = "chinese_calendar"
DEFAULT_NAME = "中国日历"
PLATFORMS = ["sensor"]

# 节假日状态
STATUS_WORKDAY = "workday"
STATUS_WEEKEND = "weekend"
STATUS_HOLIDAY = "holiday"
STATUS_ADJUSTED_WORKDAY = "adjusted_workday"

# state (native_value)：主实体状态
STATE_CN = {
    STATUS_WORKDAY: "工作日",
    STATUS_WEEKEND: "休息日",
    STATUS_HOLIDAY: "节假日",
    STATUS_ADJUSTED_WORKDAY: "工作日",
}

# holiday_status_cn：属性里的中文状态
STATUS_CN = {
    STATUS_WORKDAY: "工作日",
    STATUS_WEEKEND: "休息日",
    STATUS_HOLIDAY: "节假日",
    STATUS_ADJUSTED_WORKDAY: "工作日(调休)",
}

# 星期：0=周一 … 6=周日（与 datetime.date.weekday() 一致）
WEEKDAY_CN = ("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日")

# 直读子实体：suffix → 中文名
SUB_SENSORS = {
    "solar": "公历",
    "lunar": "农历",
    "weekday": "星期",
    "term": "节气",
    "next_holiday": "最近节假日",
    "next_anniversary": "最近纪念日",
}

UPDATE_INTERVAL = timedelta(days=1)
