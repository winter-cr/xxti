<template>
  <button class="theme-toggle" @click="themeStore.toggleTheme()" :title="themeStore.isDark ? '切换到亮色模式' : '切换到暗色模式'">
    {{ themeStore.isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
.theme-toggle {
  background: none; border: none; font-size: 18px; cursor: pointer;
  padding: 6px 8px; border-radius: 8px; transition: background 0.2s;
  &:hover { background: var(--color-bg); }
}
</style>
