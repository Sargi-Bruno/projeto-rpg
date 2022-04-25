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
      path: '/criar-classe',
      name: 'criar-classe',
      component: () => import('../views/classes-views/CreateClassesView.vue')
    },
    {
      path: '/criar-deus',
      name: 'criar-deus',
      component: () => import('../views/deuses-views/CreateDeusesView.vue')
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
    {
      path: '/criar-origem',
      name: 'criar-origem',
      component: () => import('../views/origens-views/CreateOrigensView.vue')
    },
    {
      path: '/criar-poder-geral',
      name: 'criar-poder-geral',
      component: () => import('../views/poderes-gerais-views/CreatePoderesGeraisView.vue')
    },
    {
      path: '/criar-raca',
      name: 'criar-raca',
      component: () => import('../views/racas-views/CreateRacasView.vue')
    },
    {
      path: '/classe/:id',
      name: 'detalhes-classe',
      component: () => import('../views/classes-views/DetailsClassesView.vue'),
      props: true
    },
    {
      path: '/deus/:id',
      name: 'detalhes-deus',
      component: () => import('../views/deuses-views/DetailsDeusesView.vue'),
      props: true
    },
    {
      path: '/equipamento/:id',
      name: 'detalhes-equipamento',
      component: () => import('../views/equipamentos-views/DetailsEquipamentosView.vue'),
      props: true
    },
    {
      path: '/magia/:id',
      name: 'detalhes-magia',
      component: () => import('../views/magias-views/DetailsMagiasView.vue'),
      props: true
    },
    {
      path: '/origem/:id',
      name: 'detalhes-origem',
      component: () => import('../views/origens-views/DetailsOrigensView.vue'),
      props: true
    },
    {
      path: '/poder-geral/:id',
      name: 'detalhes-poder-geral',
      component: () => import('../views/poderes-gerais-views/DetailsPoderesGeraisView.vue'),
      props: true
    },
    {
      path: '/raca/:id',
      name: 'detalhes-raca',
      component: () => import('../views/racas-views/DetailsRacasView.vue'),
      props: true
    },
    {
      path: '/editar-classe/:id',
      name: 'editar-classe',
      component: () => import('../views/classes-views/EditClassesView.vue'),
      props: true
    },
    {
      path: '/editar-deus/:id',
      name: 'editar-deus',
      component: () => import('../views/deuses-views/EditDeusesView.vue'),
      props: true
    },
    {
      path: '/editar-equipamento/:id',
      name: 'editar-equipamento',
      component: () => import('../views/equipamentos-views/EditEquipamentosView.vue'),
      props: true
    },
    {
      path: '/editar-magia/:id',
      name: 'editar-magia',
      component: () => import('../views/magias-views/EditMagiasView.vue'),
      props: true
    },
    {
      path: '/editar-origem/:id',
      name: 'editar-origem',
      component: () => import('../views/origens-views/EditOrigensView.vue'),
      props: true
    },
    {
      path: '/editar-poder-geral/:id',
      name: 'editar-poder-geral',
      component: () => import('../views/poderes-gerais-views/EditPoderesGeraisView.vue'),
      props: true
    },
    {
      path: '/editar-raca/:id',
      name: 'editar-raca',
      component: () => import('../views/racas-views/EditRacasView.vue'),
      props: true
    },
    {
      path: '/classes',
      name: 'listar-classes',
      component: () => import('../views/classes-views/ListClassesView.vue')
    },
    {
      path: '/deuses',
      name: 'listar-deuses',
      component: () => import('../views/deuses-views/ListDeusesView.vue')
    },
    {
      path: '/equipamentos',
      name: 'listar-equipamentos',
      component: () => import('../views/equipamentos-views/ListEquipamentosView.vue')
    },
    {
      path: '/magias',
      name: 'listar-magias',
      component: () => import('../views/magias-views/ListMagiasView.vue')
    },
    {
      path: '/origens',
      name: 'listar-origens',
      component: () => import('../views/origens-views/ListOrigensView.vue')
    },
    {
      path: '/poderes-gerais',
      name: 'listar-poderes-gerais',
      component: () => import('../views/poderes-gerais-views/ListPoderesGeraisView.vue')
    },
    {
      path: '/racas',
      name: 'listar-racas',
      component: () => import('../views/racas-views/ListRacasView.vue')
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
