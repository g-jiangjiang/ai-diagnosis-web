import request from './request'

// 发送聊天消息 (Session Mode) - Legacy
export function chatDiagnosis(data) {
    return request({
        url: '/diagnosis/chat',
        method: 'post',
        data
    })
}

// 基础 URL，供 fetch 使用
export const BASE_URL = '/api/v1'

// 流式聊天 (SSE)
export function chatDiagnosisStream(data) {
    const headers = {
        'Content-Type': 'application/json'
    }

    // Add Authorization Token
    try {
        const userInfoStr = localStorage.getItem('userInfo')
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr)
            if (userInfo && userInfo.token) {
                headers['Authorization'] = 'Bearer ' + userInfo.token
            }
        }
    } catch (e) {
        console.error('Failed to parse token', e)
    }

    return fetch(BASE_URL + '/diagnosis/chat', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
}
