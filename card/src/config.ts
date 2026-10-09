/** 卡片配置解析与默认值（DESIGN.md §6）。 */

export interface CardConfig {
  type: string;
  entity: string;
  title: string;
  show_solar: boolean;
  show_lunar: boolean;
  show_weekday: boolean;
  show_term: boolean;
  show_holiday: boolean;
  show_anniversary: boolean;
  show_month: boolean;
  week_start: "monday" | "sunday";
  show_lunar_in_month: boolean;
}

export function parseConfig(config: Record<string, unknown>): CardConfig {
  if (typeof config.entity !== "string" || !config.entity) {
    throw new Error("必须配置 entity（例如 sensor.chinese_calendar）");
  }
  return {
    type: "chinese-calendar-card",
    entity: config.entity,
    title: typeof config.title === "string" ? config.title : "",
    show_solar: config.show_solar !== false,
    show_lunar: config.show_lunar !== false,
    show_weekday: config.show_weekday !== false,
    show_term: config.show_term !== false,
    show_holiday: config.show_holiday !== false,
    show_anniversary: config.show_anniversary !== false,
    show_month: config.show_month !== false,
    week_start: config.week_start === "sunday" ? "sunday" : "monday",
    show_lunar_in_month: config.show_lunar_in_month !== false,
  };
}
