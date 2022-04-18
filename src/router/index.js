import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/criar-raca',
      name: 'criar-raca',
      component: () => import('../views/racas-views/CreateRacasView.vue')
    },
    {
      path: '/criar-classe',
      name: 'criar-classe',
      component: () => import('../views/classes-views/CreateClassesView.vue')
    },
    {
      path: '/criar-origem',
      name: 'criar-origem',
      component: () => import('../views/origens-views/CreateOrigensView.vue')
    },
    {
      path: '/criar-deus',
      name: 'criar-deus',
      component: () => import('../views/deuses-views/CreateDeusesView.vue')
    },
    {
      path: '/criar-poder-geral',
      name: 'criar-poder-geral',
      component: () => import('../views/poderes-gerais-views/CreatePoderesGeraisView.vue')
    },
    {
      path: '/criar-equipamento',
      name: 'criar-equipamento',
      component: () => import('../views/equipamentos-views/CreateEquipamentosView.vue')
    },
    {
      path: '/criar-magia',
      name: 'criar-magia',
      component: () => import('../views/magias-views/CreateMagiasView.vue')
    },

    // {
    //   path: '/jobs/:id',
    //   name: 'jobDetails',
    //   component: JobDetailsView,
    //   props: true
    // },
    // // redirect 
    // {
    //   path: '/all-jobs',
    //   redirect: '/jobs'
    // },
    // // catchall 404
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'notFound',
    //   component: NotFoundView,
    // },
  ]
})

export default router
