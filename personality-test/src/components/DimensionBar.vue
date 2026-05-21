<template>
  <div class="dimension-bar">
    <div class="dimension-header">
      <span class="pole-name pole-a">{{ dimension.poleAName }}</span>
      <span class="dimension-name">{{ dimension.name }}</span>
      <span class="pole-name pole-b">{{ dimension.poleBName }}</span>
    </div>
    <div class="bar-container">
      <div
        class="bar-side bar-a"
        :class="{ dominant: poleAScore >= poleBScore }"
        :style="{ flex: poleAScore || 0.5, '--bar-color': colorA }"
      >
        <span class="score">{{ poleAScore }}</span>
      </div>
      <div class="bar-divider"></div>
      <div
        class="bar-side bar-b"
        :class="{ dominant: poleBScore > poleAScore }"
        :style="{ flex: poleBScore || 0.5, '--bar-color': colorB }"
      >
        <span class="score">{{ poleBScore }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dimension } from '@/types'

withDefaults(defineProps<{
  dimension: Dimension
  poleAScore: number
  poleBScore: number
  colorA?: string
  colorB?: string
}>(), {
  colorA: 'var(--color-dimension-a)',
  colorB: 'var(--color-dimension-b)',
})
</script>

<style scoped lang="scss">
.dimension-bar {
  margin-bottom: 16px;
}

.dimension-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  gap: 10px;
}

.pole-name {
  font-weight: 600;
  min-width: 52px;

  &.pole-a {
    color: var(--color-dimension-a);
    text-align: left;
  }

  &.pole-b {
    color: var(--color-dimension-b);
    text-align: right;
  }
}

.dimension-name {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-align: center;
}

.bar-container {
  display: flex;
  align-items: center;
  height: 28px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-border);
}

.bar-divider {
  width: 2px;
  height: 100%;
  background: rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.bar-side {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: flex 0.3s ease, background 0.2s ease;
  min-width: 30px;

  .score {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  &.dominant {
    background: var(--bar-color);

    .score {
      color: #fff;
    }
  }
}
</style>
