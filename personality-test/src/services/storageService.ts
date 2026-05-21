import type { QuizProgress } from '@/types'

const STORAGE_KEY = 'personality-test-progress'

export const storageService = {
  isAvailable(): boolean {
    try {
      const testKey = '__test__'
      localStorage.setItem(testKey, '1')
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  },

  saveProgress(data: QuizProgress): void {
    if (!this.isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // quota exceeded, silently ignore
    }
  },

  loadProgress(): QuizProgress | null {
    if (!this.isAvailable()) return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as QuizProgress
    } catch {
      return null
    }
  },

  clearProgress(): void {
    if (!this.isAvailable()) return
    localStorage.removeItem(STORAGE_KEY)
  },
}
