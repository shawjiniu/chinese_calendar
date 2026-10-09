import { html, TemplateResult } from "lit";
import type { CardConfig } from "../config";
import type { ChineseCalendarAttributes, MonthDay } from "../types";

const LABELS_MONDAY = ["一", "二", "三", "四", "五", "六", "日"];
const LABELS_SUNDAY = ["日", "一", "二", "三", "四", "五", "六"];

/** 当月日历网格（6×7）。 */
export function renderMonth(
  config: CardConfig,
  attr: ChineseCalendarAttributes
): TemplateResult {
  if (!config.show_month) {
    return html``;
  }
  const month = attr.month;
  if (!month || !month.days || !month.days.length) {
    return html``;
  }

  const labels =
    config.week_start === "sunday" ? LABELS_SUNDAY : LABELS_MONDAY;

  // first_weekday 为 0=周一…6=周日；计算周起始日前置空格数
  const lead =
    config.week_start === "sunday"
      ? (month.first_weekday + 1) % 7
      : month.first_weekday;

  const cells: (MonthDay | null)[] = [];
  for (let i = 0; i < lead; i++) {
    cells.push(null);
  }
  for (const d of month.days) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return html`
    <div class="cc-month">
      <div class="cc-section-title">${month.year} 年 ${month.month} 月</div>
      <div class="cc-grid cc-weekdays">
        ${labels.map((l) => html`<div class="cc-wd">${l}</div>`)}
      </div>
      <div class="cc-grid">
        ${cells.map((d) =>
          d ? renderDay(config, d) : html`<div class="cc-cell cc-empty"></div>`
        )}
      </div>
    </div>
  `;
}

function renderDay(config: CardConfig, d: MonthDay): TemplateResult {
  const cls = ["cc-cell"];
  if (d.is_today) {
    cls.push("cc-today");
  }
  if (d.holiday_status === "holiday") {
    cls.push("cc-rest");
  }
  if (d.holiday_status === "adjusted_workday") {
    cls.push("cc-workday");
  }

  const markers: TemplateResult[] = [];
  if (d.holiday_name) {
    markers.push(
      html`<span class="cc-marker cc-marker-holiday">${d.holiday_name}</span>`
    );
  }
  if (config.show_term && d.term) {
    markers.push(html`<span class="cc-marker cc-marker-term">${d.term}</span>`);
  }
  if (d.anniversaries.length) {
    markers.push(
      html`<span class="cc-marker cc-marker-anniv"
        >${d.anniversaries.length} 纪念</span
      >`
    );
  }

  return html`
    <div class="${cls.join(" ")}">
      <div class="cc-day-num">${d.day}</div>
      ${config.show_lunar_in_month
        ? html`<div class="cc-day-lunar">${d.lunar_day_cn}</div>`
        : ""}
      ${markers.length
        ? html`<div class="cc-day-markers">${markers}</div>`
        : ""}
    </div>
  `;
}
