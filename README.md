# 中国日历（Chinese Calendar）

一个面向 Home Assistant 的中国日历集成：提供**公历 / 农历 / 星期 / 节气 / 法定节假日与调休 / 纪念日（倒计时、周岁/周年）/ 当月日历**，数据统一由 [lunar-python](https://github.com/6tail/lunar-python) 天文算法计算，支持配置流与服务动态增删纪念日。

> 当前状态：后端集成（P1）已完成；前端 Lovelace 卡片（P2）规划中。

## 功能特性

- **农历 / 节气 / 干支生肖**：全部来自 lunar-python（天文算法，非查表，基本不限年份）。
- **法定节假日与调休**：工作日 / 休息日 / 节假日 / 调休补班四态判断，节假日名称（元旦节/春节/清明节/劳动节/端午节/中秋节/国庆节/国庆中秋/抗战胜利日）。
- **纪念日**：
  - 支持**公历**与**农历**两种历法；
  - 日期支持 `MMDD`（不带年份，每年循环）或 `YYYYMMDD`（带年份，自动计算周岁/周年）；
  - 输出名称 + 倒计时天数 + 年龄标签（含“生日”显示「X周岁」，否则「X周年」）。
- **直读子实体**：常用值独立成实体，模板/自动化可用 `states()` 直接访问。
- **当月日历数据**：后端输出当月每一天的农历/节气/节假日/纪念日，供卡片渲染月历网格。
- **服务**：`set_anniversary` / `remove_anniversary`，可在卡片或自动化中动态增删纪念日。

## 安装

### 方式一：HACS（推荐）

1. 打开 HACS → 「集成」→ 右上角菜单 → 「自定义存储库」。
2. 填入本仓库地址，类别选择 **集成**。
3. 搜索「中国日历」并安装。
4. 重启 Home Assistant。

### 方式二：手动安装

1. 将仓库中的 `custom_components/chinese_calendar/` 目录复制到 HA 配置目录的 `custom_components/` 下。
2. 重启 Home Assistant。
3. HA 会自动安装依赖 `lunar_python`（首次启动需联网）。

## 配置

`设置 → 设备与服务 → 添加集成 → 搜索「中国日历」`，按向导两步完成：

1. **基本设置**：名称（默认「中国日历」）、节假日数据覆盖（可选）。
2. **纪念日**：添加纪念日，每条包含 `名称`、`类型`（公历/农历）、`日期`（`MMDD` 或 `YYYYMMDD`）。

> **节假日数据覆盖（可选）**：lunar-python 内置法定节假日数据截至 2026 年；若库版本未及时更新，可在此粘贴增量数据（lunar-python `HolidayUtil.fix` 的 18 位/天格式）。

### 配置示例（纪念日）

| 名称 | 类型 | 日期 | 含义 |
| --- | --- | --- | --- |
| 妈妈生日 | 农历 | 0321 | 每年农历三月廿一 |
| 结婚纪念日 | 公历 | 20101010 | 公历 2010-10-10，显示周年 |

## 实体

| 实体 | 说明 |
| --- | --- |
| `sensor.chinese_calendar` | 主实体：state=今日状态（工作日/休息日/节假日），全量属性 |
| `sensor.chinese_calendar_solar` | 公历（如 `2026-03-22`） |
| `sensor.chinese_calendar_lunar` | 农历（如 `丙午马年 二月廿五`） |
| `sensor.chinese_calendar_weekday` | 星期（如 `星期日`） |
| `sensor.chinese_calendar_term` | 今日节气（无则 `无`） |
| `sensor.chinese_calendar_next_holiday` | 最近法定节假日（如 `清明节`） |
| `sensor.chinese_calendar_next_anniversary` | 最近纪念日（如 `妈妈生日`） |

常用模板：

```jinja2
{{ states('sensor.chinese_calendar_lunar') }}
{{ state_attr('sensor.chinese_calendar_next_anniversary', 'days_left') }}
{{ is_state('sensor.chinese_calendar_next_holiday', '春节') }}
```

## 服务

### `chinese_calendar.set_anniversary`

新增或更新纪念日（按 `name` 去重）。

```yaml
service: chinese_calendar.set_anniversary
data:
  name: "妈妈生日"
  type: "lunar"     # solar | lunar，默认 solar
  date: "0321"      # MMDD 或 YYYYMMDD
```

### `chinese_calendar.remove_anniversary`

按 `name` 删除纪念日。

```yaml
service: chinese_calendar.remove_anniversary
data:
  name: "妈妈生日"
```

## 设计文档

接口与属性契约、纪念日语义、配置流、服务、直读子实体与 Coordinator 结构详见 [DESIGN.md](DESIGN.md)。

## 许可与致谢

本集成引用以下开源项目与公开数据，特此依据各自许可协议声明：

| 项目 / 数据 | 许可 | 用途 | 来源 |
| --- | --- | --- | --- |
| **lunar-python** | MIT License | 农历（阴历/老黄历）、24 节气、干支、生肖、公历/农历节日等日历计算 | <https://github.com/6tail/lunar-python> |
| **法定节假日与调休数据** | 政府公开信息（国务院公告） | 工作日/休息日/节假日/调休状态判断 | 国务院办公厅《全国年节及纪念日放假办法》及各年《关于部分节假日安排的通知》（中国政府网 <https://www.gov.cn>），由 lunar-python 整理为结构化数据 |
| **Home Assistant** | Apache License 2.0 | 集成运行框架 | <https://www.home-assistant.io> |

- **lunar-python** 版权：Copyright © 6tail。依据 MIT 许可，其完整版权声明与许可文本保留于其项目仓库；本集成仅以 `requirements`（pip 依赖）方式引用，**未修改、未再分发**其源码。
- **节假日数据**系政府公开的法定安排（事实信息），本集成通过 lunar-python 读取；数据覆盖约 2002–2026 年，随 lunar-python 版本更新而扩展。
- 本集成自身代码的许可，请以仓库根目录的 LICENSE 文件为准（如未提供，请向维护者确认）。
