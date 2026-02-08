import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: '/api/v1', // 配合 Vite Proxy
    timeout: 10000
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 如果是二进制流 (下载文件)，直接返回
        if (response.config.responseType === 'blob') {
            return res
        }
        // 业务逻辑判断
        if (res.code === 200) {
            return res.data
        } else {
            ElMessage.error(res.message || '系统错误')
            return Promise.reject(new Error(res.message || 'Error'))
        }
    },
    error => {
        console.error('API Error:', error)
        ElMessage.error(error.message || '网络请求失败')
        return Promise.reject(error)
    }
)

export default service