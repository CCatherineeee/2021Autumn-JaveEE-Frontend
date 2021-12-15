
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    token:localStorage.getItem('token')?localStorage.getItem('token') : '',
    email:localStorage.getItem('email')?localStorage.getItem('email'):'',
    password:localStorage.getItem('password')?localStorage.getItem('password'):'',
    
  },
  mutations: {
    //修改token，并把token存入localStorage
    changeLogin(state,user){
      state.token=user.token
      state.email=user.email
      state.password=user.password
      localStorage.setItem('token',user.token)
      localStorage.setItem('email',user.email)
      localStorage.setItem('password',user.password)
    },
    rememberLogin(state,user){
      /*
      "记住我"功能
      */
      state.email=user.email
      state.password=user.password
      localStorage.setItem('email',user.email)
      localStorage.setItem('password',user.password)
    },
    delRemember(state){
      /*
      取消"记住我"功能
      */
      state.email=''
      state.password=''
  
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
    //删除token
    delLogin(state){
      console.log('delete token')
      state.token=''
      state.email=''
      state.password=''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
  },
  actions: {
  },
  modules: {
  }
})
