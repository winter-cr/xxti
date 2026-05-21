# 人格测试网站 - 编码任务规划

## 任务总览

基于 design.md 技术实现方案，将开发工作拆解为 4 个实施阶段、22 项具体任务，覆盖全部功能需求（FR-01~FR-07）与非功能需求（NFR-01~NFR-05）。

---

## 1. 阶段一：项目初始化与基础配置

> 搭建项目脚手架，完成类型定义与配置数据编写，为后续开发提供类型安全基础与数据驱动能力。

- [ ] **T-01** 项目初始化与脚手架搭建
  - 使用 Vite 创建 Vue 3 + TypeScript 项目
  - 安装依赖：`vue-router@^4.x`、`pinia@^2.x`、`sass`
  - 配置 `vite.config.ts`（路径别名 `@` 指向 `src/`）
  - 配置 `tsconfig.json`（启用严格模式，配置路径映射）
  - 创建目录结构：`src/{router,stores,services,data,types,views,components,styles}`
  - **优先级**：P0 | **依赖**：无 | **涉及文件**：`package.json`、`vite.config.ts`、`tsconfig.json`、`src/main.ts`、`src/App.vue`
  - **验收标准**：`npm run dev` 启动成功，浏览器访问可见默认页面

- [ ] **T-02** 定义 TypeScript 类型系统
  - 在 `src/types/index.ts` 中定义全部核心类型接口
  - 定义 `PoleId`（'A' | 'B'）、`Dimension`、`QuestionOption`、`Question`、`PersonalityType`、`DimensionScore`、`TestResult`、`QuizProgress` 接口
  - 导出所有类型供全局使用
  - **优先级**：P0 | **依赖**：T-01 | **涉及文件**：`src/types/index.ts`
  - **验收标准**：类型文件无 TypeScript 编译错误，所有接口字段与 design.md 数据模型完全一致

- [ ] **T-03** 编写人格维度配置数据
  - 在 `src/data/dimensions.ts` 中定义 4 个 MBTI 维度（EI/NS/TF/JP）
  - 每个维度包含 id、name、poleAName、poleBName、poleAKey、poleBKey
  - 添加维度数量校验（2~6个）
  - **优先级**：P0 | **依赖**：T-02 | **涉及文件**：`src/data/dimensions.ts`
  - **验收标准**：维度数量为 4，每个维度包含完整双极定义，维度标识与极标识符合数据约束 DC-01

- [ ] **T-04** 编写测试题目配置数据
  - 在 `src/data/questions.ts` 中定义至少 8 道测试题目
  - 每题包含 index、text、dimensionId、optionA、optionB
  - 选项分别对应维度两极，每维度至少关联 2 道题目
  - 添加题目数量校验（≥8）与维度覆盖校验（每维度≥2题）
  - **优先级**：P0 | **依赖**：T-02、T-03 | **涉及文件**：`src/data/questions.ts`
  - **验收标准**：题目总数 ≥ 8，每题恰好 2 选项，每维度至少 2 题，符合数据约束 DC-02

- [ ] **T-05** 编写人格类型描述配置数据
  - 在 `src/data/personalityTypes.ts` 中定义 16 种 MBTI 人格类型
  - 每个类型包含 id（极key拼接如 ENTJ）、name、description
  - 类型描述兼顾专业性与趣味性，长度 ≤ 500 字符
  - 添加类型数量校验（= 2^维度数）
  - **优先级**：P0 | **依赖**：T-02、T-03 | **涉及文件**：`src/data/personalityTypes.ts`
  - **验收标准**：类型数量 = 16，类型标识为维度极key拼接，描述文案长度合规，符合数据约束 DC-03

---

## 2. 阶段二：核心服务与状态管理

> 实现 StorageService、ResultCalculator、ShareService 三大服务与 QuizStore 状态管理，建立业务逻辑骨架。

- [ ] **T-06** 实现 StorageService 本地存储服务
  - 在 `src/services/storageService.ts` 中封装 localStorage 操作
  - 实现 `isAvailable()`：检测 localStorage 可用性
  - 实现 `saveProgress(data: QuizProgress)`：保存答题进度到 localStorage
  - 实现 `loadProgress()`：从 localStorage 加载答题进度
  - 实现 `clearProgress()`：清除答题进度
  - 定义存储键常量 `STORAGE_KEY = 'personality-test-progress'`
  - **优先级**：P1 | **依赖**：T-02 | **涉及文件**：`src/services/storageService.ts`
  - **验收标准**：localStorage 可用时正确存取进度数据；不可用时 `isAvailable()` 返回 false，所有方法安全降级不报错

