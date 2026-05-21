import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultView from '@/views/ResultView.vue'
import { useQuizStore } from '@/stores/quiz'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: WelcomeView,
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
        if (!quizStore.isQuizComplete) {
          next({ path: '/' })
        } else {
          next()
        }
      },
    },
  ],
})

export default router
