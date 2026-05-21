import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { storageService } from '@/services/storageService'
import type { HistoryRecord, TestResult } from '@/types'

function persist(records: HistoryRecord[]): void {
  storageService.saveHistory(records)
}

export const useHistoryStore = defineStore('history', () => {
  const records = ref<HistoryRecord[]>([])

  const sortedRecords = computed(() =>
    [...records.value].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
  )

  const hasRecords = computed(() => records.value.length > 0)

  function loadFromStorage(): void {
    records.value = storageService.loadHistory()
  }

  function addRecord(result: TestResult): HistoryRecord {
    const nextRecord: HistoryRecord = {
      id: `${result.themeId}-${result.typeId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      themeId: result.themeId,
      themeName: result.themeName,
      typeId: result.typeId,
      typeName: result.typeName,
      typeDescription: result.typeDescription,
      dimensionScores: result.dimensionScores,
      colors: result.colors,
    }

    records.value = [nextRecord, ...records.value].slice(0, 20)
    persist(records.value)
    return nextRecord
  }

  function removeRecord(id: string): void {
    records.value = records.value.filter((record) => record.id !== id)
    persist(records.value)
  }

  function clearAll(): void {
    records.value = []
    storageService.clearHistory()
  }

  function getRecordById(id: string): HistoryRecord | undefined {
    return records.value.find((record) => record.id === id)
  }

  return {
    records,
    sortedRecords,
    hasRecords,
    loadFromStorage,
    addRecord,
    removeRecord,
    clearAll,
    getRecordById,
  }
})
