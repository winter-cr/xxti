import type { HistoryRecord, QuizProgress, ThemeMode } from '@/types'

const STORAGE_KEY_PROGRESS = 'personality-test-progress'
const STORAGE_KEY_HISTORY = 'personality-test-history'
const STORAGE_KEY_THEME = 'personality-test-theme'

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
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(data))
    } catch {
      // ignore quota errors
    }
  },

  loadProgress(): QuizProgress | null {
    if (!this.isAvailable()) return null
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS)
    if (!raw) return null

    try {
      return JSON.parse(raw) as QuizProgress
    } catch {
      return null
    }
  },

  clearProgress(): void {
    if (!this.isAvailable()) return
    localStorage.removeItem(STORAGE_KEY_PROGRESS)
  },

  saveHistory(records: HistoryRecord[]): void {
    if (!this.isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(records))
    } catch {
      // ignore quota errors
    }
  },

  loadHistory(): HistoryRecord[] {
    if (!this.isAvailable()) return []
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY)
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw) as HistoryRecord[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  },

  clearHistory(): void {
    if (!this.isAvailable()) return
    localStorage.removeItem(STORAGE_KEY_HISTORY)
  },

  saveTheme(mode: ThemeMode): void {
    if (!this.isAvailable()) return
    localStorage.setItem(STORAGE_KEY_THEME, mode)
  },

  loadTheme(): ThemeMode | null {
    if (!this.isAvailable()) return null
    const value = localStorage.getItem(STORAGE_KEY_THEME)
    return value === 'light' || value === 'dark' ? value : null
  },
}
