# 人格测试网站 — 编码任务规划（扩展版 v2.0）

## 项目概况

- **项目名称**：人格测试网站 v2.0
- **技术栈**：Vue 3 + Composition API + Vite + Vue Router + Pinia + CSS/SCSS + TypeScript
- **已有代码基础**：`D:/xxti/personality-test/src/`（单套MBTI测试基础实现，含12题MBTI、答题流程、结果展示、分享、进度恢复）
- **扩展目标**：多套测试主题、类型百科、类型匹配、历史记录、明暗主题、交互动效
- **交付策略**：P0全部必须交付 → P1核心应交付 → P2按时间余量选择性交付

### 已有代码资产清单

| 文件 | 说明 | 扩展操作 |
|------|------|---------|
| `src/types/index.ts` | 基础类型定义（Dimension, Question, TestResult等） | **修改**：扩展新增类型 |
| `src/data/dimensions.ts` | MBTI 4维度 | **迁移**：移至 `data/mbti/dimensions.ts` |
| `src/data/questions.ts` | MBTI 12题 | **迁移**：移至 `data/mbti/questions.ts` |
| `src/data/personalityTypes.ts` | MBTI 16类型 | **迁移**：移至 `data/mbti/types.ts` 并扩展配色/百科 |
| `src/services/storageService.ts` | localStorage封装 | **修改**：新增history/theme方法 |
| `src/services/resultCalculator.ts` | 结果计算 | **修改**：支持专属配色 |
| `src/services/shareService.ts` | 分享服务 | **修改**：支持主题名称 |
| `src/stores/quiz.ts` | 答题状态管理 | **修改**：支持多主题 |
| `src/router/index.ts` | 路由配置 | **修改**：新增路由+懒加载 |
| `src/views/WelcomeView.vue` | 首页 | **替换**：由HomeView替代 |
| `src/views/QuizView.vue` | 答题页 | **修改**：展示主题名称+自动保存历史 |
| `src/views/ResultView.vue` | 结果页 | **修改**：专属配色+匹配入口 |
| `src/components/DimensionBar.vue` | 维度进度条 | **修改**：支持专属配色传入 |
| `src/components/QuestionCard.vue` | 题目卡片 | **修改**：增强动画 |
| `src/components/OptionButton.vue` | 选项按钮 | **修改**：增强微交互动效 |
| `src/components/ProgressBar.vue` | 进度条 | 保留 |
| `src/components/ToastMessage.vue` | 提示消息 | 保留 |
| `src/App.vue` | 根组件 | **修改**：NavBar+路由过渡 |
| `src/main.ts` | 入口 | **修改**：ThemeStore初始化 |
| `src/styles/variables.scss` | CSS变量 | **修改**：暗色变量集 |
| `src/styles/global.scss` | 全局样式 | 保留+扩展 |
| `src/styles/mixins.scss` | SCSS混入 | 保留 |

---

## 迭代1：基础架构扩展（约40min）

> 目标：扩展类型系统、建立多主题注册表、扩展存储服务，为后续功能提供数据与基础设施支撑

### T1-1 扩展 TypeScript 类型定义

- [ ] 扩展 `src/types/index.ts`，新增所有扩展类型定义
  - 新增 `ThemeId` 类型：`'mbti' | 'bigfive' | 'enneagram'`
  - 新增 `ThemeMeta` 接口（id, name, description, questionCount, estimatedTime, icon）
  - 新增 `ThemeConfig` 接口（meta, dimensions, questions, types, encyclopedia, matchRules）
  - 新增 `TypeColors` 接口（primary, secondary, background）
  - 扩展 `PersonalityType` 接口，新增 `colors: TypeColors` 和 `traits: string[]` 字段
  - 新增 `TypeEncyclopedia` 接口（typeId, typeName, alias, coreTraits, strengths, weaknesses, careers, bestMatch, colors, traits）
  - 新增 `MatchRule` 接口（dimensionId, polePairs: Record<string, number>）
  - 新增 `DimensionMatchAnalysis` 接口（dimensionId, dimensionName, poleA, poleB, score, label）
  - 新增 `MatchResult` 接口（typeAId, typeBId, matchPercent, description, dimensionAnalyses）
  - 扩展 `TestResult` 接口，新增 `colors: TypeColors` 字段
  - 扩展 `QuizProgress` 接口，新增 `themeId: ThemeId` 字段
  - 新增 `HistoryRecord` 接口（id, timestamp, themeId, themeName, typeId, typeName, typeDescription, dimensionScores, colors）
  - 新增 `ThemeMode` 类型：`'light' | 'dark'`
