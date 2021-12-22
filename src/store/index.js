
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userid: localStorage.getItem('userid') ? localStorage.getItem('userid') : ''
  },
  mutations: {
    // 修改token，并把token存入localStorage
    changeLogin (state, token, id) {
      state.token = token
      localStorage.setItem('token', token)
      state.userid = id
      localStorage.setItem('userid', id)
      // axios.defaults.headers.common['x-auth-token'] = token
    },
    rememberLogin (state, user) {
      /*
      "记住我"功能
      */
      state.email = user.email
      state.password = user.password
      localStorage.setItem('email', user.email)
      localStorage.setItem('password', user.password)
    },
    delRemember (state) {
      /*
      取消"记住我"功能
      */
      state.email = ''
      state.password = ''

      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
    // 删除token
    delLogin (state, token) {
      console.log('delete token')
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
