<template>
  <div class="page-container">
    <div class="content-box result-box" :style="boxStyle">
      <div class="type-header">
        <h1 class="type-name" :style="{ color: result?.colors?.primary || 'var(--color-primary)' }">{{ result?.typeName }}</h1>
        <p class="type-id">{{ result?.typeId }}</p>
      </div>
      <p class="type-description">{{ result?.typeDescription }}</p>
      <div class="dimensions">
        <h2 class="section-title">维度得分</h2>
        <DimensionBar
          v-for="ds in result?.dimensionScores"
          :key="ds.dimensionId"
          :dimension="getDimension(ds.dimensionId)"
          :pole-a-score="ds.poleAScore"
          :pole-b-score="ds.poleBScore"
          :color-a="result?.colors?.primary"
          :color-b="result?.colors?.secondary"
        />
      </div>
      <div class="actions">
        <button class="btn-primary share-btn" @click="handleShare">分享结果</button>
        <button class="btn-primary match-btn" :style="{ background: result?.colors?.primary }" @click="handleMatch">类型匹配</button>
        <button class="btn-secondary" @click="handleReset">重新测试</button>
      </div>
      <div v-if="showFallback" class="fallback">
        <p class="fallback-hint">请手动选择并复制以下内容：</p>
        <textarea class="fallback-text" readonly :value="shareText" rows="3"></textarea>
      </div>
    </div>
    <ToastMessage v-model:visible="showToast" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

const boxStyle = computed(() => ({
  maxWidth: '640px',
  background: result.value?.colors?.background || 'var(--color-surface)',
}))

function getDimension(id: string): Dimension {
  return quizStore.currentDimensions.find((d) => d.id === id) as Dimension
}

const shareText = computed(() => {
  if (!result.value) return ''
  return shareService.generateSummary(result.value, quizStore.currentThemeName)
})

async function handleShare() {
  if (!result.value) return
  const success = await shareService.copyResult(result.value, quizStore.currentThemeName)
  if (success) {
    toastMessage.value = '复制成功'
    showToast.value = true
    showFallback.value = false
  } else {
    showFallback.value = true
  }
}

function handleMatch() {
  if (!result.value) return
  router.push(`/match/${quizStore.currentThemeId}/${result.value.typeId}`)
}

function handleReset() {
  quizStore.resetQuiz()
  router.push('/')
}
</script>

<style scoped lang="scss">
.type-header { text-align: center; margin-bottom: 20px; }
.type-name { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
@media (min-width: 768px) { .type-name { font-size: 36px; } }
.type-id { font-size: 18px; color: var(--color-text-secondary); letter-spacing: 4px; }
.type-description { font-size: 15px; line-height: 1.8; margin-bottom: 28px; text-align: center; }
.section-title { font-size: 16px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 12px; }
.dimensions { margin-bottom: 28px; }
.actions { display: flex; flex-direction: column; gap: 12px; }
.share-btn { background: var(--color-success); &:hover { background: #0ea573; } }
.match-btn { &:hover { opacity: 0.9; } }
.btn-secondary {
  display: inline-flex; align-items: center; justify-content: center;
  width: 100%; height: 48px; padding: 0 24px;
  border: 2px solid var(--color-border); border-radius: 12px;
  background: var(--color-surface); color: var(--color-text-secondary);
  font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  &:hover { border-color: var(--color-text-secondary); color: var(--color-text); }
}
.fallback { margin-top: 16px; }
.fallback-hint { font-size: 13px; color: var(--color-warning); margin-bottom: 8px; }
.fallback-text {
  width: 100%; padding: 12px; border: 1px solid var(--color-border);
  border-radius: 8px; font-size: 14px; color: var(--color-text);
  background: var(--color-bg); resize: none; font-family: inherit;
}
</style>
