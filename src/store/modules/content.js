import Vue from 'vue'

const state = {
  content: {}
}
const actions = {
  getContents (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        'action': 'getcontent',
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
          store.commit('SET_CONTENT', res.data.body)
        } else {
          reject(new Error('bad.credentials'))
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  }
}
const getters = {
  getUser: state => { return state.informations },
}
const mutations = {
  SET_CONTENT (state, res) {
    state.content = res
  },
  ADD_CONTENT (store, payload) {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
