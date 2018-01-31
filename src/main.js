// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSession from 'vue-session'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import Auth from './plugins/Auth'

Vue.use(Buefy)
Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.use(Auth, {
  router: router
})

window['env'] = process.env.NODE_ENV

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
