import Vue from 'vue'

const state = {
  medias: {},
  progress: 0,
  fetched: false
}
const actions = {
  fetchMedias (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        'action': 'getmedias',
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
          store.commit('SET_MEDIAS', res.data.body)
        } else {
          reject(new Error('bad.credentials'))
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  },
  addMedias (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    payload.formData.append('action', 'addmedias')
    payload.formData.append('email', payload.user.email)
    payload.formData.append('password', payload.user.password)
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, payload.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true,
          progress (e) {
            if (e.lengthComputable) {
              store.commit('SET_PROGRESS', Math.round((e.loaded / e.total) * 100))
            }
          }
        }
      ).then(res => {
        if (res.data.state === 'success') {
          resolve(res)
          store.commit('ADD_MEDIAS', res.data.body)
          store.commit('RESET_PROGRESS')
        } else {
          reject(res.data.message)
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  },
  resetProgress (store) {
    store.commit('RESET_PROGRESS')
  },
  removeMedia (store, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        'action': 'deletemedia',
        'email': payload.user.email,
        'password': payload.user.password,
        'filename': payload.filename
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
          store.commit('SET_MEDIAS', res.data.body)
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
  getMedias: state => { return state.medias },
  getProgress: state => { return state.progress },
  isMediasFetched: state => { return state.fetched }
}
const mutations = {
  SET_MEDIAS (state, medias) {
    state.medias = medias
    state.fetched = true
  },
  ADD_MEDIAS (state, medias) {
    state.medias.files = state.medias.files.concat(JSON.parse(medias))
  },
  RESET_MEDIAS (store) {
    state.medias = {}
  },
  SET_PROGRESS (state, progress) {
    state.progress = progress
  },
  RESET_PROGRESS (store) {
    state.progress = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
