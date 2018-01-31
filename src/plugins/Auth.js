class Auth {
  constructor (options) {
    this.router = options.router
    ApplyRouteGuard.call(this, options.router)
  }

  login ($http, email, password) {
    if (process.env.NODE_ENV === 'development') {
      return this.realLogin($http, email, password)
    } else {
      return this.realLogin($http, email, password)
    }
  }

  realLogin ($http, email, password) {
    return new Promise((resolve, reject) => {
      let api = document.querySelector('meta[name=api]').content
      if (email === '' || password === '') {
        reject(new Error('error'))
      }
      $http.post(api, {
        'action': 'auth',
        'email': email,
        'password': password
      }, {
        emulateJSON: true
      }).then(res => {
        if (res.data.state === 'success') {
          resolve(res.data)
        }
        reject(new Error('error'))
      }, response => {
        reject(new Error('error'))
      })
    })
  }

  fakeLogin ($http, email, password) {
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
