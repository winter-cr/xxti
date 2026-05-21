import type { QuizProgress, HistoryRecord, ThemeMode } from '@/types'

const STORAGE_KEY = 'personality-test-progress'
const STORAGE_KEY_HISTORY = 'personality-test-history'
const STORAGE_KEY_THEME = 'personality-test-theme'

function isAvailable(): boolean {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export const storageService = {
  isAvailable,

  saveProgress(data: QuizProgress): void {
    if (!isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch { /* quota exceeded */ }
  },

  loadProgress(): QuizProgress | null {
    if (!isAvailable()) return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try { return JSON.parse(raw) as QuizProgress } catch { return null }
  },

  clearProgress(): void {
    if (!isAvailable()) return
    localStorage.removeItem(STORAGE_KEY)
  },

  saveHistory(records: HistoryRecord[]): void {
    if (!isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(records))
    } catch { /* quota exceeded */ }
  },

  loadHistory(): HistoryRecord[] {
    if (!isAvailable()) return []
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY)
    if (!raw) return []
    try { return JSON.parse(raw) as HistoryRecord[] } catch { return [] }
  },

  saveTheme(mode: ThemeMode): void {
    if (!isAvailable()) return
    try {
      localStorage.setItem(STORAGE_KEY_THEME, mode)
    } catch { /* ignore */ }
  },

  loadTheme(): ThemeMode | null {
    if (!isAvailable()) return null
    const raw = localStorage.getItem(STORAGE_KEY_THEME)
    if (raw === 'light' || raw === 'dark') return raw
    return null
  },
}
