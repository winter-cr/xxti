import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useQuizStore } from '@/stores/quiz'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/quiz', component: () => import('@/views/QuizView.vue') },
    {
      path: '/result',
      component: () => import('@/views/ResultView.vue'),
      beforeEnter: (_to, _from, next) => {
        const quizStore = useQuizStore()
        if (!quizStore.isQuizComplete) next({ path: '/' })
        else next()
      },
    },
    { path: '/encyclopedia', component: () => import('@/views/EncyclopediaView.vue') },
    { path: '/encyclopedia/:themeId', component: () => import('@/views/EncyclopediaView.vue') },
    { path: '/match', component: () => import('@/views/MatchView.vue') },
    { path: '/match/:themeId/:typeAId', component: () => import('@/views/MatchView.vue') },
    { path: '/history', component: () => import('@/views/HistoryView.vue') },
  ],
})

export default router
