<template>
  <div class="light h-screen w-full">
    <!-- Tailwind Script & Config (Embedded for specific design support) -->
    <!-- Note: In a real prod environment, this should be in index.html or tailwind.config.js -->
    
    <div class="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white font-display h-screen flex overflow-hidden selection:bg-primary/20">
        
        <!-- Sidebar -->
        <aside class="w-80 bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 z-20 hidden md:flex">
            <div class="p-6 pb-2">
                <div class="flex items-center gap-3 mb-6">
                    <div class="bg-primary/10 p-2 rounded-xl text-primary">
                        <span class="material-symbols-outlined text-3xl">smart_toy</span>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold leading-tight">AI 客服支持</h1>
                        <p class="text-slate-500 text-xs">智能服务中心</p>
                    </div>
                </div>
                <!-- Debug Switch Removed -->
                
                <button @click="resetSession" class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 group">
                    <span class="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">add</span>
                    <span class="font-medium">新对话</span>
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto sidebar-scroll px-4 py-2 space-y-6">
                <!-- Ticket List -->
                <div class="flex flex-col gap-2">
                    <h3 class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">工单列表</h3>
                    <!-- Loading State -->
                    <div v-if="historyLoading" class="px-3 py-2 text-slate-400 text-xs">加载中...</div>
                    
                    <!-- Ticket Items -->
                    <a v-else
                       v-for="ticket in ticketList" 
                       :key="ticket.id"
                       @click="$router.push(`/detail/${ticket.id}`)"
                       class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                    >
                        <span class="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors">confirmation_number</span>
                        <div class="flex flex-col overflow-hidden">
                            <span class="text-sm font-medium truncate">{{ ticket.title }}</span>
                            <span class="text-[10px] text-slate-400">#{{ ticket.id }} • {{ ticket.status }}</span>
                        </div>
                    </a>
                </div>
            </div>
            
            <div class="p-4 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <div class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgshe5LeVLixVjT8g4veC8v8xOxgr21Y1qpWqW4YViSxSvkBNA97_WGDI0k8bdGnzm5BL7bMoNrgPTgYEEOVj078NjY559ASlIy1FrJD9wFbHrtuIElOBLZaqNoF1mR8DwPlABNkWfknqgRDQ4jDTYNn-EVOkqKhTkSHezAG8A8NhTrFWdUmRdNS3mbLxj2OcPpz0glXcR0zX-q8k173_o1M8iBo9FLx-cXzpMYc8ihpQByZOQetGjoaUlZcPCeHMUkwQtCBBf80" class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col flex-1">
                        <p class="text-sm font-medium text-slate-900 dark:text-white">{{ userInfo.username || 'User' }}</p>
                        <p class="text-xs text-slate-500">ID: {{ userInfo.id }}</p>
                    </div>
                    <button @click="logout" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Logout">
                        <span class="material-symbols-outlined text-xl">logout</span>
                    </button>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-full relative">
            <!-- Mobile Header -->
            <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#111318] border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">smart_toy</span>
                    <span class="font-bold">AI 客服支持</span>
                </div>
                <button class="text-slate-600">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>

            <div class="flex-1 flex justify-center p-0 md:p-6 overflow-hidden">
                <div class="flex flex-col w-full max-w-5xl bg-white dark:bg-[#161b26] md:rounded-2xl shadow-sm md:shadow-xl md:border border-slate-200 dark:border-slate-700 h-full overflow-hidden relative">
                    
                    <!-- Chat Header -->
                    <div class="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-white dark:bg-[#161b26] z-10">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                                    <span class="material-symbols-outlined text-xl">smart_toy</span>
                                </div>
                                <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#161b26] rounded-full"></span>
                            </div>
                            <div>
                                <h2 class="text-sm font-bold text-slate-900 dark:text-white">AI 助手</h2>
                                <p class="text-xs text-green-600 dark:text-green-400 font-medium">在线 • 随时为您服务</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <!-- Back Button Removed -->
                        </div>
                    </div>

                    <!-- Messages Area -->
                    <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-white dark:bg-[#161b26]" ref="messageBoxRef">
                        
                        <!-- Welcome Message -->
                        <div v-if="chatStore.messages.length === 0" class="flex flex-col items-center justify-center gap-6 py-8 text-center animate-fade-in-up">
                            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <span class="material-symbols-outlined text-4xl">waving_hand</span>
                            </div>
                            <div class="max-w-md">
                                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">您好！</h2>
                                <p class="text-slate-500 dark:text-slate-400">我是您的智能助理，有什么可以帮您？我可以协助您进行故障排除、管理账户或回答账单问题。</p>
                            </div>
                        </div>

                        <!-- Message Loop -->
                        <div v-for="(msg, index) in chatStore.messages" :key="index">
                            
                            <!-- User Message -->
                            <div v-if="msg.role === 'user'" class="flex flex-row-reverse gap-4 items-start group">
                                <div class="w-8 h-8 rounded-full border border-slate-100 mt-1 overflow-hidden shrink-0">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgshe5LeVLixVjT8g4veC8v8xOxgr21Y1qpWqW4YViSxSvkBNA97_WGDI0k8bdGnzm5BL7bMoNrgPTgYEEOVj078NjY559ASlIy1FrJD9wFbHrtuIElOBLZaqNoF1mR8DwPlABNkWfknqgRDQ4jDTYNn-EVOkqKhTkSHezAG8A8NhTrFWdUmRdNS3mbLxj2OcPpz0glXcR0zX-q8k173_o1M8iBo9FLx-cXzpMYc8ihpQByZOQetGjoaUlZcPCeHMUkwQtCBBf80" class="w-full h-full object-cover">
                                </div>
                                <div class="flex flex-col items-end gap-1 max-w-[80%]">
                                    <!-- Image if exists -->
                                    <div v-if="msg.image" class="mb-2">
                                        <el-image :src="msg.image" class="rounded-lg max-w-[200px] border shadow-sm" :preview-src-list="[msg.image]" />
                                    </div>

                                    <div class="bg-primary text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md text-sm leading-relaxed whitespace-pre-wrap">
                                        {{ msg.content }}
                                    </div>
                                    <span class="text-[11px] text-slate-400 mr-1 opacity-100 transition-opacity">{{ msg.timestamp }}</span>
                                </div>
                            </div>

                            <!-- AI Message -->
                            <div v-else class="flex gap-4 items-start group">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white shrink-0 mt-1">
                                    <span class="material-symbols-outlined text-sm">smart_toy</span>
                                </div>
                                <div class="flex flex-col items-start gap-1 max-w-[80%]">
                                    <div class="bg-[#f6f6f8] dark:bg-slate-800 text-[#111318] dark:text-slate-200 px-5 py-3.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap">
                                        {{ msg.content.replace('[#CREATE_TICKET#]', '') }}
                                        <span v-if="msg.streaming" class="inline-block w-1.5 h-4 bg-primary animate-pulse ml-1 align-middle"></span>
                                        
                                        <!-- Inline Action Button -->
                                        <div v-if="msg.content.includes('[#CREATE_TICKET#]')" class="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                            <button @click="handleCreateTicket" class="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-md group w-full justify-center">
                                                <span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">confirmation_number</span>
                                                <span class="font-bold">一键创建售后工单</span>
                                            </button>
                                            <p class="text-[10px] text-slate-400 mt-2 text-center">点击后将由后台专家自动接入当前上下文</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Status / Debug Info -->
                                    <div v-if="msg.streaming" class="ml-1 mt-1">
                                        <span v-if="msg.state" class="text-xs text-primary font-medium flex items-center gap-1">
                                            <span class="material-symbols-outlined text-sm animate-spin" v-if="msg.streaming">sync</span>
                                            {{ msg.state }}
                                        </span>
                                    </div>

                                    <!-- Complex Problem / Ticket Suggestion Card -->
                                    <div v-if="msg.upgradeRequired || msg.showHandover" class="mt-2 bg-[#f6f6f8] dark:bg-slate-800 p-4 rounded-2xl text-sm border-l-4 border-orange-400 w-full">
                                        <div class="flex gap-2 items-center mb-2">
                                            <span class="material-symbols-outlined text-orange-500 text-lg">warning</span>
                                            <span class="font-bold text-orange-600 dark:text-orange-400">检测到复杂问题</span>
                                        </div>
                                        <p class="text-slate-700 dark:text-slate-300">常规排查步骤似乎无效。建议您为此提交一个优先处理工单，由人工专家介入。</p>
                                        <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                                            <button @click="handleCreateTicket" class="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 hover:border-primary text-primary hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 rounded-lg transition-all shadow-sm w-full sm:w-auto justify-center">
                                                <span class="material-symbols-outlined">confirmation_number</span>
                                                <span class="font-medium">创建支持工单</span>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Ticket Created Success -->
                                    <div v-if="msg.ticketNo" class="mt-2">
                                         <el-button type="success" plain size="small" @click="$router.push('/detail/' + msg.ticketId)">
                                            已生成工单 #{{ msg.ticketNo }} - 点击查看
                                         </el-button>
                                    </div>

                                    <!-- Instance Status Card -->
                                    <InstanceCard 
                                        v-if="msg.instanceData" 
                                        :data="msg.instanceData"
                                        @confirm="handleInstanceConfirm(msg.instanceData)"
                                        @requery="sendMessage('请再查一下实例 ' + msg.instanceData.instanceId)"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Query Loading Indicator -->
                    <div v-if="isQuerying" class="flex justify-center items-center py-4 px-6 bg-white dark:bg-[#161b26] border-t border-slate-100 dark:border-slate-800">
                        <div class="flex items-center gap-3 px-5 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">{{ queryingText || '正在查询中...' }}</span>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 md:p-6 bg-white dark:bg-[#161b26] border-t border-slate-100 dark:border-slate-800 z-20">
                        <!-- Preview Pending Image -->
                        <div v-if="pendingImage" class="mb-2 flex items-center gap-2">
                             <div class="relative">
                                <img :src="pendingImage" class="w-12 h-12 object-cover rounded border" />
                                <div class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer" @click="pendingImage = null">×</div>
                             </div>
                             <span class="text-xs text-slate-500">已添加图片</span>
                        </div>

                        <div class="relative flex items-center gap-2 bg-[#f0f2f4] dark:bg-slate-800/50 border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-slate-900 rounded-2xl p-1.5 transition-all shadow-inner">
                            <div class="flex pl-1">
                                <!-- Upload Button -->
                                <el-upload
                                   action="#"
                                   :show-file-list="false"
                                   :http-request="handleImageUpload"
                                   accept="image/*"
                                   class="flex"
                                >
                                    <button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors" title="上传图片">
                                        <span class="material-symbols-outlined text-[22px]">image</span>
                                    </button>
                                </el-upload>
                            </div>
                            
                            <textarea 
                                ref="inputRef"
                                v-model="inputMessage"
                                @keydown.enter.prevent="sendMessage"
                                :disabled="loading"
                                class="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 resize-none py-2.5 max-h-32 text-sm leading-relaxed" 
                                placeholder="请输入您的问题..." 
                                rows="1"
                                style="outline: none; vertical-align: middle;"
                            ></textarea>
                            
                            <button @click="sendMessage" :disabled="loading || (!inputMessage.trim() && !pendingImage)" class="p-2.5 bg-primary text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center">
                                <span class="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                        <div class="flex justify-center mt-2">
                            <p class="text-[10px] text-slate-400">AI 可能会犯错。请核实重要信息。</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  </div>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, watch } from 'vue'
import { chatDiagnosisStream } from '../api/diagnosis'
import { uploadFile, getUserTickets } from '../api/ticket'
import { ElMessage } from 'element-plus'
import InstanceCard from './components/InstanceCard.vue'
import dayjs from 'dayjs'
import { chatStore } from '../store/chatStore'

// Load Tailwind Script Dynamically if not present (Hack for Prototype)
onMounted(() => {
    if (!document.getElementById('tailwind-script')) {
        const script = document.createElement('script')
        script.id = 'tailwind-script'
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
        script.onload = () => {
             // Configure Tailwind
             window.tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        colors: {
                            "primary": "#135bec",
                            "background-light": "#f6f6f8",
                            "background-dark": "#101622",
                        },
                        fontFamily: {
                            "display": ["Inter", "sans-serif"]
                        }
                    },
                },
            }
        }
        document.head.appendChild(script)
    }

})

