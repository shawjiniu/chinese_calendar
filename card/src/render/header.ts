import { html, TemplateResult } from "lit";
import type { CardConfig } from "../config";
import type { ChineseCalendarAttributes } from "../types";

/** 头部：公历 / 农历 / 星期 / 节气 / 节假日（按开关显示）。 */
export function renderHeader(
  config: CardConfig,
  attr: ChineseCalendarAttributes
): TemplateResult {
  const sub: TemplateResult[] = [];

  if (config.show_lunar) {
    sub.push(html`<span>${attr.lunar_date_cn}</span>`);
  }
  if (config.show_weekday) {
    sub.push(html`<span>${attr.weekday_cn}</span>`);
  }
  if (config.show_term && attr.term) {
    sub.push(html`<span class="cc-term">${attr.term}</span>`);
  }
  if (config.show_holiday) {
    const text = attr.holiday_name
      ? `${attr.holiday_status_cn} · ${attr.holiday_name}`
      : attr.holiday_status_cn;
    sub.push(html`<span class="cc-holiday">${text}</span>`);
  }

  return html`
    <div class="cc-header">
      ${config.show_solar
        ? html`<div class="cc-solar">${attr.solar_date_cn}</div>`
        : ""}
      ${sub.length ? html`<div class="cc-sub">${sub}</div>` : ""}
    </div>
  `;
}
