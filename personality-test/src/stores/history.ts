import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { HistoryRecord } from '@/types'
import { storageService } from '@/services/storageService'

const MAX_RECORDS = 20

export const useHistoryStore = defineStore('history', () => {
  const records = ref<HistoryRecord[]>([])

  const sortedRecords = computed(() =>
    [...records.value].sort((a, b) => b.timestamp - a.timestamp),
  )

  const hasRecords = computed(() => records.value.length > 0)

  function loadFromStorage(): void {
    records.value = storageService.loadHistory()
  }

  function addRecord(record: HistoryRecord): void {
    records.value.push(record)
    if (records.value.length > MAX_RECORDS) {
      records.value.sort((a, b) => a.timestamp - b.timestamp)
      records.value = records.value.slice(records.value.length - MAX_RECORDS)
    }
    storageService.saveHistory(records.value)
  }

  function removeRecord(id: string): void {
    records.value = records.value.filter((r) => r.id !== id)
    storageService.saveHistory(records.value)
  }

  function clearAll(): void {
    records.value = []
    storageService.saveHistory([])
  }

  function getRecordById(id: string): HistoryRecord | undefined {
    return records.value.find((r) => r.id === id)
  }

  return { records, sortedRecords, hasRecords, loadFromStorage, addRecord, removeRecord, clearAll, getRecordById }
})