const loading = ref(false)
const isQuerying = ref(false) // Tool  查询中状态
const queryingText = ref('') // 查询提示文本
const inputMessage = ref('')
const messageBoxRef = ref(null)
const inputRef = ref(null)
const pendingImage = ref(null)
const userInfo = ref({})

// Ticket List Logic
const ticketList = ref([])
const historyLoading = ref(false)

// Load user info from localStorage
onMounted(() => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
        try {
            userInfo.value = JSON.parse(stored)
            
            // Check for critical missing token (Migration to Auth System)
            if (!userInfo.value.token) {
                 ElMessage.warning('系统升级，请重新登录以获取访问权限')
                 localStorage.removeItem('userInfo')
                 setTimeout(() => window.location.href = '/#/login', 1500)
                 return
            }

            // Update session with real user ID
            session.userId = userInfo.value.id || 1003
            fetchTicketHistory() // Load tickets after user info is ready
        } catch (e) {
            console.error('Failed to parse userInfo', e)
        }
    } else {
        // No user info, redirect to login
        window.location.href = '/#/login'
        return
    }
    
    // Initialize chatStore if empty
    if (chatStore.messages.length === 0) {
        chatStore.reset()
    } else {
        scrollToBottom()
    }
    
    // Check for pending specific question context (Ticket creation -> Chat persistence)
    // If ticketNo is passed, we might want to inject a context message, 
    // but for now we just observe the existing chat store.
    
    // Load saved session ID
    const savedSessionId = localStorage.getItem('diagnosis_session_id')
    if (savedSessionId) {
        session.sessionId = savedSessionId
    }
})

