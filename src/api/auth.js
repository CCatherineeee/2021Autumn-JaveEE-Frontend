import request from '@/util/request'


//  登陆
export function login(data) {
    console.log('data',data)
let param = new URLSearchParams(data)
console.log('param',param)
return request({
    url: '/api/user/login',
    method: 'post',
    data:data
})
}


// 注册
export function register(data) {
    let param = new URLSearchParams(data)
    
    return request({
        url: '/register',
        method: 'post',
        data:param
    })
    }

// 修改密码
export function resetPws(data) {
    let param = new URLSearchParams(data)

    return request({
        url: '/api/users/resetPwd',
        method: 'post',
        data:param
    })
}
