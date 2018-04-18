import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import content from './modules/content'
import media from './modules/media'
import model from './modules/model'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: account,
    content: content,
    media: media,
    model: model,
    users: users
  }
})
