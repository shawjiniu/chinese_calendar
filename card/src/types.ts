/** 与后端实体属性契约（DESIGN.md §2）一一对应的类型定义。 */

export interface HomeAssistantLike {
  states: Record<string, EntityStateLike>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<unknown>;
}

export interface EntityStateLike {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface Anniversary {
  id: string;
  name: string;
  type: "solar" | "lunar";
  date: string;
  has_year: boolean;
  year: number | null;
  month: number;
  day: number;
  full_date: string;
  days_left: number;
  age: number | null;
  age_label: string;
}

export interface LunarInfo {
  year: number;
  month: number;
  day: number;
  is_leap: boolean;
}

export type HolidayStatus = "workday" | "weekend" | "holiday" | "adjusted_workday";

export interface MonthDay {
  day: number;
  date: string;
  /** 0=周一 … 6=周日 */
  weekday: number;
  lunar: LunarInfo;
  lunar_day_cn: string;
  term: string;
  holiday_status: HolidayStatus;
  holiday_name: string;
  festivals: string[];
  anniversaries: string[];
  is_today: boolean;
}

export interface NextHoliday {
  name: string;
  date: string;
  days_left: number;
}

export interface NextAnniversary {
  name: string;
  date: string;
  days_left: number;
  type: string;
  age_label: string;
}

export interface ChineseCalendarAttributes {
  solar_date: string;
  solar_date_cn: string;
  solar: { year: number; month: number; day: number };
  weekday: number;
  weekday_cn: string;
  week_number: number;
  lunar: LunarInfo;
  lunar_date_cn: string;
  lunar_month_cn: string;
  lunar_day_cn: string;
  term: string;
  term_time: string;
  holiday_status: HolidayStatus;
  holiday_status_cn: string;
  holiday_name: string;
  is_adjusted_workday: boolean;
  festivals: string[];
  next_holiday: NextHoliday | null;
  next_anniversary: NextAnniversary | null;
  anniversaries: Anniversary[];
  month: {
    year: number;
    month: number;
    days_in_month: number;
    /** 1 号的星期（0=周一…6=周日） */
    first_weekday: number;
    days: MonthDay[];
  };
}
