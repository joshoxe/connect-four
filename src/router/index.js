import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/play/:roomId',
      name: 'play',
      component: () => import('../views/PlayView.vue')

    }
  ]
})

export default router
