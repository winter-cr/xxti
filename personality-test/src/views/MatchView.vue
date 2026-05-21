<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 640px;">
      <h1 class="page-title">类型匹配</h1>
      <div class="selectors">
        <div class="selector-group">
          <label>类型 A</label>
          <select v-model="typeAId" class="type-select">
            <option v-for="t in allTypes" :key="t.id" :value="t.id">{{ t.name }} ({{ t.id }})</option>
          </select>
        </div>
        <div class="vs">VS</div>
        <div class="selector-group">
          <label>类型 B</label>
          <select v-model="typeBId" class="type-select">
            <option v-for="t in allTypes" :key="t.id" :value="t.id">{{ t.name }} ({{ t.id }})</option>
          </select>
        </div>
      </div>
      <div v-if="matchResult" class="result-area">
        <MatchRing :percent="matchResult.matchPercent" :color="configMeta?.icon === '🧠' ? '#4A6CF7' : configMeta?.icon === '⭐' ? '#F39C12' : '#E91E63'" />
        <p class="match-desc">{{ matchResult.description }}</p>
        <div class="dim-list">
          <div v-for="da in matchResult.dimensionAnalyses" :key="da.dimensionId" class="dim-item">
            <span class="dim-name">{{ da.dimensionName }}</span>
            <span class="dim-poles">{{ da.poleA }} ↔ {{ da.poleB }}</span>
            <span class="dim-label" :class="labelClass(da.score)">{{ da.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ThemeId, MatchResult } from '@/types'
import { getThemeConfig, getAllThemes } from '@/data/themes'
import { calculateMatch } from '@/services/matchCalculator'
import MatchRing from '@/components/MatchRing.vue'

const route = useRoute()
const themeId = computed(() => (route.params.themeId as ThemeId) || 'mbti')
const config = computed(() => getThemeConfig(themeId.value))
const configMeta = computed(() => getAllThemes().find((t) => t.id === themeId.value))
const allTypes = computed(() => config.value.types)

const typeAId = ref('')
const typeBId = ref('')
const matchResult = ref<MatchResult | null>(null)

watch(() => route.params, (p) => {
  if (p.typeAId) typeAId.value = p.typeAId as string
  else if (allTypes.value.length) typeAId.value = allTypes.value[0].id
  if (!typeBId.value && allTypes.value.length > 1) typeBId.value = allTypes.value[1].id
}, { immediate: true })

watch([typeAId, typeBId], () => {
  if (typeAId.value && typeBId.value) {
    matchResult.value = calculateMatch(typeAId.value, typeBId.value, themeId.value)
  }
}, { immediate: true })

function labelClass(score: number): string {
  if (score >= 80) return 'high'
  if (score >= 60) return 'medium'
  return 'low'
}
</script>

<style scoped lang="scss">
.page-title { font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 20px; }
.selectors { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; justify-content: center; }
.selector-group { flex: 1; label { display: block; font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px; } }
.type-select { width: 100%; padding: 8px 12px; border: 2px solid var(--color-border); border-radius: 10px; font-size: 14px; background: var(--color-surface); color: var(--color-text); }
.vs { font-weight: 700; color: var(--color-text-secondary); font-size: 16px; }
.result-area { text-align: center; }
.match-desc { margin: 16px 0; font-size: 15px; color: var(--color-text); line-height: 1.7; }
.dim-list { text-align: left; }
.dim-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border); font-size: 14px; }
.dim-name { font-weight: 600; min-width: 60px; }
.dim-poles { color: var(--color-text-secondary); flex: 1; text-align: center; }
.dim-label { font-size: 12px; padding: 2px 10px; border-radius: 6px; font-weight: 600; &.high { background: #E8F5E9; color: #4CAF50; } &.medium { background: #FFF3E0; color: #FF9800; } &.low { background: #FDEDEC; color: #E74C3C; } }
</style>
