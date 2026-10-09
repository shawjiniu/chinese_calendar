import { css } from "lit";

export const styles = css`
  :host {
    display: block;
  }

  .cc-empty {
    padding: 16px;
    color: var(--secondary-text-color);
  }

  .cc-title {
    font-size: 1.15em;
    font-weight: 600;
    padding: 16px 16px 0;
  }

  .cc-header {
    padding: 12px 16px 4px;
  }
  .cc-solar {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.2;
  }
  .cc-sub {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    margin-top: 6px;
    color: var(--secondary-text-color);
  }
  .cc-term {
    color: var(--accent-color);
  }
  .cc-holiday {
    color: var(--warning-color, #e6a700);
    font-weight: 500;
  }

  .cc-anniv {
    padding: 4px 16px;
  }
  .cc-section-title {
    font-weight: 600;
    margin: 10px 0 4px;
    color: var(--primary-text-color);
  }
  .cc-anniv-item {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 3px 0;
  }
  .cc-anniv-name {
    font-weight: 500;
  }
  .cc-anniv-age {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  .cc-anniv-count {
    margin-left: auto;
    color: var(--primary-color);
    font-weight: 500;
  }

  .cc-month {
    padding: 4px 16px 16px;
  }
  .cc-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  .cc-weekdays {
    margin-bottom: 4px;
  }
  .cc-wd {
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.85em;
    padding: 3px 0;
  }
  .cc-cell {
    min-height: 50px;
    border-radius: 6px;
    padding: 3px 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
  .cc-cell.cc-empty {
    background: transparent;
  }
  .cc-day-num {
    font-weight: 500;
    line-height: 1.2;
  }
  .cc-day-lunar {
    font-size: 0.72em;
    color: var(--secondary-text-color);
    line-height: 1.1;
    white-space: nowrap;
  }
  .cc-day-markers {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-top: 2px;
    font-size: 0.6em;
    line-height: 1.1;
    max-width: 100%;
  }
  .cc-marker {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cc-marker-holiday {
    color: #d32f2f;
  }
  .cc-marker-term {
    color: var(--accent-color);
  }
  .cc-marker-anniv {
    color: var(--primary-color);
  }
  .cc-today {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .cc-today .cc-day-lunar,
  .cc-today .cc-day-markers,
  .cc-today .cc-marker {
    color: inherit;
    opacity: 0.92;
  }
  .cc-rest .cc-day-num {
    color: #d32f2f;
  }
  .cc-workday .cc-day-num {
    color: var(--secondary-text-color);
    text-decoration: line-through;
  }
`;