- [ ] **T-07** 实现 ResultCalculator 结果计算服务
  - 在 `src/services/resultCalculator.ts` 中实现核心计算逻辑
  - 实现 `calculate()` 函数：接收答题记录、维度配置、题目配置、类型描述配置，返回 TestResult
  - 算法流程：遍历所有维度 → 统计每维度两极得分 → 高分极为结果极（相等取第一极A） → 拼接类型标识 → 查找类型描述
  - **优先级**：P0 | **依赖**：T-02、T-03 | **涉及文件**：`src/services/resultCalculator.ts`
  - **验收标准**：各维度得分正确汇总；类型判定与极key拼接一致；得分相等时取第一极；计算耗时 < 1ms

- [ ] **T-08** 实现 ShareService 分享服务
  - 在 `src/services/shareService.ts` 中实现分享逻辑
  - 实现 `generateSummary(result: TestResult)`：生成分享摘要文本，格式为"我的人格类型是【类型名称】！类型描述"
  - 实现 `copyResult(result: TestResult)`：调用 `navigator.clipboard.writeText()` 写入剪贴板，成功返回 true，失败返回 false
  - **优先级**：P1 | **依赖**：T-02 | **涉及文件**：`src/services/shareService.ts`
  - **验收标准**：生成摘要包含类型名称和描述；剪贴板 API 可用时复制成功；不可用时返回 false 触发降级

- [ ] **T-09** 实现 QuizStore 状态管理（Pinia）
  - 在 `src/stores/quiz.ts` 中使用 `<script setup>` 风格定义 `useQuizStore`
  - 状态：`currentQuestionIndex`、`answers`（Map）、`selectedOption`、`result`
  - 计算属性：`currentQuestion`、`totalQuestions`、`progress`（"N/总题数"）、`isQuizComplete`、`isLastQuestion`
  - 动作：`startQuiz()`、`selectOption(optionId)`、`goToNext()`（未选返回 false）、`calculateResult()`、`resetQuiz()`、`restoreProgress()`
  - 在每次答题操作后调用 `storageService.saveProgress()` 持久化
  - **优先级**：P0 | **依赖**：T-02、T-06、T-07 | **涉及文件**：`src/stores/quiz.ts`
  - **验收标准**：状态流转正确（开始→答题→完成→重置）；进度文本格式正确；goToNext 在未选选项时返回 false；calculateResult 正确调用 ResultCalculator

- [ ] **T-10** 配置路由与路由守卫
  - 在 `src/router/index.ts` 中配置 3 条路由：`/` → WelcomeView、`/quiz` → QuizView、`/result` → ResultView
  - 实现 `/result` 路由的 `beforeEnter` 守卫：检测 `quizStore.isQuizComplete`，未完成则重定向至 `/`
  - 在 `src/main.ts` 中注册 router 和 pinia
  - **优先级**：P0 | **依赖**：T-09 | **涉及文件**：`src/router/index.ts`、`src/main.ts`
  - **验收标准**：直接访问 `/result` 未完成测试时被重定向至首页；已完成测试时正常展示结果页

---

## 3. 阶段三：视图组件与页面实现

> 从全局样式与基础组件开始，逐层实现欢迎页、答题页、结果页及其子组件。

- [ ] **T-11** 实现全局样式与响应式 mixin
  - 在 `src/styles/variables.scss` 中定义 CSS 自定义属性（主色、中性色、语义色、维度配色）
  - 在 `src/styles/mixins.scss` 中定义响应式 mixin（mobile: ≤767px、tablet: 768~1023px、desktop: ≥1024px）
  - 在 `src/styles/global.scss` 中定义全局基础样式（body、字体、盒模型、居中布局）
  - 在 `src/main.ts` 中引入全局样式
  - **优先级**：P0 | **依赖**：T-01 | **涉及文件**：`src/styles/variables.scss`、`src/styles/mixins.scss`、`src/styles/global.scss`
  - **验收标准**：CSS 变量生效，响应式 mixin 在对应断点正确应用，基础布局居中

- [ ] **T-12** 实现 ToastMessage 提示组件
  - 在 `src/components/ToastMessage.vue` 中实现轻量提示组件
  - Props：`message`（string）、`duration`（number，默认2000）、`visible`（boolean）
  - 固定定位页面顶部中央，CSS transition 实现淡入淡出
  - 自动定时关闭（duration 后 visible 变为 false）
  - **优先级**：P0 | **依赖**：T-01 | **涉及文件**：`src/components/ToastMessage.vue`
  - **验收标准**：提示文本正确显示，2秒后自动淡出消失，位置固定顶部中央

