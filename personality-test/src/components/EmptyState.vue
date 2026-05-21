<template>
  <div class="empty-state">
    <p>{{ message }}</p>
    <button
      v-if="actionText"
      class="btn-secondary empty-action"
      type="button"
      @click="$emit('action')"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message: string
  actionText?: string
}>(), {
  actionText: '',
})

defineEmits<{
  action: []
}>()
</script>

<style scoped lang="scss">
.empty-state {
  padding: 28px;
  border-radius: 18px;
  border: 1px dashed var(--color-border-strong);
  background: var(--color-surface-muted);
  color: var(--color-text-secondary);
  text-align: center;
  display: grid;
  gap: 14px;
}

.empty-action {
  width: fit-content;
  margin: 0 auto;
}
</style>
