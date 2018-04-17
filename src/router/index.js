import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Editor from '@/components/Editor'
import MediasManager from '@/components/MediasManager'
import ModelManager from '@/components/ModelManager'
import UserManager from '@/components/UserManager'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Accueil',
        auth: true
      }
    },
    {
      path: '/model',
      name: 'ModelManager',
      component: ModelManager,
      meta: {
        title: 'Model Editor',
        auth: true
      }
    },
    {
      path: '/medias',
      name: 'MediasManager',
      component: MediasManager,
      meta: {
        title: 'Medias Manager',
        auth: true
      }
    },
    {
      path: '/edit/:slug',
      name: 'Editor',
      component: Editor,
      props: true,
      meta: {
        title: 'Édition',
        auth: true
      }
    },
    {
      path: '/users',
      name: 'UserManager',
      component: UserManager,
      meta: {
        title: 'Utilisateurs',
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - vAdmin'
  next()
})
export default router
