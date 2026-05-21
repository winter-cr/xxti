<template>
  <div class="page-container">
    <div class="content-box" style="max-width: 600px;">
      <h1 class="title">人格测试</h1>
      <p class="description">选择你感兴趣的测试主题，探索你的人格类型</p>
      <div class="theme-list">
        <ThemeCard
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @select="handleSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { getAllThemes } from '@/data/themes'
import ThemeCard from '@/components/ThemeCard.vue'

const router = useRouter()
const quizStore = useQuizStore()
const themes = computed(() => getAllThemes())

function handleSelect(themeId: string) {
  quizStore.startQuiz(themeId as any)
  router.push('/quiz')
}
</script>

<style scoped lang="scss">
.title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .title { font-size: 32px; }
}

.description {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 24px;
}

.theme-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
