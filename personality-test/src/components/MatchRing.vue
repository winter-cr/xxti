<template>
  <svg class="match-ring" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-border)" stroke-width="8" />
    <circle cx="60" cy="60" r="50" fill="none" :stroke="color" stroke-width="8"
      stroke-linecap="round" :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset" transform="rotate(-90 60 60)" class="progress-ring" />
    <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
      :fill="color" font-size="24" font-weight="700">{{ percent }}%</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ percent: number; color?: string }>(), {
  color: 'var(--color-primary)',
})

const circumference = computed(() => 2 * Math.PI * 50)
const dashOffset = computed(() => circumference.value * (1 - props.percent / 100))
</script>

<style scoped lang="scss">
.match-ring { width: 120px; height: 120px; }
.progress-ring { transition: stroke-dashoffset 0.6s ease; }
</style>
