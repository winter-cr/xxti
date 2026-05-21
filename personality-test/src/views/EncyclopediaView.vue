<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 720px;">
      <h1 class="page-title">类型百科</h1>
      <div class="tabs">
        <button v-for="t in themes" :key="t.id" class="tab-btn" :class="{ active: currentTheme === t.id }" @click="currentTheme = t.id">{{ t.icon }} {{ t.name }}</button>
      </div>
      <SearchInput v-model="keyword" placeholder="搜索类型名称或特质..." />
      <div class="type-grid">
        <TypeCard v-for="item in filteredList" :key="item.typeId" :type="item" @click="selectedType = item" />
      </div>
      <EmptyState v-if="filteredList.length === 0" message="未找到匹配的类型" action-text="清除搜索" @action="keyword = ''" />
    </div>
    <TypeDetail v-if="selectedType" :type="selectedType" :visible="!!selectedType" @close="selectedType = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ThemeId, TypeEncyclopedia } from '@/types'
import { getAllThemes, getThemeConfig } from '@/data/themes'
import SearchInput from '@/components/SearchInput.vue'
import TypeCard from '@/components/TypeCard.vue'
import TypeDetail from '@/components/TypeDetail.vue'
import EmptyState from '@/components/EmptyState.vue'

const themes = getAllThemes()
const currentTheme = ref<ThemeId>('mbti')
const keyword = ref('')
const selectedType = ref<TypeEncyclopedia | null>(null)

const filteredList = computed(() => {
  const config = getThemeConfig(currentTheme.value)
  const list = config.encyclopedia
  if (!keyword.value) return list
  const kw = keyword.value.toLowerCase()
  return list.filter((t) => t.typeName.toLowerCase().includes(kw) || t.coreTraits.some((tr) => tr.toLowerCase().includes(kw)) || t.alias.toLowerCase().includes(kw))
})
</script>

<style scoped lang="scss">
.page-title { font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 16px; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; justify-content: center; flex-wrap: wrap; }
.tab-btn {
  padding: 8px 16px; border: 2px solid var(--color-border); border-radius: 10px;
  background: var(--color-surface); color: var(--color-text-secondary);
  font-size: 14px; cursor: pointer; transition: all 0.2s;
  &.active { border-color: var(--color-primary); color: var(--color-primary); background: rgba(74,108,247,0.06); }
}
.type-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 16px; }
</style>
