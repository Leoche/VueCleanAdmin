import Vue from 'vue'
import slug from 'limax'

// let getInputByIndex = (state, index) => (state.path === '') ? state.model[index] : state.filter(input => input.name === state.path)[0].inputs[index]
let getInputs = (state) => (state.path === '') ? state.model : state.model.filter(input => input.name === state.path)[0].inputs
let generateInput = (input) => {
  let newInput = {
    'name': slug(input.name),
    'label': input.name,
    'type': input.type,
    'options': input.options
  }
  if (input.type === 'sub') {
    newInput.inputs = []
  }
  return newInput
}

const state = {
  model: [],
  path: ''
}
const actions = {
  fetchModel (state, user) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'getmodel',
        email: user.email,
        password: user.password
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true
        }
      ).then(res => {
        if (res.data.state === 'success') {
          state.commit('SET_MODEL', res.data.body)
          resolve(res)
        } else {
          reject(new Error('bad.credentials'))
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  },
  saveModel (state, user) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'setmodel',
        email: user.email,
        password: user.password,
        body: 'ds'
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
        } else {
          reject(res.data.message)
        }
      }, res => {
        reject(new Error('unreachable'))
      })
    })
  }
}
const getters = {
  getRootModel: state => state,
  getModel: state => (state.path === '') ? state.model : state.model.filter(input => input.name === state.path)[0].inputs,
  getModelPath: state => state.path,
  getModelPathLabel: state => (state.path === '') ? '' : state.model.filter(input => input.name === state.path)[0].label
}
const mutations = {
  SET_MODEL (state, data) {
    state.model = data
  },
  ADD_INPUT_TO_MODEL (state, input) {
    getInputs(state).push(generateInput(input))
  },
  EDIT_INPUT_TO_MODEL (state, payload) {
    let newInput = generateInput(payload.input)
    if (state.path === '') {
      state.model[payload.input.index] = newInput
    } else {
      state.model.filter(input => input.name === state.path)[0].inputs[payload.input.index] = newInput
    }
  },
  REMOVE_INPUT_TO_MODEL (state, index) {
    getInputs(state).splice(index, 1)
  },
  MOVE_INPUT_TO_MODEL (state, index, direction) {
    let tmpData = JSON.parse(JSON.stringify(state.model))
    let tmp = tmpData[index]
    tmpData[index] = tmpData[index + direction]
    tmpData[index + direction] = tmp
    state.model.splice(index, 1)
  },
  SET_PATH_TO_MODEL (state, path) {
    state.path = path
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
