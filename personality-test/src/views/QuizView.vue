<template>
  <section class="page-shell quiz-shell">
    <div class="quiz-panel">
      <div class="quiz-head">
        <div>
          <p class="quiz-theme">{{ quizStore.currentThemeName }}</p>
          <h1>按直觉选择更接近你的描述。</h1>
        </div>
        <ProgressBar
          :current="quizStore.currentQuestionIndex + 1"
          :total="quizStore.totalQuestions"
        />
      </div>

      <QuestionCard
        :question="quizStore.currentQuestion"
        :selected-option-id="quizStore.selectedOption"
        @select="handleSelect"
      />

      <div class="quiz-actions">
        <button class="btn-secondary" type="button" @click="goHome">返回首页</button>
        <button class="btn-primary next-btn" type="button" @click="handleNext">
          {{ quizStore.isLastQuestion ? '查看结果' : '下一题' }}
        </button>
      </div>
    </div>

    <ToastMessage
      v-model:visible="showToast"
      :message="toastMessage"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useHistoryStore } from '@/stores/history'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import ToastMessage from '@/components/ToastMessage.vue'

const router = useRouter()
const quizStore = useQuizStore()
const historyStore = useHistoryStore()
const showToast = ref(false)
const toastMessage = ref('')

onMounted(() => {
  if (!quizStore.result && quizStore.hasInProgress()) {
    quizStore.restoreProgress()
  }
})

function handleSelect(optionId: string): void {
  quizStore.selectOption(optionId)
}

function goHome(): void {
  router.push('/')
}

function handleNext(): void {
  if (quizStore.selectedOption === null) {
    toastMessage.value = '请先选择一个选项'
    showToast.value = true
    return
  }

  const wasLast = quizStore.isLastQuestion
  const success = quizStore.goToNext()

  if (success && wasLast) {
    const result = quizStore.calculateResult()
    historyStore.addRecord(result)
    router.push('/result')
  }
}
</script>

<style scoped lang="scss">
.quiz-shell {
  display: grid;
}

.quiz-panel {
  width: min(760px, 100%);
  margin: 0 auto;
  padding: 28px;
  border-radius: 26px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.quiz-head {
  display: grid;
  gap: 18px;
  margin-bottom: 20px;
}

.quiz-theme {
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 8px;
}

.quiz-head h1 {
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.quiz-actions {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.next-btn {
  margin-left: auto;
}
</style>
