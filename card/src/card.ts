import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { CardConfig, parseConfig } from "./config";
import { renderAnniversaries } from "./render/anniversaries";
import { renderHeader } from "./render/header";
import { renderMonth } from "./render/month";
import { styles } from "./styles";
import { ChineseCalendarAttributes, HomeAssistantLike } from "./types";

@customElement("chinese-calendar-card")
export class ChineseCalendarCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistantLike;

  @state() private _config?: CardConfig;

  static get styles() {
    return styles;
  }

  public setConfig(config: Record<string, unknown>): void {
    this._config = parseConfig(config);
  }

  public getCardSize(): number {
    return 6;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      entity: "sensor.chinese_calendar",
      title: "中国日历",
    };
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="cc-empty">请配置 entity</div></ha-card>`;
    }
    const state = this.hass?.states?.[this._config.entity];
    if (!state) {
      return html`
        <ha-card>
          <div class="cc-empty">实体未找到：${this._config.entity}</div>
        </ha-card>
      `;
    }
    const attr = state.attributes as unknown as ChineseCalendarAttributes;

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="cc-title">${this._config.title}</div>`
          : ""}
        ${renderHeader(this._config, attr)}
        ${renderAnniversaries(this._config, attr)}
        ${renderMonth(this._config, attr)}
      </ha-card>
    `;
  }
}
