import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory
import Home from './../pages/Home.vue'
import Health from './../pages/Health.vue'
export const routerHistory = createWebHistory()

export const router = createRouter({
    history: routerHistory,
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
      },
      {
        path: '/health',
        name: 'dashboard',
        component: Health
      }
    ],
});