- **优先级**：P0
- **依赖**：无
- **验收标准**：所有新增类型可正常导出，已有代码无类型错误（PersonalityType 新增字段为可选过渡）
- **涉及文件**：
  - `src/types/index.ts` 【修改】

### T1-2 创建多主题注册表与重构 MBTI 数据

- [ ] 创建 `src/data/themes.ts` 主题注册表，导出 `getAllThemes(): ThemeMeta[]` 和 `getThemeConfig(id: ThemeId): ThemeConfig`
- [ ] 创建 `src/data/mbti/` 目录，将现有数据迁移并扩展
  - 创建 `src/data/mbti/dimensions.ts`：从 `src/data/dimensions.ts` 迁移 MBTI 维度数据
  - 创建 `src/data/mbti/questions.ts`：从 `src/data/questions.ts` 迁移 MBTI 题目数据
  - 创建 `src/data/mbti/types.ts`：从 `src/data/personalityTypes.ts` 迁移 MBTI 类型数据，为每个类型补充 `colors`（专属配色）和 `traits`（核心特质标签），并补充 `TypeEncyclopedia` 百科数据
  - 创建 `src/data/mbti/matchRules.ts`：定义 MBTI 各维度极组合匹配规则
- [ ] 在 `src/data/themes.ts` 中注册 MBTI 主题配置
- [ ] 保留旧数据文件（`dimensions.ts`、`questions.ts`、`personalityTypes.ts`）作为兼容过渡，最终迭代清理
- **优先级**：P0
- **依赖**：T1-1
- **验收标准**：`getThemeConfig('mbti')` 可返回完整的 ThemeConfig 对象，含维度、题目、类型、百科、匹配规则；MBTI 16个类型均有专属配色和百科内容
- **涉及文件**：
  - `src/data/themes.ts` 【新增】
  - `src/data/mbti/dimensions.ts` 【新增】
  - `src/data/mbti/questions.ts` 【新增】
  - `src/data/mbti/types.ts` 【新增】
  - `src/data/mbti/matchRules.ts` 【新增】

### T1-3 扩展 StorageService

- [ ] 扩展 `src/services/storageService.ts`，新增 history/theme 相关方法
  - 新增 `STORAGE_KEY_HISTORY` 和 `STORAGE_KEY_THEME` 常量
  - 新增 `saveHistory(records: HistoryRecord[]): void`
  - 新增 `loadHistory(): HistoryRecord[]`
  - 新增 `saveTheme(mode: ThemeMode): void`
  - 新增 `loadTheme(): ThemeMode | null`
  - 扩展 `saveProgress` 支持 `QuizProgress.themeId` 字段
- **优先级**：P0
- **依赖**：T1-1
- **验收标准**：新增方法可正确读写 localStorage，isAvailable 检测不变；saveProgress 可持久化含 themeId 的进度数据
- **涉及文件**：
  - `src/services/storageService.ts` 【修改】

---

## 迭代2：核心状态管理扩展（约50min）

> 目标：建立 ThemeStore 和 HistoryStore，扩展 QuizStore 支持多主题，重构首页和答题页

### T2-1 创建 ThemeStore

- [ ] 创建 `src/stores/theme.ts`
  - 状态：`mode: Ref<'light' | 'dark'>`
  - 计算属性：`isDark`
  - 方法：`initTheme()`（localStorage > 系统prefers-color-scheme > 默认亮色）
  - 方法：`toggleTheme()`（切换并持久化到 localStorage，同步更新 `<html>` 的 `data-theme` 属性）
- **优先级**：P1
- **依赖**：T1-3
- **验收标准**：首次访问跟随系统偏好；toggleTheme 后 mode 切换、data-theme 属性更新、localStorage 持久化
- **涉及文件**：
  - `src/stores/theme.ts` 【新增】

### T2-2 创建 HistoryStore

