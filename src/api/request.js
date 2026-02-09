import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: '/api/v1', // 配合 Vite Proxy
    timeout: 10000
})



// 请求拦截器
service.interceptors.request.use(
    config => {
        const userInfoStr = localStorage.getItem('userInfo')
        if (userInfoStr) {
            try {
                const userInfo = JSON.parse(userInfoStr)
                if (userInfo && userInfo.token) {
                    config.headers['Authorization'] = 'Bearer ' + userInfo.token
                }
            } catch (e) {
                console.error('Failed to parse userInfo for token', e)
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

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

        if (error.response && error.response.status === 401) {
            ElMessage.error('登录已过期，请重新登录')
            localStorage.removeItem('userInfo')
            window.location.href = '/#/login'
            return Promise.reject(error)
        }

        ElMessage.error(error.message || '网络请求失败')
        return Promise.reject(error)
    }
)

export default service