<template>
  <article class="theme-card">
    <div class="card-top">
      <span class="theme-icon">{{ theme.icon }}</span>
      <div>
        <h3>{{ theme.name }}</h3>
        <p>{{ theme.description }}</p>
      </div>
    </div>
    <div class="theme-meta">
      <span>{{ theme.questionCount }} 题</span>
      <span>约 {{ theme.estimatedTime }} 分钟</span>
    </div>
    <button class="btn-primary card-action" type="button" @click="$emit('select', theme.id)">
      开始测试
    </button>
  </article>
</template>

<script setup lang="ts">
import type { ThemeId, ThemeMeta } from '@/types'

defineProps<{
  theme: ThemeMeta
}>()

defineEmits<{
  select: [themeId: ThemeId]
}>()
</script>

<style scoped lang="scss">
.theme-card {
  display: grid;
  gap: 18px;
  padding: 22px;
  border-radius: 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.card-top {
  display: flex;
  gap: 14px;
  align-items: flex-start;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  p {
    color: var(--color-text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.theme-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-muted);
  color: var(--color-primary);
  font-weight: 700;
  flex-shrink: 0;
}

.theme-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    background: var(--color-surface-muted);
    color: var(--color-text-secondary);
    font-size: 0.84rem;
  }
}

.card-action {
  width: 100%;
}
</style>
