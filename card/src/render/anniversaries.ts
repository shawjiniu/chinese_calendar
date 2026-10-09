import { html, TemplateResult } from "lit";
import type { CardConfig } from "../config";
import type { ChineseCalendarAttributes } from "../types";

function formatMonthDay(dateStr: string): string {
  const parts = (dateStr || "").split("-");
  if (parts.length !== 3) {
    return dateStr || "";
  }
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  return `${month}月${day}日`;
}

/** 纪念日列表：名称 + 具体日期 + 倒计时（带年份显示周岁/周年）。 */
export function renderAnniversaries(
  config: CardConfig,
  attr: ChineseCalendarAttributes
): TemplateResult {
  if (!config.show_anniversary) {
    return html``;
  }
  const list = attr.anniversaries || [];
  if (!list.length) {
    return html``;
  }
  return html`
    <div class="cc-anniv">
      <div class="cc-section-title">纪念日</div>
      ${list.map(
        (a) => html`
          <div class="cc-anniv-item">
            <span class="cc-anniv-name">${a.name}</span>
            <span class="cc-anniv-date">(${formatMonthDay(a.full_date)})</span>
            ${a.age_label
              ? html`<span class="cc-anniv-age">${a.age_label}</span>`
              : ""}
            <span class="cc-anniv-count"
              >${a.days_left === 0 ? "今天" : `${a.days_left} 天`}</span
            >
          </div>
        `
      )}
    </div>
  `;
}