// Logout function
const logout = () => {
    const userId = userInfo.value.id || 1003
    localStorage.removeItem('userInfo')
    chatStore.reset() // Clear chat on logout explicitly
    localStorage.removeItem('diagnosis_session_id')
    window.location.href = '/#/login'
}

// Build conversation history string for ticket
const buildConversationHistory = () => {
    let history = ''
    chatStore.messages.forEach((msg, idx) => {
        if (msg.role === 'user') {
            history += `[用户]: ${msg.content}\n`
            if (msg.image) {
                history += `[用户上传图片]: ${msg.image}\n`
            }
        } else if (msg.role === 'ai' && msg.content) {
            history += `[AI助手]: ${msg.content}\n`
        }
        history += '\n'
    })
    return history
}

const fetchTicketHistory = async () => {
    historyLoading.value = true
    try {
        const userId = userInfo.value.id || session.userId
        const data = await getUserTickets(userId)
        ticketList.value = data || []
    } catch (e) {
        console.error("Failed to load tickets", e)
    } finally {
        historyLoading.value = false
    }
}

// Session State
const session = reactive({
  sessionId: localStorage.getItem('diagnosis_session_id') || '',
  userId: 1003,
  tenantCode: 'DEFAULT'
})

// Messages state is now managed by chatStore
// const messages = ref([...]) Removed

