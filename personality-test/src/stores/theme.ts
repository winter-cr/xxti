import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ThemeMode } from '@/types'
import { storageService } from '@/services/storageService'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('light')

  const isDark = computed(() => mode.value === 'dark')

  function initTheme(): void {
    const saved = storageService.loadTheme()
    if (saved) {
      mode.value = saved
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      mode.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme()
  }

  function toggleTheme(): void {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
    storageService.saveTheme(mode.value)
    applyTheme()
  }

  function applyTheme(): void {
    document.documentElement.setAttribute('data-theme', mode.value)
  }

  return { mode, isDark, initTheme, toggleTheme }
})
