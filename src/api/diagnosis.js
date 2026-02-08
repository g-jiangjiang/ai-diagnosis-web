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
    return fetch(BASE_URL + '/diagnosis/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 如果有 Token 需要在这里加 Authorization
        },
        body: JSON.stringify(data)
    })
}
