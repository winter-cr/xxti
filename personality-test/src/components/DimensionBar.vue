<template>
  <div class="dimension-bar">
    <div class="dimension-header">
      <span class="pole-name pole-a" :style="{ color: effectiveColorA }">{{ dimension.poleAName }}</span>
      <span class="dimension-name">{{ dimension.name }}</span>
      <span class="pole-name pole-b" :style="{ color: effectiveColorB }">{{ dimension.poleBName }}</span>
    </div>
    <div class="bar-container">
      <div class="bar-side bar-a" :class="{ dominant: poleAScore >= poleBScore }" :style="{ flex: poleAScore || 0.5, background: poleAScore >= poleBScore ? effectiveColorA : undefined }">
        <span class="score" :style="{ color: poleAScore >= poleBScore ? '#fff' : 'var(--color-text-secondary)' }">{{ poleAScore }}</span>
      </div>
      <div class="bar-divider"></div>
      <div class="bar-side bar-b" :class="{ dominant: poleBScore > poleAScore }" :style="{ flex: poleBScore || 0.5, background: poleBScore > poleAScore ? effectiveColorB : undefined }">
        <span class="score" :style="{ color: poleBScore > poleAScore ? '#fff' : 'var(--color-text-secondary)' }">{{ poleBScore }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Dimension } from '@/types'

const props = defineProps<{
  dimension: Dimension
  poleAScore: number
  poleBScore: number
  colorA?: string
  colorB?: string
}>()

const effectiveColorA = computed(() => props.colorA || 'var(--color-dimension-a)')
const effectiveColorB = computed(() => props.colorB || 'var(--color-dimension-b)')
</script>

<style scoped lang="scss">
.dimension-bar { margin-bottom: 16px; }
.dimension-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 14px; }
.pole-name { font-weight: 600; min-width: 40px; &.pole-a { text-align: left; } &.pole-b { text-align: right; } }
.dimension-name { color: var(--color-text-secondary); font-size: 12px; }
.bar-container { display: flex; align-items: center; height: 28px; border-radius: 8px; overflow: hidden; background: var(--color-border); }
.bar-divider { width: 2px; height: 100%; background: rgba(0,0,0,0.1); flex-shrink: 0; }
.bar-side { display: flex; align-items: center; justify-content: center; height: 100%; transition: flex 0.3s ease; min-width: 30px; .score { font-size: 13px; font-weight: 600; } }
</style>
