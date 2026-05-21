<template>
  <header class="nav-shell">
    <div class="nav-content">
      <RouterLink class="brand" to="/">心迹档案</RouterLink>
      <nav class="nav-links" aria-label="主导航">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/encyclopedia" class="nav-link">类型百科</RouterLink>
        <RouterLink to="/history" class="nav-link">历史记录</RouterLink>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped lang="scss">
.nav-shell {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  border-bottom: 1px solid var(--color-border);
}

.nav-content {
  width: min(1120px, calc(100vw - 24px));
  margin: 0 auto;
  min-height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
}

.brand {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover,
  &.router-link-active {
    color: var(--color-text);
    background: var(--color-surface-muted);
  }
}

@media (max-width: 760px) {
  .nav-content {
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 12px 0;
  }

  .nav-links {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
}
</style>