- [ ] **T-13** 实现 WelcomeView 欢迎引导页
  - 在 `src/views/WelcomeView.vue` 中实现首页
  - 展示：测试标题、测试简介、预计耗时（根据题目数量动态计算，每题约15秒）、"开始测试"按钮
  - 点击"开始测试" → `quizStore.startQuiz()` → `router.push('/quiz')`
  - 若 localStorage 存在未完成进度，提示用户可选择继续或重新开始
  - 居中单列布局，最大宽度 480px
  - **优先级**：P0 | **依赖**：T-09、T-11 | **涉及文件**：`src/views/WelcomeView.vue`
  - **验收标准**：首页可见测试简介、预计耗时、"开始测试"按钮；点击按钮跳转至答题页第1题；存在未完成进度时显示继续提示

- [ ] **T-14** 实现 ProgressBar 进度条组件
  - 在 `src/components/ProgressBar.vue` 中实现答题进度展示
  - Props：`current`（number，当前题号1-indexed）、`total`（number，总题数）
  - 展示：进度条 + 文本 "N/总题数"
  - 进度条宽度 = current / total * 100%
  - **优先级**：P0 | **依赖**：T-02 | **涉及文件**：`src/components/ProgressBar.vue`
  - **验收标准**：进度条宽度随 current 变化正确更新；文本显示格式为 "N/总题数"

- [ ] **T-15** 实现 OptionButton 选项按钮组件
  - 在 `src/components/OptionButton.vue` 中实现选项按钮
  - Props：`option`（QuestionOption）、`isSelected`（boolean）
  - Emit：`click`（optionId: string）
  - 选中状态高亮（主色背景 + 白色文字），未选状态默认样式（浅色背景 + 主色边框）
  - 响应式：宽度100%，竖向排列
  - **优先级**：P0 | **依赖**：T-02、T-11 | **涉及文件**：`src/components/OptionButton.vue`
  - **验收标准**：点击触发 click 事件传递 optionId；选中时高亮样式正确；未选中时默认样式正确

- [ ] **T-16** 实现 QuestionCard 单题卡片组件
  - 在 `src/components/QuestionCard.vue` 中组合题目展示
  - Props：`question`（Question）、`selectedOptionId`（string | null）
  - Emit：`select`（optionId: string）
  - 展示题目文本 + OptionButton A + OptionButton B
  - 点击选项触发 select 事件，传递 optionId
  - **优先级**：P0 | **依赖**：T-14、T-15 | **涉及文件**：`src/components/QuestionCard.vue`
  - **验收标准**：正确渲染题目文本和2个选项；选中选项时高亮传递正确；select 事件正确触发

- [ ] **T-17** 实现 QuizView 答题页面
  - 在 `src/views/QuizView.vue` 中实现答题主页面
  - 组合 ProgressBar + QuestionCard + 下一题/查看结果按钮 + ToastMessage
  - 从 `quizStore` 获取当前题目、进度、选中状态
  - 点击选项 → `quizStore.selectOption(optionId)` → 高亮切换
  - 点击下一题 → 检查 selectedOption 为 null 时 ToastMessage 提示"请先选择一个选项"；已选时 `quizStore.goToNext()`
  - 最后一题时按钮文案变"查看结果" → `quizStore.calculateResult()` → `router.push('/result')`
  - 居中单列布局，最大宽度 600px
  - **优先级**：P0 | **依赖**：T-09、T-12、T-16 | **涉及文件**：`src/views/QuizView.vue`
  - **验收标准**：逐题展示正确，进度实时更新；未选选项时提示且不跳转；选后高亮且可进下一题；最后一题后跳转结果页

- [ ] **T-18** 实现 DimensionBar 维度得分进度条组件
  - 在 `src/components/DimensionBar.vue` 中实现维度可视化
  - Props：`dimension`（Dimension）、`poleAScore`（number）、`poleBScore`（number）
  - 两极分左右展示进度条，高分侧加粗/加深颜色，标注得分数值与极名称
  - 使用 CSS 自定义属性 `--color-dimension-a` 和 `--color-dimension-b` 配色
  - **优先级**：P0 | **依赖**：T-02、T-11 | **涉及文件**：`src/components/DimensionBar.vue`
  - **验收标准**：两极得分对比展示清晰；高分侧视觉强调正确；极名称和得分数值标注正确

- [ ] **T-19** 实现 ResultView 结果展示页
  - 在 `src/views/ResultView.vue` 中实现结果主页面
  - 从 `quizStore.result` 读取测试结果
  - 展示：人格类型名称（大号字体，视觉焦点）+ 类型描述 + 各维度 DimensionBar + 分享按钮 + 重新测试按钮
  - 点击"分享结果" → `shareService.copyResult(result)` → 成功则 ToastMessage 提示"复制成功"；失败则展示 `<textarea>` 供手动选择复制并提示"请手动选择并复制以下内容"
  - 点击"重新测试" → `quizStore.resetQuiz()` → `router.push('/')`
  - 居中单列布局，维度条最大宽度 640px
  - **优先级**：P0 | **依赖**：T-09、T-08、T-12、T-18 | **涉及文件**：`src/views/ResultView.vue`
  - **验收标准**：结果页包含类型名称、描述、维度可视化、分享按钮、重新测试按钮；分享复制到剪贴板成功/失败降级均正常；重新测试清除数据返回首页

