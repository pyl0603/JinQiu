import request from '@/utils/request'

/**
 * 验证码登录
 * @param {*} data 
 */
export function login(data) {
    return request({
        url: '/login/sms',
        method: 'post',
        data
    })
}


/**
 * 获取验证码
 * @param {*} data 
 */
export function getCode(data) {
    return request({
        url: '/sms/send',
        method: 'post',
        data
    })
}


/**
 * 我的信息
 * @param {*} data 
 */
export function getInfo(parmas) {
    return request({
        url: '/user/info',
        method: 'get',
        parmas
    })
}


/**
 * 退出登录
 * @param {*} data 
 */
export function logout(data) {
    return request({
        url: '/auth/logout',
        method: 'post',
        data
    })
}
