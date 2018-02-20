import Vue from 'vue'

const state = {
  informations: {}
}
const actions = {
  initSession (store, payload) {
    if (typeof payload === 'object') {
      store.commit('set', payload)
    }
  },
  login (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        'action': 'auth',
        'email': payload.email,
        'password': payload.password
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true
        }
      ).then(res => {
        if (res.data.state === 'success') {
          resolve(res.data.body)
          store.commit('set', res.data.body)
        } else {
          reject(new Error('bad.credentials'))
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  },
  logout (store) {
    store.commit('reset')
  }
}
const getters = {
  getUser: state => { return state.informations },
  isLogged: state => { return state.informations.email !== undefined }
}
const mutations = {
  set (store, user) {
    state.informations = user
  },
  reset (store) {
    state.informations = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
