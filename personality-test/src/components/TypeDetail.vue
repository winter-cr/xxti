<template>
  <div v-if="visible && type" class="detail-overlay" @click.self="$emit('close')">
    <section class="detail-panel">
      <div class="detail-header" :style="{ background: type.colors.background }">
        <div>
          <p class="detail-alias">{{ type.alias }}</p>
          <h2>{{ type.typeName }}</h2>
        </div>
        <button class="detail-close" type="button" @click="$emit('close')">关闭</button>
      </div>
      <div class="detail-body">
        <div class="detail-tags">
          <span v-for="trait in type.coreTraits" :key="trait">{{ trait }}</span>
        </div>
        <section>
          <h3>优势</h3>
          <ul>
            <li v-for="item in type.strengths" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>劣势</h3>
          <ul>
            <li v-for="item in type.weaknesses" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>典型职业</h3>
          <ul>
            <li v-for="item in type.careers" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>最佳匹配</h3>
          <p>{{ type.bestMatch }}</p>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TypeEncyclopedia } from '@/types'

defineProps<{
  type: TypeEncyclopedia | null
  visible: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped lang="scss">
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 18, 35, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 50;
}

.detail-panel {
  width: min(720px, 100%);
  max-height: min(88vh, 900px);
  overflow: auto;
  border-radius: 24px;
  background: var(--color-surface);
  box-shadow: 0 24px 60px rgba(12, 18, 28, 0.22);
}

.detail-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  gap: 16px;

  h2 {
    font-size: 1.6rem;
  }
}

.detail-alias {
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.detail-close {
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
}

.detail-body {
  padding: 24px;
  display: grid;
  gap: 20px;

  section {
    display: grid;
    gap: 10px;
  }

  h3 {
    font-size: 1rem;
  }

  ul {
    padding-left: 18px;
    color: var(--color-text-secondary);
    display: grid;
    gap: 8px;
  }
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 7px 10px;
    border-radius: 999px;
    background: var(--color-surface-muted);
    font-size: 0.85rem;
  }
}
</style>
