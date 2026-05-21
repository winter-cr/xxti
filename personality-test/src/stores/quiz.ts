import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Question, TestResult, QuizProgress, ThemeId, Dimension } from '@/types'
import { getThemeConfig } from '@/data/themes'
import { calculate } from '@/services/resultCalculator'
import { storageService } from '@/services/storageService'

export const useQuizStore = defineStore('quiz', () => {
  const currentThemeId = ref<ThemeId>('mbti')
  const currentQuestionIndex = ref(0)
  const answers = ref<Map<number, string>>(new Map())
  const selectedOption = ref<string | null>(null)
  const result = ref<TestResult | null>(null)

  const themeConfig = computed(() => getThemeConfig(currentThemeId.value))
  const currentThemeName = computed(() => themeConfig.value.meta.name)
  const currentDimensions = computed<Dimension[]>(() => themeConfig.value.dimensions)
  const currentQuestions = computed<Question[]>(() => themeConfig.value.questions)

  const currentQuestion = computed<Question>(
    () => currentQuestions.value[currentQuestionIndex.value],
  )

  const totalQuestions = computed<number>(() => currentQuestions.value.length)

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
      themeId: currentThemeId.value,
    }
    storageService.saveProgress(data)
  }

  function startQuiz(themeId: ThemeId): void {
    currentThemeId.value = themeId
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
      currentQuestions.value[currentQuestionIndex.value].index,
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
      themeConfig.value.dimensions,
      themeConfig.value.questions,
      themeConfig.value.types,
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
    if (saved.themeId) currentThemeId.value = saved.themeId
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
    currentThemeId, currentQuestionIndex, answers, selectedOption, result,
    currentThemeName, currentDimensions, currentQuestion, totalQuestions,
    progress, isQuizComplete, isLastQuestion,
    startQuiz, selectOption, goToNext, calculateResult, resetQuiz, restoreProgress, hasInProgress,
  }
})
