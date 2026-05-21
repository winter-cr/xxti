<template>
  <section class="page-shell">
    <div v-if="result" class="result-shell" :style="resultStyle">
      <div class="result-header">
        <div>
          <p class="result-theme">{{ result.themeName }}</p>
          <h1 class="type-name">{{ result.typeName }}</h1>
          <p class="type-id">{{ result.typeId }}</p>
        </div>
        <div class="result-badge">
          <span>你的结果</span>
        </div>
      </div>

      <p class="type-description">{{ result.typeDescription }}</p>

      <div class="result-grid">
        <section class="result-card">
          <h2>维度得分</h2>
          <DimensionBar
            v-for="ds in result.dimensionScores"
            :key="ds.dimensionId"
            :dimension="getDimension(ds.dimensionId)"
            :pole-a-score="ds.poleAScore"
            :pole-b-score="ds.poleBScore"
            :color-a="result.colors.primary"
            :color-b="result.colors.secondary"
          />
        </section>

        <section class="result-card action-card">
          <h2>继续看看你会走向哪里</h2>
          <p>这份结果已经为你留档。你可以顺着同一主题继续阅读类型故事，或看看不同性格之间会擦出怎样的火花。</p>
          <div class="actions">
            <button class="btn-primary share-btn" type="button" @click="handleShare">复制结果</button>
            <button class="btn-secondary" type="button" @click="goMatch">类型匹配</button>
            <button class="btn-secondary" type="button" @click="goEncyclopedia">查看百科</button>
            <button class="btn-secondary" type="button" @click="handleReset">重新测试</button>
          </div>
        </section>
      </div>

      <div v-if="showFallback" class="fallback">
        <p class="fallback-hint">请手动选择并复制以下内容：</p>
        <textarea class="fallback-text" readonly :value="shareText" rows="4"></textarea>
      </div>
    </div>

    <ToastMessage
      v-model:visible="showToast"
      :message="toastMessage"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { shareService } from '@/services/shareService'
import type { Dimension } from '@/types'
import DimensionBar from '@/components/DimensionBar.vue'
import ToastMessage from '@/components/ToastMessage.vue'

const router = useRouter()
const quizStore = useQuizStore()
const showToast = ref(false)
const toastMessage = ref('')
const showFallback = ref(false)

const result = computed(() => quizStore.result)

const resultStyle = computed(() => {
  if (!result.value) return {}
  return {
    '--accent': result.value.colors.primary,
    '--accent-soft': result.value.colors.secondary,
    '--accent-bg': result.value.colors.background,
  }
})

function getDimension(id: string): Dimension {
  return quizStore.themeConfig.dimensions.find((dimension) => dimension.id === id) as Dimension
}

const shareText = computed(() => {
  if (!result.value) return ''
  return shareService.generateSummary(result.value)
})

async function handleShare(): Promise<void> {
  if (!result.value) return
  const success = await shareService.copyResult(result.value)
  if (success) {
    toastMessage.value = '复制成功'
    showToast.value = true
    showFallback.value = false
    return
  }

  showFallback.value = true
}

function goMatch(): void {
  if (!result.value) return
  router.push(`/match/${result.value.themeId}/${result.value.typeId}`)
}

function goEncyclopedia(): void {
  router.push(`/encyclopedia?theme=${quizStore.currentThemeId}`)
}

function handleReset(): void {
  if (!result.value) return
  quizStore.startQuiz(result.value.themeId)
  router.push('/quiz')
}
</script>

<style scoped lang="scss">
.result-shell {
  display: grid;
  gap: 24px;
  padding: 30px;
  border-radius: 28px;
  background: linear-gradient(180deg, var(--accent-bg) 0%, var(--color-surface) 44%);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.result-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: start;
}

.result-theme {
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 10px;
}

.type-name {
  font-size: clamp(2rem, 3vw, 3.4rem);
  line-height: 1.02;
  margin-bottom: 6px;
}

.type-id {
  color: var(--color-text-secondary);
  letter-spacing: 0.2em;
}

.result-badge {
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.type-description {
  font-size: 1rem;
  line-height: 1.8;
  max-width: 70ch;
}

.result-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 18px;
}

.result-card {
  padding: 22px;
  border-radius: 22px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);

  h2 {
    font-size: 1rem;
    margin-bottom: 16px;
  }
}

.action-card p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.actions {
  margin-top: 18px;
  display: grid;
  gap: 10px;
}

.share-btn {
  background: var(--accent);

  &:hover {
    background: var(--accent);
    filter: brightness(0.94);
  }
}

.fallback {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 18px;
}

.fallback-hint {
  color: var(--color-text-secondary);
  margin-bottom: 10px;
}

.fallback-text {
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  border-radius: 14px;
  padding: 12px;
  resize: none;
  font: inherit;
}

@media (max-width: 920px) {
  .result-grid {
    grid-template-columns: 1fr;
  }

  .result-header {
    flex-direction: column;
  }
}
</style>
