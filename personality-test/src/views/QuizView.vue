<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 600px;">
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
    <ToastMessage
      v-model:visible="showToast"
      :message="toastMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import ToastMessage from '@/components/ToastMessage.vue'

const router = useRouter()
const quizStore = useQuizStore()
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
    quizStore.calculateResult()
    router.push('/result')
  }
}
</script>

<style scoped lang="scss">
.next-btn {
  margin-top: 8px;
}
</style>
