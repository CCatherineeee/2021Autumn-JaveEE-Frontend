import request from '@/util/request'


//  登陆
export function login(data) {

return request({
    url: '/api/user/login',
    method: 'post',
    data:data
})
}


// 注册
export function register(data) {
    
    return request({
        url: '/api/register',
        method: 'post',
        data:data
    })
    }

// 修改密码
export function resetPwd(data) {
    return request({
        url: '/api/users/resetPwd',
        method: 'post',
        data:data
    })
}

// 请求发送邮件
export function reqSendMail(data){
    return request({
        url: '/api/users/reqSendLink',
        method: 'get',
        params:data
    })
}

// 检查邮件连接是否有效
export function checkURL(data){
    return request({
        url: '/api/users/recover',
        method: 'get',
        params:data
    })
}