const scrollToBottom = async () => {
  await nextTick()
  if (messageBoxRef.value) {
    messageBoxRef.value.scrollTop = messageBoxRef.value.scrollHeight
  }
}

const handleImageUpload = async (options) => {
   try {
      const res = await uploadFile(options.file)
      pendingImage.value = res.url
   } catch (e) {
      ElMessage.error('上传失败')
   }
}

const sendMessage = async (extraData = {}) => {
  if ((!inputMessage.value.trim() && !pendingImage.value) || loading.value) return
  
  const userText = inputMessage.value
  const imageUrl = pendingImage.value
  
  // 检测是否为查询类消息，设置 Loading 提示
  const queryKeywords = ['查询', '订单', '客户', '状态', '实例', '查一下', '帮我查']
  if (queryKeywords.some(k => userText.includes(k))) {
    isQuerying.value = true
    queryingText.value = '正在查询系统数据...'
  }
  
  // 1. Add User Message
  chatStore.addMessage({ 
     role: 'user', 
     content: userText,
     image: imageUrl,
     timestamp: dayjs().format('HH:mm')
  })
  
  inputMessage.value = ''
  pendingImage.value = null
  scrollToBottom()
  
  loading.value = true
  
  // 2. Prepare AI Message Placeholder
  const aiMsg = reactive({
     role: 'ai',
     content: '',
     state: '正在连接...',
     streaming: true,
     debug: {},
     ticketNo: null,
     ticketId: null,
     showHandover: false,
     timestamp: dayjs().format('HH:mm')
  })
  chatStore.addMessage(aiMsg)
  scrollToBottom()

  try {
    let finalMessage = userText
    if (imageUrl) {
        finalMessage += `\n[用户上传了图片: ${imageUrl}]`
    }

    // [REMOVED] 移除了前端自动拼装冗长上下文的逻辑，通过结构化字典传递

    const response = await chatDiagnosisStream({
       sessionId: session.sessionId || null,
       userId: session.userId,
       tenantCode: session.tenantCode,
       isVip: userInfo.value?.isVip || false,
       message: finalMessage,
       aiAnalysis: extraData.aiAnalysis,
       aiAnalysisSummary: extraData.aiAnalysisSummary,
       userProblem: extraData.userProblem,
       suggestedSolution: extraData.suggestedSolution,
       possibleRootCause: extraData.possibleRootCause,
       confidenceScore: extraData.confidenceScore
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    
    while (true) {
       const { done, value } = await reader.read()
       if (done) break
       
       const chunk = decoder.decode(value, { stream: true })
       const lines = chunk.split('\n')
       
       for (const line of lines) {
           if (line.startsWith('data:')) {
               const dataStr = line.replace('data:', '').trim()
               if (dataStr === 'DONE') {
                   aiMsg.streaming = false
                   continue
               }
               
               if (!dataStr) continue
               
               try {
                   const event = JSON.parse(dataStr)
                   handleEvent(aiMsg, event)
               } catch (e) {
                   console.error('JSON Parse Error', e)
               }
           }
       }
       scrollToBottom()
    }

  } catch (e) {
    ElMessage.error('网络连接中断')
    aiMsg.content += '\n[连接异常，请重试]'
  } finally {
    loading.value = false
    isQuerying.value = false // 清除查询 Loading 状态
    queryingText.value = ''
    aiMsg.streaming = false
    // Save messages after each conversation
    // saveMessages() // Removed
    await nextTick()
    inputRef.value?.focus()
  }
}

const handleEvent = (aiMsg, event) => {
    switch (event.type) {
        case 'STATE':
            aiMsg.state = event.content
            break
        case 'TEXT':
            aiMsg.content += event.content
            // 检查 metadata 中是否有 showHandover
            if (event.metadata && event.metadata.showHandover) {
                aiMsg.showHandover = true
            }
            if (aiMsg.state !== '正在输出...') aiMsg.state = '正在输出...'
            break
        case 'TICKET':
            aiMsg.ticketNo = event.metadata.ticketNo
            aiMsg.ticketId = event.metadata.ticketId
            aiMsg.state = '工单已创建'
            setTimeout(() => {
                fetchTicketHistory() // 延迟刷新以确保后端事务提交
            }, 500) 
            break
        case 'ERROR':
            aiMsg.content += `\n[系统错误: ${event.content}]`
            break
    }
}

const resetSession = () => {
   session.sessionId = ''
   localStorage.removeItem('diagnosis_session_id')
   localStorage.removeItem('diagnosis_session_id')
   const userId = userInfo.value.id || 1003
   // localStorage.removeItem(`chat_messages_${userId}`)
   chatStore.reset()
   // saveMessages()
}

// Instance Confirm Handler
const handleInstanceConfirm = (instanceData) => {
   ElMessage.success(`已确认实例 ${instanceData.instanceId}`)
   // 可以在这里添加后续逻辑，如创建工单或进一步诊断
   sendMessage(`好的，确认是这个实例 ${instanceData.instanceId}，请继续帮我排查问题`)
}

const handleCreateTicket = () => {
   // 1. 提取用户问题：合并所有用户消息，但排除短指令（如"人工", "工单"）
   const userMessages = chatStore.messages
        .filter(m => m.role === 'user' && m.content.length > 2 && !['人工', '工单', '转人工'].includes(m.content))
        .map(m => m.content)
   const userProblem = userMessages.length > 0 ? userMessages.join('\n') : '用户未提供详细描述'

   // 2. 提取 AI 分析：找到最长的一条 AI 回复（通常是诊断结果）
   const aiMessages = chatStore.messages.filter(m => m.role === 'ai' && m.content && !m.streaming)
   const lastAiMsg = aiMessages.sort((a, b) => b.content.length - a.content.length)[0] // 取最长的一条
   const aiFullContent = lastAiMsg ? lastAiMsg.content : 'AI 未能生成有效分析'
   
   // 字段填充逻辑
   const aiAnalysis = aiFullContent
   const aiAnalysisSummary = aiFullContent.length > 100 ? aiFullContent.substring(0, 97) + '...' : aiFullContent
   const suggestedSolution = aiFullContent // 暂用全文作为建议
   const possibleRootCause = '需根据完整对话记录判断' 
   const confidenceScore = 0.95

   // 构建包含完整对话历史的消息 (静默构建用于后端持久化，不显示在用户对话框中)
   const conversationHistory = buildConversationHistory()
   
   // 发送简洁指令，数据通过 extraData 结构化传递
   inputMessage.value = '我要创建工单'
   sendMessage({ 
       aiAnalysis, 
       aiAnalysisSummary,
       userProblem, 
       suggestedSolution, 
       possibleRootCause,
       confidenceScore,
       conversationHistory // 显式传递历史记录，后端按需处理
   })
}
</script>

<style scoped>
/* Tailwind Utilities handled by CDN */
.sidebar-scroll::-webkit-scrollbar {
    width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 20px;
}
</style>