- [ ] 创建 `src/stores/history.ts`
  - 状态：`records: Ref<HistoryRecord[]>`
  - 计算属性：`sortedRecords`（时间倒序）、`hasRecords`
  - 方法：`addRecord(record)`（超20条自动 shift 淘汰最旧）
  - 方法：`removeRecord(id)`、`clearAll()`、`getRecordById(id)`
  - 方法：`loadFromStorage()`（初始化时从 localStorage 加载）
  - 所有变更操作后自动调用 `storageService.saveHistory()` 同步持久化
- **优先级**：P1
- **依赖**：T1-1, T1-3
- **验收标准**：addRecord 后 records 更新且 localStorage 同步；超20条时最旧记录被淘汰；sortedRecords 按时间倒序
- **涉及文件**：
  - `src/stores/history.ts` 【新增】

### T2-3 扩展 QuizStore 支持多主题

- [ ] 修改 `src/stores/quiz.ts`
  - 新增状态：`currentThemeId: Ref<ThemeId>`
  - 修改 `startQuiz(themeId: ThemeId)` 接收主题参数，通过 `getThemeConfig(themeId)` 动态获取数据
  - 修改 `currentQuestion`、`totalQuestions` 等计算属性基于当前主题数据
  - 修改 `calculateResult()` 使用当前主题的维度、题目、类型数据
  - 修改 `persistProgress()` 保存含 `themeId` 的 QuizProgress
  - 修改 `restoreProgress()` 恢复时同步恢复 themeId
  - 新增计算属性：`currentThemeName`
- **优先级**：P0
- **依赖**：T1-1, T1-2, T1-3
- **验收标准**：`startQuiz('mbti')` 后题目为 MBTI 题目集；`startQuiz('bigfive')` 后题目为大五人格题目集；进度恢复含主题信息
- **涉及文件**：
  - `src/stores/quiz.ts` 【修改】

### T2-4 扩展 ResultCalculator 支持专属配色

- [ ] 修改 `src/services/resultCalculator.ts`
  - `calculate()` 函数返回的 `TestResult` 包含 `colors` 字段
  - 从 `PersonalityType` 配置中读取专属配色
- **优先级**：P0
- **依赖**：T1-1
- **验收标准**：calculate 返回结果包含正确的专属配色
- **涉及文件**：
  - `src/services/resultCalculator.ts` 【修改】

### T2-5 重构首页 WelcomeView → HomeView

- [ ] 创建 `src/views/HomeView.vue` 替代 `WelcomeView.vue`
  - 展示网站标题与简介
  - 调用 `getAllThemes()` 展示3个主题卡片（名称、描述、题数、预计耗时、开始测试按钮）
  - 点击主题卡片"开始测试" → `quizStore.startQuiz(themeId)` + `router.push('/quiz')`
  - 保留进度恢复功能（检测当前主题进度）
- [ ] 创建 `src/components/ThemeCard.vue` 主题卡片组件
  - Props: `theme: ThemeMeta`
  - Emits: `select(themeId: ThemeId)`
- **优先级**：P0
- **依赖**：T1-2, T2-3
- **验收标准**：首页展示3个主题卡片；点击MBTI"开始测试"跳转答题页且题目为MBTI题集
- **涉及文件**：
  - `src/views/HomeView.vue` 【新增】
  - `src/components/ThemeCard.vue` 【新增】
  - `src/views/WelcomeView.vue` 【保留，路由替换后清理】

### T2-6 扩展 QuizView 展示当前主题名称与自动保存历史

- [ ] 修改 `src/views/QuizView.vue`
  - 答题页顶部展示当前主题名称（`quizStore.currentThemeName`）
  - 完成最后一题后自动保存结果至历史记录（调用 `historyStore.addRecord()`）
- **优先级**：P0
- **依赖**：T2-3, T2-2
- **验收标准**：答题页顶部显示当前主题名称；完成测试后 localStorage 含历史记录
- **涉及文件**：
  - `src/views/QuizView.vue` 【修改】

### T2-7 扩展 ResultView 支持专属配色与匹配入口

- [ ] 修改 `src/views/ResultView.vue`
  - 应用专属配色（背景、标题、进度条使用 `result.colors`）
  - 新增"类型匹配"按钮，跳转 `/match/{themeId}/{typeId}`
  - 使用 HistoryStore 确保结果已保存
  - 从 `themes.ts` 获取当前主题维度数据（替代硬编码 `dimensions` 导入）
