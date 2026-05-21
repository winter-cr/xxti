<template>
  <div class="type-card" :style="{ borderTopColor: type.colors.primary }" @click="$emit('click')">
    <div class="type-name" :style="{ color: type.colors.primary }">{{ type.typeName }}</div>
    <div class="type-alias">{{ type.alias }}</div>
    <div class="type-traits">
      <span v-for="t in type.coreTraits.slice(0, 3)" :key="t" class="trait-tag" :style="{ background: type.colors.background, color: type.colors.primary }">{{ t }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TypeEncyclopedia } from '@/types'
defineProps<{ type: TypeEncyclopedia }>()
defineEmits<{ click: [] }>()
</script>

<style scoped lang="scss">
.type-card {
  padding: 16px; border: 1px solid var(--color-border); border-top: 3px solid;
  border-radius: 12px; background: var(--color-surface); cursor: pointer; transition: all 0.2s;
  &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
}
.type-name { font-size: 16px; font-weight: 600; margin-bottom: 2px; }
.type-alias { font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; }
.type-traits { display: flex; gap: 4px; flex-wrap: wrap; }
.trait-tag { font-size: 11px; padding: 2px 8px; border-radius: 6px; }
</style>
