<template>
  <button class="type-card" type="button" @click="$emit('select')">
    <div class="type-head">
      <span class="type-chip" :style="{ background: colors.primary }"></span>
      <div>
        <h3>{{ type.typeName }}</h3>
        <p>{{ type.alias }}</p>
      </div>
    </div>
    <div class="tags">
      <span v-for="trait in type.coreTraits" :key="trait">{{ trait }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { TypeColors, TypeEncyclopedia } from '@/types'

defineProps<{
  type: TypeEncyclopedia
  colors: TypeColors
}>()

defineEmits<{
  select: []
}>()
</script>

<style scoped lang="scss">
.type-card {
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-align: left;
  display: grid;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
    box-shadow: var(--shadow-soft);
  }
}

.type-head {
  display: flex;
  align-items: center;
  gap: 12px;

  h3 {
    font-size: 1rem;
    margin-bottom: 4px;
    color: var(--color-text);
  }

  p {
    color: var(--color-text-secondary);
    font-size: 0.86rem;
  }
}

.type-chip {
  width: 16px;
  height: 56px;
  border-radius: 999px;
  flex-shrink: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 6px 9px;
    border-radius: 999px;
    background: var(--color-surface-muted);
    color: var(--color-text-secondary);
    font-size: 0.82rem;
  }
}
</style>
