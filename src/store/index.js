import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import model from './modules/model'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: account,
    model: model,
    users: users
  }
})
