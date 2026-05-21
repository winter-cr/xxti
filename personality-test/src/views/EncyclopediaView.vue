<template>
  <section class="page-shell encyclopedia-shell">
    <div class="section-head">
      <div>
        <p class="eyebrow">类型百科</p>
        <h1>按主题浏览全部人格类型。</h1>
      </div>
      <SearchInput v-model="keyword" placeholder="搜索名称、别名或核心特质" />
    </div>

    <div class="theme-tabs" role="tablist" aria-label="百科主题">
      <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        class="theme-tab"
        :class="{ active: currentThemeId === theme.id }"
        @click="currentThemeId = theme.id"
      >
        {{ theme.name }}
      </button>
    </div>

    <EmptyState
      v-if="filteredTypes.length === 0"
      message="未找到匹配的人格类型"
    />

    <div v-else class="type-grid">
      <TypeCard
        v-for="type in filteredTypes"
        :key="type.typeId"
        :type="type"
        :colors="type.colors"
        @select="selectedType = type"
      />
    </div>

    <TypeDetail
      :visible="selectedType !== null"
      :type="selectedType"
      @close="selectedType = null"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'
import SearchInput from '@/components/SearchInput.vue'
import TypeCard from '@/components/TypeCard.vue'
import TypeDetail from '@/components/TypeDetail.vue'
import { getAllThemes, getThemeConfig, isThemeId } from '@/data/themes'
import type { ThemeId, TypeEncyclopedia } from '@/types'

const route = useRoute()
const themes = getAllThemes()
const routeTheme = String(route.query.theme ?? '')
const currentThemeId = ref<ThemeId>(isThemeId(routeTheme) ? routeTheme : 'mbti')
const keyword = ref('')
const selectedType = ref<TypeEncyclopedia | null>(null)

const filteredTypes = computed(() => {
  const lower = keyword.value.trim().toLowerCase()
  const source = getThemeConfig(currentThemeId.value).encyclopedia
  if (!lower) return source

  return source.filter((item) =>
    item.typeName.toLowerCase().includes(lower) ||
    item.alias.toLowerCase().includes(lower) ||
    item.coreTraits.some((trait) => trait.toLowerCase().includes(lower)),
  )
})
</script>

<style scoped lang="scss">
.encyclopedia-shell {
  display: grid;
  gap: 24px;
}

.section-head {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 360px);
  gap: 18px;
  align-items: end;
}

.eyebrow {
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.section-head h1 {
  font-size: clamp(1.8rem, 2.8vw, 3rem);
}

.theme-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.theme-tab {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: pointer;

  &.active {
    border-color: var(--color-primary);
    color: var(--color-text);
    background: color-mix(in srgb, var(--color-primary) 10%, var(--color-surface));
  }
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 980px) {
  .section-head,
  .type-grid {
    grid-template-columns: 1fr;
  }
}
</style>
