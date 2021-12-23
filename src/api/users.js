import request from '@/util/request'

// 获取所有用户
export function getUsers(data) {

    return request({
        url: '/api/api/users/square',
        method: 'get',
        data: data
    })
}

// 获取所有用户总数
export function getUsersCount(data) {

    return request({
        url: '/api/api/users/square-count',
        method: 'get',
        data:data
    })
}

// 根据前缀名搜索用户
export function searchUsers(data) {

    return request({
        url: '/api/users/serach',
        method: 'get',
        data: data
    })
}


// 获取搜索用户结果总数
export function getSearchCount(data) {

    return request({
        url: '/api/users/serach-count',
        method: 'get',
        data:data
    })
}
