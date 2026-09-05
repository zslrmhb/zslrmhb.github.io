# 简约中国风 · 第一轮方向审核

当前状态：首页、英文 Notes/文章与摄影分页设计已通过；第六轮 3D 探索已通过；完整实施交接见 IMPLEMENTATION-HANDOFF.md。这里只包含设计与原型，不是生产网站实现。早期轮次记录保留用于追溯。

## 已确认需求

- 个人网站改为简约中国风；每个设计都须经过用户审核并反复迭代。
- 未来发布笔记，参考 Distill 的交互式解释；允许 Threlte，实现类似自己的 Three-Body-Problem 项目的沉浸体验。
- 保留现有个人介绍、项目、博客、摄影的内容能力。

## 第一轮假设

- 第一轮曾假设中文优先；已被用户最新要求取代：英文优先，主身份为 Hongbin Miao，中文姓名可作辅助。
- 本轮仅审阅独立 HTML 原型，不改生产路由、不发布。
- 三体文章是排版样稿，不代表用户已有此篇公开笔记；图形是数学轨道构图示意，不是引力求解或 WebGL 实现。
- 不凭空添加发表日期、文章数量、身份履历或摄影作品。

## 依据

- [huashu-design](https://github.com/alchaincyf/huashu-design)，读取版本 `a790f704d85f277cc93d2081b0840d00036969bb`，使用 SKILL.md 的三方向初稿流程及 references/critique-guide.md 的概念前置与五维评审。
- [Distill](https://distill.pub/) 和 [Communicating with Interactive Articles](https://distill.pub/2020/communicating-with-interactive-articles/)：阅读与互动图形共同解释概念。
- [Three-Body-Problem](https://github.com/zslrmhb/Three-Body-Problem)，读取版本 `e5a58dfb58403910d3ce918fa8ddfdbd523d4e9a`：粘性 Canvas、章节驱动场景状态、自由 Playground。参考仓库使用 Svelte 4；当前个人站 package.json 为 Svelte 5，未来移植需验证当前兼容版本，不直接复制旧依赖。

## 后续实施边界（设计选定后细化）

1. 主页、笔记索引与文章、摄影各自审核；每轮保留版本与原话反馈。
2. 沿用 SvelteKit + mdsvex，文章嵌入 Svelte 交互组件；公式、旁注、图注及目录与正文统一设计。
3. 普通文章静态可读；3D 组件按需加载，章节驱动场景，用户可主动进入探索模式。
4. 同时设计手机的章节内画布、触控控件与减少动态效果状态，避免参考项目中仅大屏可见的主体体验。
5. 生产集成后验证构建、路由、键盘操作、触屏、3D 加载失败与性能；本轮不声称完成这些能力。

## 审核方式

第二轮文章设计已有确认记录，见 direction-approved.md。全站大纲与其余页面仍逐项审核，不将文章页通过视作全站通过。

## 工作分工更新

用户：「等到我们可以把大纲和设计给固定下来，我就用小模型来implement」。

后续限于信息架构、逐页视觉设计、必要的交互验证原型和实施规格；不要主动进入生产实现或切换模型。用户确认大纲与设计后，整理小模型交接包：页面地图、明暗主题规范、响应式状态、交互与组件契约、Markdown 写作规范、真实内容映射、逐项验收及实施顺序。尚未确认的事项明确列出，不由实现模型自行猜设计。

第二轮独立原型位于 round-2/index.html，来自 round-2/note.md；支持明暗切换与记忆、Markdown 源码查看、平面八字轨道数值模拟的播放/暂停/重置/调速。属于验证写作与阅读方式的原型，不是生产文章管线或 Threlte 三维实现。用户的「ok」授权本轮原型，不代表冻结全站视觉方向。

## 第二轮新增需求（用户原话与方案）

用户：「每个页面有最合适的交互方式」「可以调节light/dark的切换键」「笔记可不可以用纯markdown写（交互方式可以用一些预设的组件）」。这不等于选择 A/B/C，继续保留逐页审核流程。

- 全站统一：字体、色彩语义、导航位置和可访问性；不同页面按内容选择布局及交互，不能让页面主题覆盖用户选择。
- 首页：个人介绍、项目入口，适量三维预览；笔记列表：易扫描的目录；普通文章：正文、目录、旁注；交互文章：正文配组件，可进入探索；摄影：图片浏览与大图观看。
- 主题：始终可找到的明暗切换，首次跟随系统，手动选择后记住并跨页保持。图表、代码和三维场景同步适配。当前 src/routes/+layout.svelte 的 setMode('light') 会在布局初始化时强制浅色，正式集成时移除；已有 ModeToggle 可改造。
- 写作：继续使用 src/content/*.md 与 frontmatter；普通文章仅写标准 Markdown。预设互动使用约定的 fenced code block（如 interactive + YAML 配置），构建时识别并映射到组件白名单。普通 Markdown 阅读器仍显示原始配置代码块。
- 示例配置（提案，尚未实现）：component: three-body；preset: figure-eight；controls: [play, reset, speed]。组件 ID、预设名称和参数由 schema 校验，错误指向文章和配置位置；不从文章执行任意脚本。
- 文章级 layout: essay/explorable 是拟议选项，非现有能力。选择模板与组件即可使用交互，无需作者在每篇文章写 Svelte import 或 JS。
- 下一轮应交付：同一篇文章的明暗两个状态、一个参数可调的预设组件，以及对应 Markdown 源文件；由用户审阅页面和写作体验后再推广。

## 当前审核入口

- 第三轮：首页与 Notes 列表：round-3/index.html、round-3/notes.html。
- 最新修正：首页视觉焦点使用水墨山水与中国风元素，三体仅在项目中展示。
- 实现质量约束：implementation-quality.md。生产代码尚未修改。

## 第四轮：Notes 与英文文章

审核入口：round-4/notes.html（列表）、round-4/index.html（英文交互样稿）、round-4/ai-resources.html（现有真实文章全文）。写作源文件为 round-4/note.md。当前待用户审核；主页保持已通过状态。

## 最新审核入口：第六轮

round-6/index.html：从文章插图进入 Explore in 3D。布局、验证范围和生产边界见 round-6/review.md。摄影最新版为 round-5/，桌面每页 12 张、手机 6 张；Instagram 重新授权与自动同步仍待实施，见 instagram-sync-findings.md。
