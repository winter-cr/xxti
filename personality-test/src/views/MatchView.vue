<template>
  <section class="page-shell match-shell">
    <div class="match-top">
      <div>
        <p class="eyebrow">类型匹配</p>
        <h1>{{ theme.meta.name }} 人格匹配</h1>
        <p class="lead">匹配度只在同一测试主题内计算，结果用于辅助理解合作与关系风格。</p>
      </div>
      <div class="selectors">
        <label>
          <span>A 类型</span>
          <select v-model="typeAId">
            <option v-for="type in theme.types" :key="type.id" :value="type.id">{{ type.name }} / {{ type.id }}</option>
          </select>
        </label>
        <label>
          <span>B 类型</span>
          <select v-model="typeBId">
            <option v-for="type in theme.types" :key="type.id" :value="type.id">{{ type.name }} / {{ type.id }}</option>
          </select>
        </label>
      </div>
    </div>

    <div class="match-grid">
      <section class="match-summary">
        <MatchRing :percent="match.matchPercent" />
        <div class="summary-copy">
          <h2>{{ typeA?.name }} × {{ typeB?.name }}</h2>
          <p>{{ match.description }}</p>
        </div>
      </section>

      <section class="match-analysis">
        <h2>维度分析</h2>
        <div class="analysis-list">
          <article v-for="item in match.dimensionAnalyses" :key="item.dimensionId" class="analysis-item">
            <div>
              <strong>{{ item.dimensionName }}</strong>
              <p>{{ item.poleA }} / {{ item.poleB }}</p>
            </div>
            <div class="analysis-score">
              <span>{{ Math.round(item.score * 100) }}%</span>
              <small>{{ item.label }}</small>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MatchRing from '@/components/MatchRing.vue'
import { getThemeConfig, isThemeId } from '@/data/themes'
import { calculateMatch } from '@/services/matchCalculator'
import type { ThemeId } from '@/types'

const route = useRoute()
const themeId = (isThemeId(String(route.params.themeId)) ? String(route.params.themeId) : 'mbti') as ThemeId
const theme = getThemeConfig(themeId)
const fallbackB = theme.types[1]?.id ?? theme.types[0].id
const typeAId = ref(String(route.params.typeId || theme.types[0].id))
const typeBId = ref(fallbackB)

watch(typeAId, (value) => {
  if (value === typeBId.value) {
    typeBId.value = theme.types.find((type) => type.id !== value)?.id ?? value
  }
}, { immediate: true })

const typeA = computed(() => theme.types.find((type) => type.id === typeAId.value))
const typeB = computed(() => theme.types.find((type) => type.id === typeBId.value))
const match = computed(() => calculateMatch(typeAId.value, typeBId.value, themeId))
</script>

<style scoped lang="scss">
.match-shell {
  display: grid;
  gap: 24px;
}

.match-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: start;
}

.eyebrow {
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.lead {
  color: var(--color-text-secondary);
  margin-top: 10px;
  max-width: 60ch;
}

.selectors {
  display: grid;
  gap: 12px;
  min-width: 260px;

  label {
    display: grid;
    gap: 8px;
  }

  span {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
  }

  select {
    height: 46px;
    border-radius: 14px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    padding: 0 12px;
  }
}

.match-grid {
  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  gap: 18px;
}

.match-summary,
.match-analysis {
  padding: 24px;
  border-radius: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.match-summary {
  display: grid;
  gap: 20px;
  justify-items: center;
  text-align: center;
}

.summary-copy p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-top: 10px;
}

.analysis-list {
  display: grid;
  gap: 12px;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  p {
    color: var(--color-text-secondary);
    margin-top: 6px;
  }
}

.analysis-score {
  text-align: right;

  span {
    display: block;
    font-weight: 700;
  }

  small {
    color: var(--color-text-secondary);
  }
}

@media (max-width: 960px) {
  .match-top,
  .match-grid {
    grid-template-columns: 1fr;
  }
}
</style>