- **优先级**：P0
- **依赖**：T2-3, T2-4, T2-2
- **验收标准**：结果页背景/标题/进度条使用专属配色；点击匹配按钮跳转匹配页；结果已保存至历史记录
- **涉及文件**：
  - `src/views/ResultView.vue` 【修改】

---

## 迭代3：类型百科与类型匹配（约55min）

> 目标：实现类型百科浏览搜索和类型匹配计算展示两大核心页面

### T3-1 创建 EncyclopediaView + 百科组件

- [ ] 创建 `src/views/EncyclopediaView.vue`
  - 主题选择器（Tab 或 Select，3个主题标签）
  - 搜索框（SearchInput 组件，实时过滤）
  - 类型卡片列表（TypeCard[]，响应式网格布局）
  - 类型详情展示（TypeDetail 弹窗/面板）
  - 切换主题时重新加载对应百科数据
  - 搜索基于名称和核心特质标签本地筛选
  - 搜索无结果使用 EmptyState 组件
- [ ] 创建 `src/components/TypeCard.vue`（类型百科卡片）
  - Props: `type: TypeEncyclopedia`, `colors: TypeColors`
  - Emits: `click`
  - 展示类型名称、核心特质标签、专属配色缩略
- [ ] 创建 `src/components/TypeDetail.vue`（类型详情）
  - Props: `type: TypeEncyclopedia`, `colors: TypeColors`, `visible: boolean`
  - 展示：类型名称+别名、核心特质、优势列表、劣势列表、典型职业列表、最佳匹配类型
- [ ] 创建 `src/components/SearchInput.vue`（搜索输入框）
  - Props: `placeholder: string`, `modelValue: string`
  - Emits: `update:modelValue`
  - 双向绑定搜索关键词，实时过滤
- [ ] 创建 `src/components/EmptyState.vue`（空状态占位）
  - Props: `message: string`, `actionText: string`
  - Emits: `action`
  - 展示提示文案和操作按钮
- **优先级**：P0
- **依赖**：T1-2, T1-1
- **验收标准**：进入百科页→显示主题选择器+卡片列表；切换主题→列表更新；搜索→筛选结果；无匹配→空状态提示；点击卡片→完整详情
- **涉及文件**：
  - `src/views/EncyclopediaView.vue` 【新增】
  - `src/components/TypeCard.vue` 【新增】
  - `src/components/TypeDetail.vue` 【新增】
  - `src/components/SearchInput.vue` 【新增】
  - `src/components/EmptyState.vue` 【新增】

### T3-2 创建 MatchCalculator 服务

- [ ] 创建 `src/services/matchCalculator.ts`
  - `calculateMatch(typeAId, typeBId, themeId): MatchResult`
    - 解析两类型的维度极组合
    - 逐维度查规则表获取匹配贡献分
    - 求平均 × 100% = 总匹配度
    - 生成各维度匹配分析描述
  - `getMatchDescription(matchPercent): string`（根据匹配度生成总体描述）
  - `getDimensionAnalysis(dimA, dimB, rule): DimensionMatchAnalysis`（单维度匹配分析）
  - 保证对称性：A↔B 匹配度 = B↔A 匹配度
  - 自匹配度 = 100%
- **优先级**：P1
- **依赖**：T1-1, T1-2
- **验收标准**：calculateMatch 返回正确匹配度；A↔B 对称；自匹配度=100%；分析描述合理
- **涉及文件**：
  - `src/services/matchCalculator.ts` 【新增】

### T3-3 创建 MatchView + MatchRing 组件

- [ ] 创建 `src/views/MatchView.vue`
  - 从路由参数获取 themeId 和预选 typeAId
  - 类型A选择器（预选用户结果类型，可切换）
  - 类型B选择器（同主题所有类型下拉选择）
  - 调用 MatchCalculator 计算匹配度
  - 展示 MatchRing（匹配度环形进度图 + 百分比数字）
  - 展示匹配分析描述文本
  - 展示各维度匹配分析列表（维度名 + A极/B极 + 一致/互补/差异标签）
- [ ] 创建 `src/components/MatchRing.vue`（匹配度环形图）
  - Props: `percent: number`, `color: string`
  - SVG 绘制环形进度图，动画填充
