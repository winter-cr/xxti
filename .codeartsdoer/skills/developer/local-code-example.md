# 本地调试与优化记录

---

## 记录-1: 移除 OpenAI 模型支持 → 适配 DeepSeek

**时间**: 2026-05-06

**问题**: 项目实际使用 DeepSeek API，但代码残留 OpenAI/GPT 逻辑。LLM 枚举保留 `OPENAI` 分支、前端展示 GPT-4o Mini/GPT-4o 等不存在选项、默认模型硬编码 `gpt-4o-mini`。

**修改**: 后端移除 `_call_openai` 方法和 OpenAI API key 加载；前端移除 GPT 选项；全局默认模型 `gpt-4o-mini` → `deepseek-chat`。

**涉及文件**: `llm_service.py`, `chat.py`, `ai.py`, `models/ai.py`, `CopilotInput.vue`, `CopilotSettings.vue`

---