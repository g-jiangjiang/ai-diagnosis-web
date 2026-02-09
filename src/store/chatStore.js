import { reactive } from 'vue'
import dayjs from 'dayjs'

// 使用 reactive 创建一个全局的内存状态
export const chatStore = reactive({
    messages: [], // 存储聊天记录

    // 初始化或重置
    reset() {
        this.messages = [{
            role: 'ai',
            content: '您好！我是您的智能售后专家。您可以直接告诉我您遇到的问题，我会帮您排查或查询数据。',
            timestamp: dayjs().format('HH:mm')
        }]
    },

    // 添加消息
    addMessage(msg) {
        this.messages.push(msg)
    },

    // 设置整个列表 (用于恢复)
    setMessages(msgs) {
        this.messages = msgs
    },

    // 获取当前数量
    count() {
        return this.messages.length
    }
})
