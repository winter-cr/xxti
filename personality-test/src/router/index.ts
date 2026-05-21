import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultView from '@/views/ResultView.vue'
import EncyclopediaView from '@/views/EncyclopediaView.vue'
import MatchView from '@/views/MatchView.vue'
import HistoryView from '@/views/HistoryView.vue'
import { useQuizStore } from '@/stores/quiz'
import { isThemeId } from '@/data/themes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/quiz',
      component: QuizView,
    },
    {
      path: '/result',
      component: ResultView,
      beforeEnter: (_to, _from, next) => {
        const quizStore = useQuizStore()
        if (!quizStore.result) {
          next({ path: '/' })
          return
        }
        next()
      },
    },
    {
      path: '/encyclopedia',
      component: EncyclopediaView,
    },
    {
      path: '/match/:themeId/:typeId?',
      component: MatchView,
      beforeEnter: (to, _from, next) => {
        const themeId = String(to.params.themeId)
        if (!isThemeId(themeId)) {
          next({ path: '/' })
          return
        }
        next()
      },
    },
    {
      path: '/history',
      component: HistoryView,
    },
  ],
})

export default router
