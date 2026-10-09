import { ChineseCalendarCard } from "./card";

customElements.define("chinese-calendar-card", ChineseCalendarCard);

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

// 注册到 Lovelace「添加卡片」清单
window.customCards = window.customCards || [];
window.customCards.push({
  type: "chinese-calendar-card",
  name: "中国日历",
  description: "公历 / 农历 / 星期 / 节气 / 节假日 / 纪念日 / 当月日历",
  preview: false,
});
