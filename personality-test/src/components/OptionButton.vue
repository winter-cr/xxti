<template>
  <button
    class="option-button"
    :class="{ selected: isSelected }"
    @click="$emit('click', option.id)"
  >
    {{ option.text }}
  </button>
</template>

<script setup lang="ts">
import type { QuestionOption } from '@/types'

defineProps<{
  option: QuestionOption
  isSelected: boolean
}>()

defineEmits<{
  click: [optionId: string]
}>()
</script>

<style scoped lang="scss">
.option-button {
  width: 100%;
  padding: 14px 20px;
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  line-height: 1.5;

  &:hover {
    border-color: var(--color-primary-light);
    background: rgba(74, 108, 247, 0.04);
  }

  &.selected {
    background: var(--color-primary);
    color: #fff;
    border-color: var(--color-primary);
  }
}
</style>
