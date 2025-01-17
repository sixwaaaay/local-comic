import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: "/comic",
    name: "comic",
    component: () => import('../views/ComicView.vue')
  }, {
    path: "/comic/chapters",
    name: "comic-detail",
    component: () => import('../views/ChapterView.vue')
  }, {
    path: "/comic/comic-chapter",
    name: "comic-chapter",
    component: () => import('../views/ImageView.vue')
  }, {
    path: "/setting",
    name: "setting",
    component: () => import('../views/Settings.vue')
  }]
})

export default router
