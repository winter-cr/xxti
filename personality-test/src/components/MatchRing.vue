<template>
  <div class="match-ring" :style="{ '--fill': `${percent}%` }">
    <div class="ring-inner">
      <strong>{{ percent }}%</strong>
      <span>匹配度</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  percent: number
}>()
</script>

<style scoped lang="scss">
.match-ring {
  --fill: 0%;
  width: 180px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, var(--color-surface) 52%, transparent 53%),
    conic-gradient(var(--color-primary) var(--fill), var(--color-surface-muted) 0);
  display: grid;
  place-items: center;
}

.ring-inner {
  display: grid;
  place-items: center;
  gap: 4px;
  text-align: center;

  strong {
    font-size: 2rem;
    line-height: 1;
  }

  span {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
}
</style>
