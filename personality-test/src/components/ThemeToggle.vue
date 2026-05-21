<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="themeStore.isDark ? '切换为浅色模式' : '切换为深色模式'"
    @click="themeStore.toggleTheme"
  >
    <span>{{ themeStore.isDark ? '深色' : '浅色' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
.theme-toggle {
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-surface);
    border-color: var(--color-primary);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
