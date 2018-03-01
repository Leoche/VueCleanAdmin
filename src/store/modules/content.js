import Vue from 'vue'

const state = {
  content: {}
}
const actions = {
  fetchContent (store, payload) {
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
          resolve(res)
          store.commit('SET_CONTENT', res.data.body)
        } else {
          reject(new Error('bad.credentials'))
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  },
  saveContent (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'setcontent',
        email: payload.user.email,
        password: payload.user.password,
        body: JSON.stringify(payload.content)
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
          store.commit('EDIT_CONTENT', payload.content)
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
  getContent: state => { return state.content },
  getContentByLabel: state => label => {
    return state.content[label] || ''
  }
}
const mutations = {
  SET_CONTENT (state, res) {
    state.content = res
  },
  EDIT_CONTENT (store, payload) {
    state.content[payload.name] = payload.value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
