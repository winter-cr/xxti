<template>
  <nav class="navbar">
    <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">🏠 首页</router-link>
    <router-link to="/encyclopedia" class="nav-item" :class="{ active: route.path.startsWith('/encyclopedia') }">📚 百科</router-link>
    <router-link to="/match" class="nav-item" :class="{ active: route.path.startsWith('/match') }">💑 匹配</router-link>
    <router-link to="/history" class="nav-item" :class="{ active: route.path.startsWith('/history') }">📋 记录</router-link>
    <ThemeToggle />
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
const route = useRoute()
</script>

<style scoped lang="scss">
.navbar {
  display: flex; align-items: center; justify-content: center; gap: 4px;
  padding: 8px 16px; background: var(--color-surface);
  border-bottom: 1px solid var(--color-border); flex-wrap: wrap;
}
.nav-item {
  padding: 6px 14px; border-radius: 8px; font-size: 13px;
  color: var(--color-text-secondary); text-decoration: none; transition: all 0.2s;
  &:hover { background: var(--color-bg); color: var(--color-text); }
  &.active { background: rgba(74,108,247,0.08); color: var(--color-primary); font-weight: 600; }
}
</style>