- **优先级**：P1
- **依赖**：T3-2, T1-2
- **验收标准**：进入匹配页→一端预选+另一端选择器；选择类型后展示匹配度和分析；A↔B 匹配度对称
- **涉及文件**：
  - `src/views/MatchView.vue` 【新增】
  - `src/components/MatchRing.vue` 【新增】

---

## 迭代4：历史记录、全局组件与主题（约45min）

> 目标：实现历史记录页面、全局导航栏、明暗主题切换，更新路由与App根组件

### T4-1 创建 HistoryView

- [ ] 创建 `src/views/HistoryView.vue`
  - 按时间倒序展示所有历史记录（`historyStore.sortedRecords`）
  - 每条记录含测试时间、主题名称、类型名称、专属配色标记
  - 点击记录查看该次测试完整结果（内联展示或弹窗）
  - 删除单条记录按钮（调用 `historyStore.removeRecord()`）
  - 清空所有记录按钮（调用 `historyStore.clearAll()`）
  - 无记录时使用 EmptyState 组件展示"暂无测试记录"和"去测试"按钮
  - 初始化时调用 `historyStore.loadFromStorage()`
- **优先级**：P1
- **依赖**：T2-2, T3-1（EmptyState 组件）
- **验收标准**：有记录→时间倒序列出；无记录→空状态提示；可删除单条/清空全部；点击记录查看完整结果
- **涉及文件**：
  - `src/views/HistoryView.vue` 【新增】

### T4-2 创建 NavBar + ThemeToggle 全局组件

- [ ] 创建 `src/components/NavBar.vue`（全局导航栏）
  - 导航项：首页(`/`)、类型百科(`/encyclopedia`)、历史记录(`/history`)
  - 通过 `useRoute()` 自动高亮当前路由
  - 响应式布局（移动端底部导航/桌面端顶部导航）
  - 嵌入 ThemeToggle 按钮
- [ ] 创建 `src/components/ThemeToggle.vue`（明暗主题切换按钮）
  - 通过 ThemeStore 读写主题状态
  - 图标切换（☀️/🌙），点击调用 `themeStore.toggleTheme()`
- **优先级**：P1
- **依赖**：T2-1
- **验收标准**：NavBar 在所有页面可见且当前路由高亮；点击 ThemeToggle 图标切换，主题全局生效
- **涉及文件**：
  - `src/components/NavBar.vue` 【新增】
  - `src/components/ThemeToggle.vue` 【新增】

### T4-3 扩展 CSS 变量与明暗主题样式

- [ ] 修改 `src/styles/variables.scss`
  - 将现有 `:root` 变量集关联到 `[data-theme="light"]`
  - 新增 `[data-theme="dark"]` 暗色变量集
  - 新增 `--shadow-card` 变量（亮色/暗色不同阴影）
- [ ] 创建 `src/styles/themes.scss`（主题切换相关样式）
  - CSS 变量选择器切换逻辑
  - 过渡动画 `transition: background-color 0.3s, color 0.3s`
- **优先级**：P1
- **依赖**：T2-1
- **验收标准**：`data-theme="dark"` 时所有 CSS 变量切换为暗色值；切换过渡平滑
- **涉及文件**：
  - `src/styles/variables.scss` 【修改】
  - `src/styles/themes.scss` 【新增】

### T4-4 更新 App.vue 与路由配置

- [ ] 修改 `src/App.vue`
  - 嵌入 NavBar 组件
  - 路由过渡动画：`<Transition name="fade" mode="out-in">`
  - 调整页面布局（NavBar + 主内容区）
- [ ] 修改 `src/router/index.ts`
  - 替换 WelcomeView 为 HomeView
  - 新增路由：`/encyclopedia`、`/encyclopedia/:themeId`、`/match`、`/match/:themeId/:typeAId`、`/history`、`/history/:id`
  - 非首屏路由使用懒加载
  - 保留结果页守卫（未完成测试重定向首页）
- [ ] 修改 `src/main.ts`
  - 在 `app.mount()` 前调用 `themeStore.initTheme()`，避免闪烁
- **优先级**：P0（路由与App为P0基础）
- **依赖**：T2-5, T3-1, T3-3, T4-1, T4-2, T4-3
- **验收标准**：所有新路由可正常访问；NavBar 全局展示；路由切换有过渡动画；首次加载主题正确无闪烁
- **涉及文件**：
  - `src/App.vue` 【修改】
  - `src/router/index.ts` 【修改】
  - `src/main.ts` 【修改】

