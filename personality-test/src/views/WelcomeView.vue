<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 480px;">
      <h1 class="title">人格测试</h1>
      <p class="description">
        通过简短的问卷，探索你的人格类型倾向。无需注册，不收集个人信息，结果仅供参考和娱乐。
      </p>
      <div class="info">
        <span class="info-item">📝 共 {{ totalQuestions }} 题</span>
        <span class="info-item">⏱️ 约 {{ estimatedTime }} 分钟</span>
      </div>
      <div v-if="hasProgress" class="resume-hint">
        <p>检测到未完成的测试进度</p>
        <div class="resume-buttons">
          <button class="btn-secondary" @click="continueQuiz">继续测试</button>
          <button class="btn-text" @click="startNew">重新开始</button>
        </div>
      </div>
      <button v-else class="btn-primary" @click="startNew">开始测试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const quizStore = useQuizStore()

const totalQuestions = computed(() => quizStore.totalQuestions)
const estimatedTime = computed(() => Math.ceil((totalQuestions.value * 15) / 60))
const hasProgress = computed(() => quizStore.hasInProgress())

function startNew() {
  quizStore.startQuiz()
  router.push('/quiz')
}

function continueQuiz() {
  quizStore.restoreProgress()
  router.push('/quiz')
}
</script>

<style scoped lang="scss">
.title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .title { font-size: 32px; }
}

.description {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.7;
}

.info {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;
}

.info-item {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.resume-hint {
  text-align: center;

  p {
    font-size: 14px;
    color: var(--color-warning);
    margin-bottom: 12px;
  }
}

.resume-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(74, 108, 247, 0.06);
  }
}

.btn-text {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    color: var(--color-text);
  }
}
</style>
