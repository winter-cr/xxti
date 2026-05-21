<template>
  <section class="page-shell history-shell">
    <div class="history-head">
      <div>
        <p class="eyebrow">历史记录</p>
        <h1>你完成过的测试结果</h1>
      </div>
      <button
        v-if="historyStore.hasRecords"
        class="btn-secondary"
        type="button"
        @click="historyStore.clearAll"
      >
        清空全部
      </button>
    </div>

    <EmptyState
      v-if="!storageAvailable"
      message="当前设备暂时无法保留测试记录。"
      action-text="返回首页"
      @action="router.push('/')"
    />

    <EmptyState
      v-else-if="!historyStore.hasRecords"
      message="还没有历史记录，先去完成一套测试。"
      action-text="去测试"
      @action="router.push('/')"
    />

    <div v-else class="history-list">
      <article v-for="record in historyStore.sortedRecords" :key="record.id" class="history-item">
        <div class="history-main">
          <span class="color-mark" :style="{ background: record.colors.primary }"></span>
          <div>
            <p class="history-meta">{{ record.themeName }} · {{ formatTime(record.timestamp) }}</p>
            <h2>{{ record.typeName }}</h2>
            <p class="history-text">{{ record.typeDescription }}</p>
          </div>
        </div>
        <div class="history-actions">
          <button class="btn-secondary" type="button" @click="viewRecord(record.id)">查看</button>
          <button class="btn-secondary" type="button" @click="historyStore.removeRecord(record.id)">删除</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'
import { useHistoryStore } from '@/stores/history'
import { useQuizStore } from '@/stores/quiz'
import { storageService } from '@/services/storageService'

const router = useRouter()
const historyStore = useHistoryStore()
const quizStore = useQuizStore()
const storageAvailable = computed(() => storageService.isAvailable())

function formatTime(value: string): string {
  return new Date(value).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function viewRecord(id: string): void {
  const record = historyStore.getRecordById(id)
  if (!record) return

  quizStore.hydrateResult({
    themeId: record.themeId,
    themeName: record.themeName,
    typeId: record.typeId,
    typeName: record.typeName,
    typeDescription: record.typeDescription,
    colors: record.colors,
    dimensionScores: record.dimensionScores,
  })
  router.push('/result')
}
</script>

<style scoped lang="scss">
.history-shell {
  display: grid;
  gap: 22px;
}

.history-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
}

.eyebrow {
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.history-list {
  display: grid;
  gap: 14px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.history-main {
  display: flex;
  gap: 14px;
  align-items: start;
}

.color-mark {
  width: 10px;
  min-height: 92px;
  border-radius: 999px;
  flex-shrink: 0;
}

.history-meta,
.history-text {
  color: var(--color-text-secondary);
}

.history-meta {
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.history-text {
  margin-top: 8px;
  line-height: 1.7;
  max-width: 70ch;
}

.history-actions {
  display: grid;
  gap: 10px;
  align-content: start;
}

@media (max-width: 820px) {
  .history-item,
  .history-head {
    flex-direction: column;
  }

  .history-actions {
    width: 100%;
  }
}
</style>