---

## 4. 阶段四：集成联调与优化验证

> 路由整合、全流程联调、响应式适配验证、构建产物验证。

- [ ] **T-20** 路由整合与全流程联调
  - 将三个页面视图组件接入路由配置
  - 验证完整流程：首页 → 点击开始测试 → 答题页逐题答题 → 完成后结果页 → 重新测试回到首页
  - 验证结果分享流程：结果页 → 点击分享 → 复制成功提示
  - 验证路由守卫：直接访问 `/result` 被重定向至首页
  - 验证进度恢复：答题中途刷新页面 → 恢复至未答题目
  - **优先级**：P0 | **依赖**：T-10、T-13、T-17、T-19 | **涉及文件**：`src/router/index.ts`、`src/App.vue`
  - **验收标准**：全流程闭环无阻断；路由跳转正确；守卫拦截正确；进度恢复正确

- [ ] **T-21** 响应式适配验证与修复
  - 在 320px、768px、1024px、1920px 宽度下验证各页面布局
  - 验证移动端按钮宽度100%、桌面端自适应宽度
  - 验证字体大小在不同断点下的表现
  - 验证内容区水平居中与最大宽度限制
  - 修复发现的布局问题
  - **优先级**：P0 | **依赖**：T-20 | **涉及文件**：所有 `.vue` 和 `.scss` 文件
  - **验收标准**：320px~1920px 宽度范围内布局正确，无溢出/截断/错位

- [ ] **T-22** 构建产物体积与性能验证
  - 运行 `npm run build` 构建生产产物
  - 统计 dist 目录下所有静态资源总大小（不含图片）≤ 500KB
  - 验证首屏加载时间 ≤ 2秒
  - 验证无第三方追踪脚本引入
  - 验证无外部网络请求
  - **优先级**：P0 | **依赖**：T-20 | **涉及文件**：`vite.config.ts`、构建产物
  - **验收标准**：静态资源总大小 ≤ 500KB；首屏加载 ≤ 2秒；无外部请求；纯静态产物

---

## 任务依赖关系图

```
T-01 (项目初始化)
├── T-02 (类型定义)
│   ├── T-03 (维度配置)
│   │   ├── T-04 (题目配置)
│   │   └── T-05 (类型描述配置)
│   ├── T-06 (StorageService)
│   ├── T-07 (ResultCalculator)
│   ├── T-08 (ShareService)
│   ├── T-14 (ProgressBar)
│   ├── T-15 (OptionButton) ─── T-11 (全局样式)
│   └── T-18 (DimensionBar) ─── T-11 (全局样式)
├── T-11 (全局样式)
├── T-12 (ToastMessage)
│   └── T-09 (QuizStore) ─── T-06, T-07
│       └── T-10 (路由守卫)
│           └── T-20 (联调) ─── T-13, T-17, T-19
│               ├── T-21 (响应式验证)
│               └── T-22 (体积验证)
└── T-13 (WelcomeView) ─── T-09, T-11

T-16 (QuestionCard) ─── T-14, T-15
T-17 (QuizView) ─── T-09, T-12, T-16
T-19 (ResultView) ─── T-09, T-08, T-12, T-18
```

## 需求覆盖追踪

| 需求ID | 需求名称 | 对应任务 | 优先级 |
|--------|---------|---------|--------|
| FR-01 | 欢迎与引导 | T-13 | P0 |
| FR-02 | 答题流程 | T-14, T-15, T-16, T-17 | P0 |
| FR-03 | 结果计算 | T-07, T-09 | P0 |
| FR-04 | 结果展示 | T-18, T-19 | P0 |
| FR-05 | 结果分享 | T-08, T-19 | P1 |
| FR-06 | 答题进度恢复 | T-06, T-09 | P1 |
| FR-07 | 非法访问处理 | T-10 | P1 |
| DC-01 | 人格维度数据约束 | T-03 | P0 |
| DC-02 | 测试题目数据约束 | T-04 | P0 |
| DC-03 | 人格类型数据约束 | T-05 | P0 |
| DC-04 | 答题记录数据约束 | T-06, T-09 | P0 |
| NFR-01 | 性能 | T-22 | P0 |
| NFR-02 | 安全性 | T-22 | P0 |
| NFR-03 | 兼容性 | T-11, T-21 | P0 |
| NFR-04 | 可维护性 | T-02, T-03, T-04, T-05 | P1 |
| NFR-05 | 可靠性 | T-06 | P1 |
