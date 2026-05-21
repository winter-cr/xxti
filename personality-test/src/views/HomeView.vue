<template>
  <section class="page-shell home-shell">
    <div class="hero">
      <div class="hero-copy">
        <p class="eyebrow">探索你的性格纹理</p>
        <h1>
          <span>每一种选择，</span>
          <span>都会慢慢显出</span>
          <span>你看待世界的方式。</span>
        </h1>
        <p class="hero-text">
          从 MBTI、大五人格到九型人格，换一个角度认识自己。结果仅为自我观察提供灵感，不记录隐私，也不必急着把自己归进某个标签。
        </p>
      </div>
      <div class="hero-side">
        <div class="resume-card" v-if="resumeTheme">
          <p class="resume-label">上次的探索还留在这里</p>
          <strong>{{ resumeTheme.name }}</strong>
          <button class="btn-secondary" type="button" @click="continueQuiz">继续测试</button>
        </div>
      </div>
    </div>

    <div class="section-head">
      <h2>选择测试主题</h2>
      <p>每套题目都对应不同的人格视角，完成后还能继续查看类型故事与关系搭配。</p>
    </div>

    <div class="theme-grid">
      <ThemeCard
        v-for="theme in themes"
        :key="theme.id"
        :theme="theme"
        @select="startQuiz"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ThemeCard from '@/components/ThemeCard.vue'
import { getAllThemes } from '@/data/themes'
import { storageService } from '@/services/storageService'
import { useQuizStore } from '@/stores/quiz'
import type { ThemeId } from '@/types'

const router = useRouter()
const quizStore = useQuizStore()
const themes = getAllThemes()

const resumeTheme = computed(() => {
  const progress = storageService.loadProgress()
  if (!progress) return null
  return themes.find((theme) => theme.id === progress.themeId) ?? null
})

function startQuiz(themeId: ThemeId): void {
  quizStore.startQuiz(themeId)
  router.push('/quiz')
}

function continueQuiz(): void {
  if (quizStore.restoreProgress()) {
    router.push('/quiz')
  }
}
</script>

<style scoped lang="scss">
.home-shell {
  display: grid;
  gap: 32px;
}

.hero {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 24px;
  padding: 34px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(241, 122, 66, 0.18), transparent 26%),
    radial-gradient(circle at left center, rgba(43, 95, 255, 0.18), transparent 24%),
    var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.eyebrow {
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.hero-copy h1 {
  font-size: clamp(2rem, 3vw, 3.4rem);
  line-height: 0.96;
  margin-bottom: 18px;
  max-width: 11em;
  display: grid;
  gap: 0.06em;
  text-wrap: balance;
}

.hero-copy h1 span {
  display: block;
}

.hero-text {
  color: var(--color-text-secondary);
  max-width: 58ch;
  line-height: 1.7;
}

.hero-side {
  display: flex;
  align-items: end;
}

.resume-card {
  width: 100%;
  padding: 22px;
  border-radius: 22px;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  display: grid;
  gap: 10px;

  strong {
    font-size: 1.2rem;
  }
}

.resume-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.section-head {
  display: grid;
  gap: 6px;

  p {
    color: var(--color-text-secondary);
  }
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 980px) {
  .hero,
  .theme-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    max-width: none;
  }
}
</style>
