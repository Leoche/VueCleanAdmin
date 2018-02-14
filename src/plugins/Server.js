class Server {
  post (vm, data, cb) {
    let api = document.querySelector('meta[name=api]').content
    vm.$http.post(api, Object.assign({
      'email': vm.$session.get('user').email,
      'password': vm.$session.get('user').password
    }, data), {
      emulateJSON: true
    }).then(res => {
      if (res.data.state === 'success') {
        this.success(vm, res)
        cb(res)
      } else {
        this.errorRequest(vm, res)
      }
    }, res => this.errorAPI(vm, res))
  }

  success (vm, res) {
    vm.$toast.open({
      message: 'Succès! ' + res.data.message,
      type: 'is-success',
      position: 'is-bottom'
    })
  }

  errorRequest (vm, res) {
    vm.$toast.open({
      message: 'Erreur lors de chargement: ' + res.data.message,
      type: 'is-warning',
      position: 'is-bottom'
    })
  }

  errorAPI (vm, res) {
    vm.$toast.open({
      message: 'Erreur lors de la connexion à l\'api: ' + res.data.message,
      type: 'is-danger',
      position: 'is-bottom'
    })
  }

  static install (Vue, options) {
    Vue.prototype.$server = new Server()
  }
}
export default Server
