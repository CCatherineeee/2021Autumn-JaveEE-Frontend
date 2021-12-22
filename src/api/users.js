import request from '@/util/request'

// 获取所有用户
export function getUsers(data) {

    return getUsers({
        url: '/api/users',
        method: 'get',
        data:data
    })
}

// 
export function searchUsers(data) {

    return searchUser({
        url: '/api/users/serach',
        method: 'get',
        data:data
    })
}