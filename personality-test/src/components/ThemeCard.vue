<template>
  <div class="theme-card" @click="$emit('select', theme.id)">
    <div class="theme-icon">{{ theme.icon }}</div>
    <div class="theme-info">
      <h3 class="theme-name">{{ theme.name }}</h3>
      <p class="theme-desc">{{ theme.description }}</p>
      <div class="theme-meta">
        <span>📝 {{ theme.questionCount }} 题</span>
        <span>⏱️ 约{{ theme.estimatedTime }}分钟</span>
      </div>
    </div>
    <div class="theme-arrow">→</div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeMeta } from '@/types'

defineProps<{
  theme: ThemeMeta
}>()

defineEmits<{
  select: [themeId: string]
}>()
</script>

<style scoped lang="scss">
.theme-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(74, 108, 247, 0.12);
    transform: translateY(-2px);
  }
}

.theme-icon {
  font-size: 36px;
  flex-shrink: 0;
}

.theme-info {
  flex: 1;
  min-width: 0;
}

.theme-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.theme-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  line-height: 1.5;
}

.theme-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.theme-arrow {
  font-size: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}
</style>
