class Auth {
  constructor (options) {
    this.router = options.router
    ApplyRouteGuard.call(this, options.router)
  }

  login (email, password) {
    if (process.env.NODE_ENV === 'development') {
      return this.fakeLoggin(email, password)
    } else {
      // Todo real login
    }
  }

  fakeLoggin (email, password) {
    if (email === '' || password === '') {
      return false
    }
    let fakeAccount = {
      name: 'Léo',
      email: 'leodesigaux@gmail.com',
      token: 'y?76zL3DEGMggMc20zYc0k?JzrRke$PTvonqzG6xdrcx$Jx17Bmsx4mFi3IKNoP9'
    }
    return fakeAccount
  }

  static install (Vue, options) {
    Vue.prototype.$auth = new Auth(options)
  }
}

function ApplyRouteGuard (router) {
  router.beforeEach((to, from, next) => {
    if (!router.app.$session.exists()) {
      router.app.$session.start()
    }
    if (to.name === 'Login' && router.app.$session.has('user')) {
      next({ path: '/' })
    }
    let route = to.matched.find(e => e.meta.auth != null)
    if (route) {
      let mustAuth = route.meta.auth
      if (mustAuth && !router.app.$session.has('user')) {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
    next()
  })
}
export default Auth
