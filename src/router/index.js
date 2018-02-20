import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Editor from '@/components/Editor'
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
        auth: true
      }
    },
    {
      path: '/model',
      name: 'ModelManager',
      component: ModelManager,
      meta: {
        auth: true
      }
    },
    {
      path: '/edit/:slug',
      name: 'Editor',
      component: Editor,
      props: true,
      meta: {
        auth: true
      }
    },
    {
      path: '/users',
      name: 'UserManager',
      component: UserManager,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router
