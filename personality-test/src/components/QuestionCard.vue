<template>
  <div class="question-card">
    <p class="question-text">{{ question.text }}</p>
    <div class="options">
      <OptionButton
        :option="question.optionA"
        :is-selected="selectedOptionId === question.optionA.id"
        @click="$emit('select', $event)"
      />
      <OptionButton
        :option="question.optionB"
        :is-selected="selectedOptionId === question.optionB.id"
        @click="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types'
import OptionButton from './OptionButton.vue'

defineProps<{
  question: Question
  selectedOptionId: string | null
}>()

defineEmits<{
  select: [optionId: string]
}>()
</script>

<style scoped lang="scss">
.question-card {
  margin-bottom: 24px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .question-text {
    font-size: 20px;
  }
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
