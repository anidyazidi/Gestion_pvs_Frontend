import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AjoutPlaint from '../views/Plaints/Ajouter_Plaint.vue'
import CherchePlaint from '../views/Plaints/Chercher_Plaint.vue'
import AjoutPv from '../views/pvs/Ajout_Pvs.vue'
import PvCherche from '../views/pvs/Chercher_Pvs.vue'
import PvReponse from '../views/pvs/Pv_Reponse.vue'
import pageLogin from '../components/Auth/pageLogin.vue'
import TraitePlaint from '../views/Traiter_Plaint_Pv/Traiter_Plaint.vue'
import TraitePv from '../views/Traiter_Plaint_Pv/Traiter_Pv.vue'
import statPv from '../views/stats/stat_pv.vue'
import statPlaint from '../views/stats/stat_plaint.vue'
import gestUser from '../views/gest_users.vue'
import vicePlaint from '../views/Mission/vice_plaint.vue'
import vicePvs from '../views/Mission/vice_pvs.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'Plaint/Ajout',
        name: 'Plaint/Ajout',
        component: AjoutPlaint
      },
      {
        path: 'Plaint/Chercher',
        name: 'Plaint/Chercher',
        component: CherchePlaint
      },
      {
        path: 'Pv/Ajout',
        name: 'Pv/Ajout',
        component: AjoutPv
      },
      {
        path: 'Pv/Cherche',
        name: 'Pv/Cherche',
        component: PvCherche
      },
      {
        path: 'Pv/PvReponse',
        name: 'Pv/PvReponse',
        component: PvReponse
      },
      {
        path: 'Traite/TraiterPlaint',
        name: 'TraiterPlaint',
        component: TraitePlaint
      },
      {
        path: 'Traite/TraiterPv',
        name: 'TraiterPv',
        component: TraitePv
      },
      {
        path: 'stat/pv',
        name: 'statPv',
        component: statPv
      },
      {
        path: 'stat/plaint',
        name: 'statPlaint',
        component: statPlaint
      },
      {
        path: '/gestUser',
        name: 'gestUser',
        component: gestUser
      },
      {
        path: '/vicePlaint',
        name: 'vicePlaint',
        component: vicePlaint
      },
      {
        path: '/vicePvs',
        name: 'vicePvs',
        component: vicePvs
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: pageLogin 
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
