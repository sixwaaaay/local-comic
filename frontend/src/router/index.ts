import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/comic",
      name: "comic",
      component: () => import('../views/ComicView.vue')
    }, 
    {
      path: "/comic/:name",
      name: "comic-detail",
      component: () => import('../views/ChapterView.vue')
    },
    {
      path: "/comic/:name/:chapter",
      name: "comic-chapter",
      component: () => import('../views/ImageView.vue')
    },
    {
      path: "/set",
      name: "setting",
      component: () => import('../views/Settings.vue')
    }
  ]
})

export default router
