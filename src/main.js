// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Home from './Home.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import configRouter from './router/routers'
import axios from 'axios'
import store from './store'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const router = new VueRouter({
  routes: configRouter
})

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

/* eslint-disable no-new */
new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App)
}).$mount('#app')