### T4-5 扩展 ShareService 支持主题名称

- [ ] 修改 `src/services/shareService.ts`
  - `generateSummary(result, themeName)` 生成含主题名称的摘要文本
  - `copyResult(result, themeName)` 复制含主题名称的结果到剪贴板
- [ ] 修改 `ResultView.vue` 中分享调用，传入 `themeName`
- **优先级**：P1
- **依赖**：T2-7
- **验收标准**：分享文本包含主题名称；复制成功提示正常
- **涉及文件**：
  - `src/services/shareService.ts` 【修改】
  - `src/views/ResultView.vue` 【修改】

---

## 迭代5：多主题数据配置与动效（约60min）

> 目标：完成大五人格和九型人格数据配置，补充 MBTI 百科/匹配数据，添加交互动效

### T5-1 编写大五人格数据配置

- [ ] 创建 `src/data/bigfive/dimensions.ts`（5个维度：开放性O、尽责性C、外向性E、宜人性A、神经质N）
- [ ] 创建 `src/data/bigfive/questions.ts`（至少10道题目，每维度至少2题）
- [ ] 创建 `src/data/bigfive/types.ts`（代表性类型组合 + 专属配色 + 百科内容，精简为高配色区分度的简化版）
- [ ] 创建 `src/data/bigfive/matchRules.ts`（各维度极组合匹配规则）
- [ ] 在 `src/data/themes.ts` 中注册 bigfive 主题
- **优先级**：P0
- **依赖**：T1-2
- **验收标准**：`getThemeConfig('bigfive')` 返回完整配置；题目≥10且每维度≥2题；类型数据含专属配色
- **涉及文件**：
  - `src/data/bigfive/dimensions.ts` 【新增】
  - `src/data/bigfive/questions.ts` 【新增】
  - `src/data/bigfive/types.ts` 【新增】
  - `src/data/bigfive/matchRules.ts` 【新增】
  - `src/data/themes.ts` 【修改】

### T5-2 编写九型人格数据配置

- [ ] 创建 `src/data/enneagram/dimensions.ts`（核心维度定义，适配九型9种类型）
- [ ] 创建 `src/data/enneagram/questions.ts`（至少8道题目）
- [ ] 创建 `src/data/enneagram/types.ts`（9种类型 + 专属配色 + 百科内容）
- [ ] 创建 `src/data/enneagram/matchRules.ts`（匹配规则）
- [ ] 在 `src/data/themes.ts` 中注册 enneagram 主题
- **优先级**：P0
- **依赖**：T1-2
- **验收标准**：`getThemeConfig('enneagram')` 返回完整配置；题目≥8；9种类型均有专属配色和百科内容
- **涉及文件**：
  - `src/data/enneagram/dimensions.ts` 【新增】
  - `src/data/enneagram/questions.ts` 【新增】
  - `src/data/enneagram/types.ts` 【新增】
  - `src/data/enneagram/matchRules.ts` 【新增】
  - `src/data/themes.ts` 【修改】

### T5-3 补充 MBTI 百科与匹配规则数据

- [ ] 补充 `src/data/mbti/types.ts` 中16个类型的 `TypeEncyclopedia` 百科内容（别名、核心特质详述、优势、劣势、典型职业、最佳匹配类型）
- [ ] 完善 `src/data/mbti/matchRules.ts` 匹配规则（4个维度各极组合的匹配贡献分）
- **优先级**：P0
- **依赖**：T1-2
- **验收标准**：MBTI 16个类型均有完整百科内容；匹配规则覆盖所有极组合
- **涉及文件**：
  - `src/data/mbti/types.ts` 【修改】
  - `src/data/mbti/matchRules.ts` 【修改】

### T5-4 添加交互动效与减弱动效支持

- [ ] 创建 `src/styles/transitions.scss`
  - 路由淡入淡出：`.fade-enter-active`, `.fade-leave-active`（≤300ms）
  - 题目滑入滑出：`.slide-enter-active`, `.slide-leave-active`（≤400ms）
  - 减弱动效偏好：`@media (prefers-reduced-motion: reduce)` 禁用/简化动画
- [ ] 修改 `src/components/QuestionCard.vue`
  - 添加题目切换 Transition 包裹
- [ ] 修改 `src/components/OptionButton.vue`
  - 选中选项微交互动效（缩放弹跳，≤200ms）
