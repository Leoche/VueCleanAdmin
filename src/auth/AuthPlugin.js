export class AuthPlugin {
  constructor (options) {
    this.router = options.router
    ApplyRouteGuard.call(this, options.router)
  }

  login () {
    this.user = { name: 'John' }
    return true
  }

  logout () {
    this.user = undefined
    return true
  }

  static install (Vue, options) {
    Vue.prototype.$auth = new AuthPlugin(options)
  }
}

function ApplyRouteGuard (router) {
  router.beforeEach((to, from, next) => {
    let route = to.matched.find(e => e.meta.auth != null)
    if (route) {
      let auth = route.meta.auth
      if (auth && !this.user) {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
    next()
  })
}
