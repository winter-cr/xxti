import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { storageService } from '@/services/storageService'
import type { ThemeMode } from '@/types'

function applyMode(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('light')
  const isDark = computed(() => mode.value === 'dark')

  function initTheme(): void {
    const savedMode = storageService.loadTheme()
    if (savedMode) {
      mode.value = savedMode
      applyMode(savedMode)
      return
    }

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    mode.value = prefersDark ? 'dark' : 'light'
    applyMode(mode.value)
  }

  function toggleTheme(): void {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    applyMode(mode.value)
    storageService.saveTheme(mode.value)
  }

  return {
    mode,
    isDark,
    initTheme,
    toggleTheme,
  }
})
