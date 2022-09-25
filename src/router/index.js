import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { 
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/personagens',
      name: 'listar-personagens',
      component: () => import('../views/personagens-views/ListPersonagensView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/criar-personagem/:id',
      name: 'criar-personagem',
      component: () => import('../views/personagens-views/CreatePersonagensView.vue'),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/criar-classe',
      name: 'criar-classe',
      component: () => import('../views/classes-views/CreateClassesView.vue')
    },
    {
      path: '/criar-divindade',
      name: 'criar-divindade',
      component: () => import('../views/divindades-views/CreateDivindadesView.vue')
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
      path: '/divindade/:id',
      name: 'detalhes-divindade',
      component: () => import('../views/divindades-views/DetailsDivindadesView.vue'),
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
      path: '/editar-divindade/:id',
      name: 'editar-divindade',
      component: () => import('../views/divindades-views/EditDivindadesView.vue'),
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
      path: '/divindades',
      name: 'listar-divindades',
      component: () => import('../views/divindades-views/ListDivindadesView.vue')
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
    {
      path: '/login-necessario',
      name: 'login-required',
      component: () => import('../views/error-views/LoginRequiredView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('../views/error-views/NotFoundView.vue')
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      next({name: 'login-required'})
    }
  } else {
    next()
  }
})

export default router