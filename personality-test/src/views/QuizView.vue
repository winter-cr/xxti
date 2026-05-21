<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 600px;">
      <div class="theme-label">{{ quizStore.currentThemeName }}</div>
      <ProgressBar
        :current="quizStore.currentQuestionIndex + 1"
        :total="quizStore.totalQuestions"
      />
      <QuestionCard
        :question="quizStore.currentQuestion"
        :selected-option-id="quizStore.selectedOption"
        @select="handleSelect"
      />
      <button class="btn-primary next-btn" @click="handleNext">
        {{ quizStore.isLastQuestion ? '查看结果' : '下一题' }}
      </button>
    </div>
    <ToastMessage v-model:visible="showToast" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

function handleSelect(optionId: string) {
  quizStore.selectOption(optionId)
}

function handleNext() {
  if (quizStore.selectedOption === null) {
    toastMessage.value = '请先选择一个选项'
    showToast.value = true
    return
  }

  const wasLast = quizStore.isLastQuestion
  const success = quizStore.goToNext()

  if (success && wasLast) {
    const result = quizStore.calculateResult()
    historyStore.addRecord({
      id: `${Date.now()}-${result.typeId}`,
      timestamp: Date.now(),
      themeId: quizStore.currentThemeId,
      themeName: quizStore.currentThemeName,
      typeId: result.typeId,
      typeName: result.typeName,
      typeDescription: result.typeDescription,
      dimensionScores: result.dimensionScores,
      colors: result.colors,
    })
    router.push('/result')
  }
}
</script>

<style scoped lang="scss">
.theme-label {
  font-size: 13px;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.next-btn { margin-top: 8px; }
</style>
