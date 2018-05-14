import Vue from 'vue'

const state = {
  users: [],
  fetched: false
}
const actions = {
  fetchUsers (state, user) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'getusers',
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
          state.commit('SET_USERS', res.data.body)
          resolve(res)
        } else { reject(new Error('bad.credentials')) }
      }, res => { reject(new Error('unreachable')) })
    })
  },
  removeUser (state, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'removeuser',
        email: payload.user.email,
        password: payload.user.password,
        useremail: state.getters.getUsers[payload.index].email
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true
        }
      ).then(res => {
        if (res.data.state === 'success') {
          state.commit('REMOVE_USER', payload.index)
          resolve(res)
        } else { reject(new Error('bad.credentials')) }
      }, res => { reject(new Error('unreachable')) })
    })
  },
  addUser (state, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'adduser',
        email: payload.user.email,
        password: payload.user.password,
        useremail: payload.newuser.email,
        username: payload.newuser.name,
        userpassword: payload.newuser.newpassword
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true
        }
      ).then(res => {
        if (res.data.state === 'success') {
          state.commit('ADD_USER', {
            email: payload.newuser.email,
            name: payload.newuser.name,
            role: 'user',
            password: payload.newuser.newpassword
          })
          resolve(res)
        } else { reject(new Error('bad.credentials')) }
      }, res => { reject(new Error('unreachable')) })
    })
  },
  editUser (state, payload) {
    let api = document.querySelector('meta[name=api]').content
    return new Promise((resolve, reject) => {
      return Vue.http.post(api, {
        action: 'edituser',
        email: payload.user.email,
        password: payload.user.password,
        useroldemail: payload.newuser.oldemail,
        useremail: payload.newuser.email,
        username: payload.newuser.name,
        userpassword: payload.newuser.password
      },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          emulateJSON: true
        }
      ).then(res => {
        if (res.data.state === 'success') {
          state.commit('EDIT_USER', payload)
          resolve(res)
        } else { reject(new Error('bad.credentials')) }
      }, res => { reject(new Error('unreachable')) })
    })
  }
}
const getters = {
  getUsers: state => state.users,
  isUsersFetched: state => state.fetched
}
const mutations = {
  SET_USERS (state, users) {
    state.users = users
    state.fetched = true
  },
  ADD_USER (state, user) {
    state.users.push(user)
  },
  EDIT_USER (state, payload) {
    state.users[payload.index].name = payload.newuser.name
    state.users[payload.index].email = payload.newuser.email
  },
  REMOVE_USER (state, index) {
    state.users.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
