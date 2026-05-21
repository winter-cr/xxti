<template>
  <Transition name="toast">
    <div v-if="visible" class="toast-message">{{ message }}</div>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(defineProps<{
  message: string
  visible: boolean
  duration?: number
}>(), {
  duration: 2000,
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

watch(() => props.visible, (val) => {
  if (val) {
    setTimeout(() => {
      emit('update:visible', false)
    }, props.duration)
  }
})
</script>

<style scoped lang="scss">
.toast-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 24px;
  background: var(--color-text);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px);
}
</style>
