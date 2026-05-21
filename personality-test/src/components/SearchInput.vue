<template>
  <input class="search-input" type="text" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<script setup lang="ts">
defineProps<{ placeholder: string; modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped lang="scss">
.search-input { width: 100%; padding: 10px 16px; border: 2px solid var(--color-border); border-radius: 10px; font-size: 14px; background: var(--color-surface); color: var(--color-text); transition: border-color 0.2s; &:focus { outline: none; border-color: var(--color-primary); } }
</style>
