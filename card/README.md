# 中国日历卡片（chinese-calendar-card）

「中国日历」集成的 Lovelace 前端卡片，读取后端实体 `sensor.chinese_calendar` 的属性渲染：

- 公历、农历、星期、节气、节假日状态
- 纪念日列表（名称 + 倒计时天数 + 周岁/周年）
- 当月日历网格（农历日、节假日/节气/纪念日角标、今天高亮）

## 技术栈

TypeScript + Lit + Rollup（构建产物为单文件 ES 模块，无需额外依赖）。

## 构建

```bash
cd card
pnpm install
pnpm run build
```

> 说明：`card/.npmrc` 已配置 `shamefully-hoist=true`，让 pnpm 扁平化依赖（rollup 的 ESM 插件加载依赖传递依赖）。构建产物输出到 `dist/chinese-calendar-card.js`。

## 安装到 Home Assistant

1. 将 `dist/chinese-calendar-card.js` 复制到 HA 配置目录的 `www/` 下（如 `config/www/chinese-calendar-card.js`）。
2. `设置 → 仪表盘 → 右上角 ⋮ → 资源 → 添加资源`：

   ```yaml
   URL: /local/chinese-calendar-card.js
   资源类型: JavaScript 模块
   ```

3. 在仪表盘添加卡片（手动配置）：

   ```yaml
   type: custom:chinese-calendar-card
   entity: sensor.chinese_calendar
   ```

## 卡片配置

| 键 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `entity` | entity | 必填 | 目标 `sensor.chinese_calendar` |
| `title` | string | `""` | 卡片标题 |
| `show_solar` | boolean | true | 显示公历 |
| `show_lunar` | boolean | true | 显示农历 |
| `show_weekday` | boolean | true | 显示星期 |
| `show_term` | boolean | true | 显示节气 |
| `show_holiday` | boolean | true | 显示节假日状态 |
| `show_anniversary` | boolean | true | 显示纪念日列表 |
| `show_month` | boolean | true | 显示当月日历 |
| `week_start` | `monday` \| `sunday` | monday | 周起始日 |
| `show_lunar_in_month` | boolean | true | 月历格内显示农历日 |

完整示例：

```yaml
type: custom:chinese-calendar-card
entity: sensor.chinese_calendar
title: 中国日历
show_solar: true
show_lunar: true
show_weekday: true
show_term: true
show_holiday: true
show_anniversary: true
show_month: true
week_start: monday
show_lunar_in_month: true
```