- [ ] 修改 `src/components/TypeCard.vue`
  - 悬停微上浮+阴影动效（≤200ms）
- **优先级**：P2
- **依赖**：T3-1, T2-6
- **验收标准**：题目切换有滑动过渡；选项选中有动效；路由切换有淡入淡出；减弱动效偏好下动画禁用/简化
- **涉及文件**：
  - `src/styles/transitions.scss` 【新增】
  - `src/components/QuestionCard.vue` 【修改】
  - `src/components/OptionButton.vue` 【修改】
  - `src/components/TypeCard.vue` 【修改】

---

## 迭代6：验证与清理（约15min）

> 目标：清理旧文件，全量功能验证，构建产物检查

### T6-1 清理旧数据文件与全量验证

- [ ] 删除旧数据文件（确认迁移完成后）
  - `src/data/dimensions.ts` 【删除】
  - `src/data/questions.ts` 【删除】
  - `src/data/personalityTypes.ts` 【删除】
- [ ] 删除旧首页
  - `src/views/WelcomeView.vue` 【删除】
- [ ] 全量功能验证
  - 首页3主题卡片展示正常
  - MBTI/大五/九型答题流程完整闭环
  - 结果页专属配色正确应用
  - 类型百科搜索与详情正常
  - 类型匹配计算正确且对称
  - 历史记录增删查清空正常，最多20条
  - 明暗主题切换持久化，跟随系统
  - 路由守卫生效（非法访问结果页重定向首页）
  - 路由过渡动画正常
- [ ] 构建验证：`npm run build` 无错误，产物 ≤ 800KB
- **优先级**：P0
- **依赖**：所有前置任务
- **验收标准**：无旧文件残留；全部功能正常运行；构建产物 ≤ 800KB
- **涉及文件**：
  - `src/data/dimensions.ts` 【删除】
  - `src/data/questions.ts` 【删除】
  - `src/data/personalityTypes.ts` 【删除】
  - `src/views/WelcomeView.vue` 【删除】

---

## 任务依赖关系图

```
T1-1 ──┬── T1-2 ──┬── T2-3 ──┬── T2-5 (HomeView)
       │          │          ├── T2-6 (QuizView扩展)
       │          │          └── T2-7 (ResultView扩展)
       │          ├── T3-1 (EncyclopediaView) ── T4-1 (HistoryView)
       │          ├── T3-2 ── T3-3 (MatchView)
       │          ├── T5-1 (BigFive数据)
       │          ├── T5-2 (Enneagram数据)
       │          └── T5-3 (MBTI补充)
       ├── T1-3 ──┬── T2-1 (ThemeStore) ──┬── T4-2 (NavBar+ThemeToggle)
       │          │                       └── T4-3 (CSS变量)
       │          └── T2-2 (HistoryStore) ── T4-1
       └── T2-4 (ResultCalculator扩展)

T2-5 + T3-1 + T3-3 + T4-1 + T4-2 + T4-3 ── T4-4 (App+路由+main)

T3-1 + T2-6 ── T5-4 (动效)

全部完成 ── T6-1 (清理验证)
```

---

## 优先级与迭代交付矩阵

| 迭代 | 任务范围 | 优先级覆盖 | 预估工时 | 交付内容 |
|------|---------|-----------|---------|---------|
| 迭代1 | T1-1 ~ T1-3 | P0基础 | ~40min | 类型系统+主题注册表+存储扩展 |
| 迭代2 | T2-1 ~ T2-7 | P0核心+P1基础 | ~50min | Store扩展+首页重构+答题/结果页扩展 |
| 迭代3 | T3-1 ~ T3-3 | P0百科+P1匹配 | ~55min | 类型百科+匹配计算+匹配页面 |
| 迭代4 | T4-1 ~ T4-5 | P1功能 | ~45min | 历史记录+NavBar+主题+路由更新 |
| 迭代5 | T5-1 ~ T5-4 | P0数据+P2动效 | ~60min | 大五/九型数据+MBTI补充+动效 |
| 迭代6 | T6-1 | P0验证 | ~15min | 清理旧文件+全量验证 |
| **合计** | **27个任务** | **P0全部+P1核心+P2部分** | **~265min** | **完整扩展版本** |

---

## 需求覆盖追踪

