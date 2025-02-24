import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicial from '@/components/PaginaInicial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PaginaInicial,
    },
    {
      path: '/formtofu',
      name: 'formToFu',
      component: () => import('../views/ToFuView.vue'),
    },
    {
      path: '/formbofu',
      name: 'formBoFu',
      component: () => import('../views/BoFuView.vue'),
    },
  ],
})

export default router
