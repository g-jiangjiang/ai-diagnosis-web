import request from './request'

export function loginUser(data) {
    return request({
        url: 'auth/login/user',
        method: 'post',
        data
    })
}

export function loginAdmin(data) {
    return request({
        url: 'auth/login/admin',
        method: 'post',
        data
    })
}
