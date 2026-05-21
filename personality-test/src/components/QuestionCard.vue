<template>
  <Transition name="question-slide" mode="out-in">
    <div class="question-card" :key="question.index">
      <p class="question-index">Q{{ question.index }}</p>
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
  </Transition>
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
  padding: 24px;
  border-radius: 20px;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
}

.question-index {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 18px;
  line-height: 1.55;
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

.question-slide-enter-active,
.question-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.question-slide-enter-from,
.question-slide-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
