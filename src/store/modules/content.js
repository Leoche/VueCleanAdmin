import Vue from 'vue'

const state = {
  content: {},
  fetched: false
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
          console.log('payload', payload)
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
    if (label.indexOf('/') !== -1 && state.fetched) {
      return state.content[label.split('/')[0]][label.split('/')[1]] || ''
    } else {
      return state.content[label] || ''
    }
  },
  isContentFetched: state => { return state.fetched }
}
const mutations = {
  SET_CONTENT (state, res) {
    state.content = res
    state.fetched = true
  },
  EDIT_CONTENT (store, payload) {
    if (payload.sub) {
      state.content[payload.name][payload.sub] = payload.value
    } else {
      state.content[payload.name] = payload.value
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
