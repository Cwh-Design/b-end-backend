# 项目规范

开始开发前，请优先阅读：

- docs/figma-analysis.md
- docs/design-system.md
- docs/page-map.md
- docs/component-rules.md

# 项目说明

我是 UI 设计师，不懂代码。请你作为资深前端工程师协助我，根据 Figma 设计稿还原 B 端后台管理系统。

开发时请使用中文解释每一步，并尽量不要让我手动修改代码。

## 项目目标

根据 Figma 设计稿还原一个 B 端管理系统前端项目。

当前阶段只做前端页面还原，不接入真实后端 API。

## 技术栈

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts
* Lucide React
* pnpm

## 全局布局规则

设计稿基准尺寸：1920 × 1080

* 左侧导航 Sidebar：267px 宽
* 顶部导航 Header：80px 高
* 内容区 Content：剩余宽度自适应
* 页面背景色：#f2f5fa
* 卡片/导航背景：#ffffff

## 色彩规范

* 品牌主色：#136af8
* 辅助蓝色：#0274ff
* 页面背景：#f2f5fa
* 卡片背景：#ffffff
* 主文字：#101828
* 次级文字：#667180
* 弱文字：#8a9ab3
* 浅边框：#e7eaf0
* 输入框边框：#d8e2f0
* 成功色：#1ad093
* 警告色：#fae8cd
* 错误色：#ffdbdb

## 字体规范

优先使用系统默认中文字体。如果无法使用思源黑体，则使用：

font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

字号规则：

* 页面大标题：28px / 700
* 页面标题：24px / 700
* 区块标题：20px / 700
* 卡片标题：18px / 700
* 正文：16px / 400
* 辅助文字：14px / 400
* 数字展示：26px / 700

## 间距规则

优先使用以下间距：

* 10px
* 12px
* 15px
* 16px
* 18px
* 20px
* 22px
* 24px
* 32px
* 34px
* 40px

常用规则：

* 内容区 padding：24px
* 顶部导航 padding：17px 30px
* 菜单项垂直间距：34px
* 应用卡片间距：40px
* 表单项间距：20px 或 32px

## 组件拆分规则

必须优先抽离公共组件，不要在每个页面重复写相同结构。

优先创建以下组件：

* AppSidebar
* AppHeader
* PageLayout
* PageTitle
* SearchBar
* StatsCard
* ChartCard
* DataTable
* FormPanel
* WorkflowNode
* EmptyState
* LoadingState

## 开发顺序

不要一次性开发所有页面。

请按以下顺序开发：

1. 项目基础结构
2. 全局 Layout
3. Sidebar
4. Header
5. 公共组件
6. 工作台页面
7. 报表中心页面
8. 数据中心页面
9. 应用中心页面
10. 流程管理页面

每完成一个阶段后，请暂停并告诉我如何预览。

## 数据规则

* 不连接真实 API
* 所有数据放在 src/mock/
* 表格、图表、列表都使用 mock 数据
* 点击按钮可以先使用假交互
* 新增、编辑、删除可以先只做弹窗和 Toast 提示

## 交互状态补充规则

如果 Figma 中没有设计组件状态，请按以下规则补充：

* Button hover：背景色加深 8%
* Button active：背景色加深 12%
* Button disabled：透明度 50%
* Input focus：使用 #136af8 蓝色描边
* 表格行 hover：使用浅蓝或浅灰背景
* Loading：使用 Skeleton 或 Spinner
* Empty：使用空状态文案和图标
* 操作成功：使用 Toast 提示

## 响应式规则

设计稿以 1920px 为基准。

* 1440px 以上：保持完整布局
* 1024px - 1439px：内容区自适应，卡片允许换行
* 小于 1024px：Sidebar 可折叠
* 表格横向内容过多时允许横向滚动

## 禁止事项

* 不删除已有代码
* 不修改环境变量
* 不连接真实后端 API
* 不使用 Ant Design
* 不使用 Material UI
* 不引入复杂状态管理，除非我明确要求
* 不重复创建已经存在的组件
* 不随意改变 Figma 的视觉风格

## 每次开发前必须做

在写代码前，请先说明：

1. 你准备开发哪个模块
2. 会新增或修改哪些文件
3. 会复用哪些已有组件
4. 是否需要 mock 数据

## 每次开发后必须做

完成后请告诉我：

1. 修改了哪些文件
2. 如何启动项目
3. 访问哪个本地地址预览
4. 下一步建议开发什么
