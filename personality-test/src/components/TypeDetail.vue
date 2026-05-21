<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-panel">
      <button class="close-btn" @click="$emit('close')">✕</button>
      <h2 :style="{ color: type.colors.primary }">{{ type.typeName }}</h2>
      <p class="alias">{{ type.alias }}</p>
      <div class="section"><h3>核心特质</h3><div class="tags"><span v-for="t in type.coreTraits" :key="t" class="tag" :style="{ background: type.colors.background, color: type.colors.primary }">{{ t }}</span></div></div>
      <div class="section"><h3>优势</h3><ul><li v-for="s in type.strengths" :key="s">{{ s }}</li></ul></div>
      <div class="section"><h3>劣势</h3><ul><li v-for="w in type.weaknesses" :key="w">{{ w }}</li></ul></div>
      <div class="section"><h3>典型职业</h3><div class="tags"><span v-for="c in type.careers" :key="c" class="tag">{{ c }}</span></div></div>
      <div class="section"><h3>最佳匹配</h3><p :style="{ color: type.colors.primary, fontWeight: 600 }">{{ type.bestMatch }}</p></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TypeEncyclopedia } from '@/types'
defineProps<{ type: TypeEncyclopedia; visible: boolean }>()
defineEmits<{ close: [] }>()
</script>

<style scoped lang="scss">
.detail-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
.detail-panel { background: var(--color-surface); border-radius: 16px; padding: 24px; max-width: 480px; width: 100%; max-height: 80vh; overflow-y: auto; position: relative; }
.close-btn { position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 18px; cursor: pointer; color: var(--color-text-secondary); }
h2 { font-size: 22px; margin-bottom: 4px; }
.alias { color: var(--color-text-secondary); font-size: 14px; margin-bottom: 16px; }
.section { margin-bottom: 16px; h3 { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 6px; } ul { padding-left: 18px; font-size: 14px; line-height: 1.8; } }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tag { font-size: 12px; padding: 4px 10px; border-radius: 6px; background: var(--color-bg); }
</style>
