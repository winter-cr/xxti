import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Question, TestResult, QuizProgress } from '@/types'
import { questions } from '@/data/questions'
import { dimensions } from '@/data/dimensions'
import { personalityTypes } from '@/data/personalityTypes'
import { calculate } from '@/services/resultCalculator'
import { storageService } from '@/services/storageService'

export const useQuizStore = defineStore('quiz', () => {
  const currentQuestionIndex = ref(0)
  const answers = ref<Map<number, string>>(new Map())
  const selectedOption = ref<string | null>(null)
  const result = ref<TestResult | null>(null)

  const currentQuestion = computed<Question>(
    () => questions[currentQuestionIndex.value],
  )

  const totalQuestions = computed<number>(() => questions.length)

  const progress = computed<string>(
    () => `${currentQuestionIndex.value + 1}/${totalQuestions.value}`,
  )

  const isQuizComplete = computed<boolean>(
    () => answers.value.size === totalQuestions.value,
  )

  const isLastQuestion = computed<boolean>(
    () => currentQuestionIndex.value === totalQuestions.value - 1,
  )

  function persistProgress(): void {
    const data: QuizProgress = {
      currentQuestionIndex: currentQuestionIndex.value,
      answers: Object.fromEntries(answers.value),
    }
    storageService.saveProgress(data)
  }

  function startQuiz(): void {
    currentQuestionIndex.value = 0
    answers.value = new Map()
    selectedOption.value = null
    result.value = null
    storageService.clearProgress()
  }

  function selectOption(optionId: string): void {
    selectedOption.value = optionId
  }

  function goToNext(): boolean {
    if (selectedOption.value === null) return false
    answers.value.set(
      questions[currentQuestionIndex.value].index,
      selectedOption.value,
    )
    if (!isLastQuestion.value) {
      currentQuestionIndex.value++
      selectedOption.value = null
    }
    persistProgress()
    return true
  }

  function calculateResult(): TestResult {
    const res = calculate(
      answers.value,
      dimensions,
      questions,
      personalityTypes,
    )
    result.value = res
    return res
  }

  function resetQuiz(): void {
    currentQuestionIndex.value = 0
    answers.value = new Map()
    selectedOption.value = null
    result.value = null
    storageService.clearProgress()
  }

  function restoreProgress(): boolean {
    const saved = storageService.loadProgress()
    if (!saved || !saved.answers) return false
    currentQuestionIndex.value = saved.currentQuestionIndex
    answers.value = new Map(Object.entries(saved.answers).map(([k, v]) => [Number(k), v]))
    selectedOption.value = null
    result.value = null
    return true
  }

  function hasInProgress(): boolean {
    const saved = storageService.loadProgress()
    return saved !== null && Object.keys(saved.answers).length > 0
  }

  return {
    currentQuestionIndex,
    answers,
    selectedOption,
    result,
    currentQuestion,
    totalQuestions,
    progress,
    isQuizComplete,
    isLastQuestion,
    startQuiz,
    selectOption,
    goToNext,
    calculateResult,
    resetQuiz,
    restoreProgress,
    hasInProgress,
  }
})
