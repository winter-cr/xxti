<template>
  <button
    class="option-button"
    :class="{ selected: isSelected }"
    type="button"
    @click="$emit('click', option.id)"
  >
    <span class="option-bullet"></span>
    <span class="option-text">{{ option.text }}</span>
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
  padding: 16px 18px;
  border: 1px solid var(--color-border-strong);
  border-radius: 16px;
  background: var(--color-surface);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  text-align: left;
  line-height: 1.5;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 12px 28px rgba(20, 29, 52, 0.08);
  }

  &.selected {
    background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface));
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }
}

.option-bullet {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  flex-shrink: 0;
  position: relative;

  .selected &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: var(--color-primary);
  }
}

.option-text {
  flex: 1;
}
</style>
