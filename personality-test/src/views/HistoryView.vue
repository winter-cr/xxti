<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 640px;">
      <h1 class="page-title">历史记录</h1>
      <div v-if="historyStore.hasRecords" class="history-list">
        <div v-for="record in historyStore.sortedRecords" :key="record.id" class="history-item" :style="{ borderLeftColor: record.colors?.primary || 'var(--color-primary)' }">
          <div class="item-header">
            <span class="item-type" :style="{ color: record.colors?.primary }">{{ record.typeName }}</span>
            <span class="item-theme">{{ record.themeName }}</span>
            <span class="item-time">{{ formatTime(record.timestamp) }}</span>
          </div>
          <p class="item-desc">{{ record.typeDescription }}</p>
          <div class="item-actions">
            <button class="btn-sm" @click="viewDetail(record)">查看详情</button>
            <button class="btn-sm btn-danger" @click="historyStore.removeRecord(record.id)">删除</button>
          </div>
        </div>
        <button class="btn-secondary clear-btn" @click="historyStore.clearAll()">清空所有记录</button>
      </div>
      <EmptyState v-else message="暂无测试记录" action-text="去测试" @action="$router.push('/')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import EmptyState from '@/components/EmptyState.vue'

const router = useRouter()
const historyStore = useHistoryStore()

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function viewDetail(_record: any) {
  // 简化实现：直接在当前页展示
}
</script>

<style scoped lang="scss">
.page-title { font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 16px; }
.history-list { display: flex; flex-direction: column; gap: 12px; }
.history-item { padding: 16px; border: 1px solid var(--color-border); border-left: 3px solid; border-radius: 12px; background: var(--color-surface); }
.item-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.item-type { font-weight: 600; font-size: 16px; }
.item-theme { font-size: 12px; color: var(--color-text-secondary); background: var(--color-bg); padding: 2px 8px; border-radius: 4px; }
.item-time { font-size: 12px; color: var(--color-text-secondary); margin-left: auto; }
.item-desc { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px; line-height: 1.5; }
.item-actions { display: flex; gap: 8px; }
.btn-sm { padding: 4px 12px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-surface); font-size: 12px; cursor: pointer; color: var(--color-text-secondary); &:hover { color: var(--color-text); } &.btn-danger { color: #E74C3C; } }
.clear-btn { margin-top: 12px; }
.btn-secondary { display: flex; align-items: center; justify-content: center; width: 100%; height: 40px; border: 2px solid var(--color-border); border-radius: 10px; background: var(--color-surface); color: var(--color-text-secondary); font-size: 14px; cursor: pointer; &:hover { border-color: var(--color-text-secondary); } }
</style>
