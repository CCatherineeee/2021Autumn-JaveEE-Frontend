// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import configRouter from '../../router/routers'
// const router = new VueRouter({
//   routes: configRouter
// })

/**
 * 页面跳转
 * @param vue
 * @param path 跳转路径
 * @param params 携带参数
 * @dynamicPamras 动态路由参数名字
 * @dynamicPamras 动态路由值
 */
export function goArouter (vue, path, queryParams, paramsObj) {
  goArouterByRouter(vue.$router, path, queryParams, paramsObj)
}

/****
 * 页面跳转通过router
 * @param router
 * @param path
 * @param queryParams
 * @param paramsObj
 */
export function goArouterByRouter (router, path, queryParams, paramsObj) {
  let pathObj = {
    path: path,
    query: queryParams,
    params: paramsObj
  }
  router.push(pathObj)
  router.go(1)
}

/**
 * 获取参数
 */
export function getParamsByUrl () {
  let url = window.location.href
  if (url.indexOf('?') !== -1) {
    url = url.substring(url.indexOf('?') + 1)
    let paramsArray = url.substr(1).split('&')
    if (!paramsArray || paramsArray.length === 0) {
      return null
    }
    let paramsMap = new Map()
    paramsArray.forEach((item, index, array) => {
      if (item) {
        let key = item.split('=')[0]
        let value = item.split('=')[1]
        paramsMap.set(key, value)
      }
    })
    return paramsMap
  }
}

