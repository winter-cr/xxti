<template>
  <div class="empty-state">
    <p class="message">{{ message }}</p>
    <button v-if="actionText" class="action-btn" @click="$emit('action')">{{ actionText }}</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string; actionText?: string }>()
defineEmits<{ action: [] }>()
</script>

<style scoped lang="scss">
.empty-state { text-align: center; padding: 32px 16px; }
.message { color: var(--color-text-secondary); margin-bottom: 12px; }
.action-btn { background: none; border: none; color: var(--color-primary); font-size: 14px; cursor: pointer; text-decoration: underline; }
</style>
