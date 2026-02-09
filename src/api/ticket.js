import request from './request'

// 1. 获取用户工单列表
export function getUserTickets(userId) {
    return request({
        url: '/tickets',
        method: 'get',
        params: { userId }
    })
}

// 1.5 获取指派给我的工单
export function getAssignedTickets(assigneeId) {
    return request({
        url: '/tickets/assigned',
        method: 'get',
        params: { assigneeId }
    })
}

// 1.6 获取所有工单（管理员用）
export function getAllTickets() {
    return request({
        url: '/tickets/all',
        method: 'get'
    })
}

// 1.7 搜索工单
export function searchTickets(keyword) {
    return request({
        url: '/tickets/search',
        method: 'get',
        params: { keyword }
    })
}

// 2. 获取单个工单详情
export function getTicketDetail(id) {
    return request({
        url: `/tickets/${id}`,
        method: 'get'
    })
}

// 3. 创建工单
export function createTicket(data) {
    return request({
        url: '/tickets',
        method: 'post',
        data
    })
}

// 3.5 更新工单
export function updateTicket(id, data) {
    return request({
        url: `/tickets/${id}`,
        method: 'put',
        data
    })
}

// 4. 上传文件 (返回 { url: "..." })
export function uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    return request({
        url: '/files/upload',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// 5. 获取工单流转记录
export function getTicketFlows(id) {
    return request({
        url: `/tickets/${id}/flows`,
        method: 'get'
    })
}

// 6. 回复工单
export function replyTicket(id, data) {
    return request({
        url: `/tickets/${id}/reply`,
        method: 'post',
        data
    })
}