| 需求ID | 需求名称 | 优先级 | 对应任务 |
|--------|---------|--------|---------|
| FR-01 | 首页与测试主题选择 | P0 | T2-5, T4-2, T4-4 |
| FR-02 | 答题流程 | P0 | T2-3, T2-6 |
| FR-03 | 结果计算 | P0 | T2-3, T2-4 |
| FR-04 | 结果展示 | P0 | T2-7 |
| FR-05 | 结果分享 | P1 | T4-5 |
| FR-06 | 答题进度恢复 | P1 | T2-3, T1-3 |
| FR-07 | 类型百科 | P0 | T3-1 |
| FR-08 | 类型匹配 | P1 | T3-2, T3-3 |
| FR-09 | 历史记录 | P1 | T2-2, T4-1 |
| FR-10 | 明暗主题切换 | P1 | T2-1, T4-2, T4-3 |
| FR-11 | 页面过渡与动效 | P2 | T5-4 |
| FR-12 | 非法页面访问处理 | P1 | T4-4 |

---

## 新增文件清单

| 文件路径 | 所属迭代 | 说明 |
|---------|---------|------|
| `src/data/themes.ts` | 迭代1 | 主题注册表 |
| `src/data/mbti/dimensions.ts` | 迭代1 | MBTI维度配置 |
| `src/data/mbti/questions.ts` | 迭代1 | MBTI题目配置 |
| `src/data/mbti/types.ts` | 迭代1 | MBTI类型+配色+百科 |
| `src/data/mbti/matchRules.ts` | 迭代1 | MBTI匹配规则 |
| `src/stores/theme.ts` | 迭代2 | 明暗主题状态管理 |
| `src/stores/history.ts` | 迭代2 | 历史记录状态管理 |
| `src/views/HomeView.vue` | 迭代2 | 新首页（主题卡片选择） |
| `src/components/ThemeCard.vue` | 迭代2 | 测试主题卡片组件 |
| `src/views/EncyclopediaView.vue` | 迭代3 | 类型百科页面 |
| `src/components/TypeCard.vue` | 迭代3 | 类型百科卡片 |
| `src/components/TypeDetail.vue` | 迭代3 | 类型详情展示 |
| `src/components/SearchInput.vue` | 迭代3 | 搜索输入框 |
| `src/components/EmptyState.vue` | 迭代3 | 空状态占位 |
| `src/services/matchCalculator.ts` | 迭代3 | 匹配度计算服务 |
| `src/views/MatchView.vue` | 迭代3 | 类型匹配页面 |
| `src/components/MatchRing.vue` | 迭代3 | 匹配度环形图 |
| `src/views/HistoryView.vue` | 迭代4 | 历史记录页面 |
| `src/components/NavBar.vue` | 迭代4 | 全局导航栏 |
| `src/components/ThemeToggle.vue` | 迭代4 | 明暗主题切换按钮 |
| `src/styles/themes.scss` | 迭代4 | 明暗主题CSS变量 |
| `src/data/bigfive/dimensions.ts` | 迭代5 | 大五人格维度 |
| `src/data/bigfive/questions.ts` | 迭代5 | 大五人格题目 |
| `src/data/bigfive/types.ts` | 迭代5 | 大五人格类型+百科 |
| `src/data/bigfive/matchRules.ts` | 迭代5 | 大五人格匹配规则 |
| `src/data/enneagram/dimensions.ts` | 迭代5 | 九型人格维度 |
| `src/data/enneagram/questions.ts` | 迭代5 | 九型人格题目 |
| `src/data/enneagram/types.ts` | 迭代5 | 九型人格类型+百科 |
| `src/data/enneagram/matchRules.ts` | 迭代5 | 九型人格匹配规则 |
| `src/styles/transitions.scss` | 迭代5 | 过渡动画样式 |

---

## 更新历史

| 版本 | 日期 | 修改内容 | 修改人 |
|------|------|---------|--------|
| v1.0 | 2026-05-21 | 初始版本，包含基础人格测试功能（22个任务，4个阶段） | spec-task-agent |
| v2.0 | 2026-05-21 | 扩展版本，新增6大模块编码任务规划：多套测试主题、类型百科、类型匹配、历史记录、明暗主题切换、交互动效，共27个任务6个迭代，基于已有代码基础标注新增/修改/删除 | spec-task-agent |
