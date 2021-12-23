
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// 每次请求携带cookies信息
axios.defaults.headers.post['Content-Type'] = 'application/json',
  axios.defaults.withCredentials = true

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 50000, // request timeout
  async: true,
  crossDomain: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (localStorage.getItem('token')) {
      config.headers.Token = localStorage.getItem('token')
      console.log('本次request请求传递了token信息')
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use((response) => {
  if (response === null) {
    window.location = '/login'
  } else if (response.data.code === 401) { // 未登录
    console.log('没有合法token')
    store.commit('delLogin')
    window.location = '/login'
  } else {
    return response
  }
}, function (error) {
  return Promise.reject(error)
})

export default service
