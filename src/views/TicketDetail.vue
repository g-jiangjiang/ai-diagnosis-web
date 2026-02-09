<template>
  <div class="light bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3 text-slate-900 dark:text-white">
          <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
             <span class="material-symbols-outlined">smart_toy</span>
          </div>
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">AI 客服工单系统</h2>
        </div>
        <nav class="hidden md:flex items-center gap-6">
           <!-- Removed Ticket List Link -->
        </nav>
      </div>
      <div class="flex flex-1 justify-end gap-6">
         <!-- User Avatar -->
          <div class="size-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgshe5LeVLixVjT8g4veC8v8xOxgr21Y1qpWqW4YViSxSvkBNA97_WGDI0k8bdGnzm5BL7bMoNrgPTgYEEOVj078NjY559ASlIy1FrJD9wFbHrtuIElOBLZaqNoF1mR8DwPlABNkWfknqgRDQ4jDTYNn-EVOkqKhTkSHezAG8A8NhTrFWdUmRdNS3mbLxj2OcPpz0glXcR0zX-q8k173_o1M8iBo9FLx-cXzpMYc8ihpQByZOQetGjoaUlZcPCeHMUkwQtCBBf80" class="w-full h-full object-cover">
          </div>
      </div>
    </header>

    <main class="flex-1 w-full max-w-[1280px] mx-auto p-4 md:p-8 space-y-8" v-if="!loading">
      
      <!-- Breadcrumbs & Title -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
           <router-link to="/" class="hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-[18px]">home</span> 首页
           </router-link>
           <span class="material-symbols-outlined text-[16px]">chevron_right</span>
           <span class="text-slate-900 dark:text-white font-medium">工单详情</span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3">
                 <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">工单 #{{ ticket.id }}</h1>
                 <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="statusBadgeClass">
                     {{ ticket.status }}
                 </span>
              </div>
              <p class="text-slate-500 dark:text-slate-400">创建于 {{ formatDate(ticket.createdAt) }}</p>
           </div>
           
           <div class="flex gap-3">
              <!-- Share Button Removed -->
           </div>
        </div>
      </div>

      <!-- Progress Stepper (Visual Only based on Status) -->
      <section class="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
         <div class="min-w-[700px] flex items-center justify-between relative">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
            <!-- Dynamic Width based on status could be added here, keeping fixed 38% for demo -->
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[38%] h-1 bg-primary -z-0 rounded-full"></div>
            
            <div class="flex flex-col items-center gap-3 group cursor-default z-10">
               <div class="size-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">check</span>
               </div>
               <span class="text-sm font-semibold text-primary">已提交</span>
            </div>

            <div class="flex flex-col items-center gap-3 group cursor-default z-10">
                <div class="relative">
                   <div class="size-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-md relative z-10">
                       <span class="material-symbols-outlined text-[20px]" :class="isStreamActive ? 'animate-pulse' : ''">auto_awesome</span>
                   </div>
                   <div v-if="isStreamActive" class="absolute inset-0 bg-primary/30 rounded-full animate-ping z-0"></div>
                </div>
                <span class="text-sm font-bold text-slate-900 dark:text-white">AI处理中</span>
            </div>
            
            <div class="flex flex-col items-center gap-3 group cursor-default z-10">
                <div class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center ring-4 ring-white dark:ring-slate-900 border-2 border-slate-200 dark:border-slate-700">
                   <span class="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <span class="text-sm font-medium text-slate-400">客服受理</span>
            </div>

            <div class="flex flex-col items-center gap-3 group cursor-default z-10">
                <div class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center ring-4 ring-white dark:ring-slate-900 border-2 border-slate-200 dark:border-slate-700">
                    <span class="material-symbols-outlined text-[20px]">task_alt</span>
                </div>
               <span class="text-sm font-medium text-slate-400">已解决</span>
            </div>
         </div>
      </section>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
         
         <!-- Left Column: Timeline (Spans 2) -->
         <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">history</span>
                    处理记录
                </h3>

            </div>

            <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div class="flex flex-col relative">
                    
                    <div v-for="(item, idx) in timelineItems" :key="idx" 
                         class="flex gap-4 relative pb-10 timeline-line group"
                         :class="{ 'last-item': item.isLast }">
                        
                        <!-- Icon Column -->
                        <div class="relative z-10 flex-none size-10 rounded-full flex items-center justify-center mt-1 overflow-hidden"
                             :class="[
                                item.type === 'USER_SUBMIT' ? 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700' : 
                                item.type === 'AI_ANALYSIS' ? 'bg-primary/10 border border-primary/20' : 
                                'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                             ]">
                             
                             <img v-if="item.avatar && item.type === 'USER_SUBMIT'" :src="item.avatar" class="w-full h-full object-cover" />
                             <span v-else-if="item.type === 'AI_ANALYSIS'" class="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                             <span v-else class="material-symbols-outlined text-slate-500 text-[20px]">
                                {{ item.title.includes('分配') ? 'assignment_ind' : 'assignment_turned_in' }}
                             </span>
                        </div>

                        <!-- Content Column -->
                        <div class="flex-1 pt-1">
                            <!-- AI Style Content -->
                            <div v-if="item.type === 'AI_ANALYSIS'" class="bg-primary/5 rounded-lg p-4 border border-primary/10">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="font-bold text-primary text-sm flex items-center gap-1">
                                        {{ item.title }}
                                        <span v-if="item.isVerified" class="material-symbols-outlined text-[14px]">verified</span>
                                    </span>
                                    <span class="text-xs text-slate-500 font-medium">{{ formatDate(item.time) }}</span>
                                </div>
                                <div class="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap dark:prose-invert">
                                    <MdPreview :modelValue="item.content" />
                                </div>
                            </div>

                            <!-- Standard Style Content -->
                            <div v-else>
                                <div class="flex justify-between items-start mb-1">
                                    <span class="font-bold text-slate-900 dark:text-white text-sm">{{ item.title }}</span>
                                    <span class="text-xs text-slate-500 font-medium">{{ formatDate(item.time) }}</span>
                                </div>
                                <p class="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">
                                    {{ item.content }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-if="timelineItems.length === 0" class="text-center text-slate-400 py-10">暂无记录</div>

                </div>
            </div>

            <!-- Reply Box Area Removed -->

         </div>

         <!-- Right Column: Details (Spans 1) -->
         <div class="lg:col-span-1 space-y-6">
             
             <!-- Ticket Details Card -->
             <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-24">
                 <div class="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                     <h3 class="font-bold text-slate-900 dark:text-white">工单详情</h3>
                     <button @click="toggleEditMode" class="text-slate-400 hover:text-primary transition-colors" :title="isEditMode ? '取消编辑' : '编辑工单'">
                        <span class="material-symbols-outlined text-[20px]">{{ isEditMode ? 'close' : 'edit_note' }}</span>
                     </button>
                 </div>
                 
                 <!-- Edit Mode -->
                 <div v-if="isEditMode" class="p-5 space-y-4">
                     <div class="space-y-2">
                         <label class="text-xs text-slate-500 font-medium uppercase tracking-wider">标题</label>
                         <input v-model="editForm.title" type="text" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary" />
                     </div>
                     <div class="space-y-2">
                         <label class="text-xs text-slate-500 font-medium uppercase tracking-wider">优先级</label>
                         <select v-model="editForm.priority" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary">
                             <option value="LOW">低</option>
                             <option value="MEDIUM">中</option>
                             <option value="HIGH">高</option>
                             <option value="URGENT">紧急</option>
                         </select>
                     </div>
                     <div class="space-y-2">
                         <label class="text-xs text-slate-500 font-medium uppercase tracking-wider">业务模块</label>
                         <select v-model="editForm.module" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary">
                             <option value="CUSTOMER">客户管理</option>
                             <option value="ORDER">订单管理</option>
                             <option value="PAYMENT">支付管理</option>
                             <option value="TECHNICAL">技术支持</option>
                             <option value="OTHER">其他</option>
                         </select>
                     </div>
                     <div class="space-y-2">
                         <label class="text-xs text-slate-500 font-medium uppercase tracking-wider">描述</label>
                         <textarea v-model="editForm.description" rows="6" class="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary resize-none"></textarea>
                     </div>
                     <div class="flex gap-2 pt-2">
                         <button @click="saveEdit" :disabled="savingEdit" class="flex-1 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                             {{ savingEdit ? '保存中...' : '保存修改' }}
                         </button>
                         <button @click="toggleEditMode" class="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                             取消
                         </button>
                     </div>
                 </div>
                 
                 <!-- View Mode -->
                 <div v-else class="p-5 space-y-6">
                     <div class="grid grid-cols-2 gap-4">
                         <div class="flex flex-col gap-1">
                             <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">工单 ID</span>
                             <span class="text-sm font-semibold text-slate-900 dark:text-white font-mono">#{{ ticket.id }}</span>
                         </div>
                         <div class="flex flex-col gap-1">
                             <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">优先级</span>
                             <div class="flex items-center gap-1.5">
                                 <span class="size-2 rounded-full" :class="priorityDotClass"></span>
                                 <span class="text-sm font-semibold" :class="priorityTextClass">{{ ticket.priority }}</span>
                             </div>
                         </div>
                         <div class="flex flex-col gap-1">
                             <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">业务模块</span>
                             <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ ticket.module || ticket.category }}</span>
                         </div>
                         <div class="flex flex-col gap-1">
                             <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">来源</span>
                             <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ ticket.source || 'WEB' }}</span>
                         </div>
                     </div>
                     
                     <div class="flex flex-col gap-1 mt-4">
                         <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">处理人 (Assignee)</span>
                         <div class="flex items-center gap-2 mt-1">
                             <div class="size-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                 {{ ticket.assigneeName ? ticket.assigneeName.charAt(0) : '?' }}
                             </div>
                             <span class="text-sm font-medium text-slate-900 dark:text-white">{{ ticket.assigneeName || '待分配' }}</span>
                         </div>
                     </div>

                     <!-- Staff Controls -->
                     <div v-if="userInfo.role === 'STAFF'" class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <label class="flex items-center justify-between cursor-pointer">
                            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">是否确认为 Bug</span>
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="ticket.isBug" @change="handleUpdateTicket" class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                            </div>
                        </label>
                     </div>

                     <hr class="border-slate-100 dark:border-slate-800"/>
                     
                      <!-- 1. 原始描述 -->
                     <div class="flex flex-col gap-2">
                         <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">原始描述</span>
                         <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 max-h-64 overflow-y-auto">
                             <p class="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed whitespace-pre-wrap">
                                 {{ ticket.description }}
                             </p>
                         </div>
                     </div>

                     <!-- 2. AI 核心输出 (独立字段, 只读) -->
                     <div v-if="ticket.aiAnalysis || ticket.suggestedSolution" class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                         <div v-if="ticket.aiAnalysis" class="flex flex-col gap-2">
                             <span class="text-xs text-indigo-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                 <span class="material-symbols-outlined text-[14px]">psychology</span> AI 分析详情
                             </span>
                             <div class="bg-indigo-50/30 dark:bg-indigo-900/10 p-3 rounded-lg border border-indigo-100/50 dark:border-indigo-900/20">
                                 <div class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                     <MdPreview :modelValue="ticket.aiAnalysis" />
                                 </div>
                             </div>
                         </div>

                         <div v-if="ticket.suggestedSolution" class="flex flex-col gap-2">
                             <span class="text-xs text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                 <span class="material-symbols-outlined text-[14px]">lightbulb</span> 建议解决方案
                             </span>
                             <div class="bg-emerald-50/30 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-100/50 dark:border-emerald-900/20">
                                 <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                     {{ ticket.suggestedSolution }}
                                 </p>
                             </div>
                         </div>
                     </div>

                     <!-- 3. 完整对话记录 (仅管理员可见) -->
                     <div v-if="userInfo.role === 'ADMIN' && ticket.conversationHistory" class="pt-4 border-t border-slate-100 dark:border-slate-800">
                         <el-collapse>
                             <el-collapse-item name="history">
                                 <template #title>
                                     <span class="text-xs text-slate-500 font-medium uppercase tracking-wider flex items-center gap-1">
                                         <span class="material-symbols-outlined text-[14px]">forum</span> 完整对话记录 (仅管理员)
                                     </span>
                                 </template>
                                 <div class="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                                     {{ ticket.conversationHistory }}
                                 </div>
                             </el-collapse-item>
                         </el-collapse>
                     </div>
                     

                 </div>
             </div>

             <!-- Related Knowledge Base Removed -->

         </div>

      </div>

    </main>
    <div v-else class="flex justify-center items-center h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
    
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getTicketDetail, getTicketFlows, updateTicket, replyTicket } from '../api/ticket'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import dayjs from 'dayjs'

const route = useRoute()
const ticket = ref({})
const loading = ref(true)
const userInfo = ref({})
const replyContent = ref('')
const sendingReply = ref(false)

// Edit Mode State
const isEditMode = ref(false)
const savingEdit = ref(false)
const editForm = ref({
    title: '',
    priority: '',
    module: '',
    description: ''
})

const toggleEditMode = () => {
    if (!isEditMode.value) {
        // Entering edit mode - copy current values
        editForm.value = {
            title: ticket.value.title || '',
            priority: ticket.value.priority || 'MEDIUM',
            module: ticket.value.module || 'OTHER',
            description: ticket.value.description || ''
        }
    }
    isEditMode.value = !isEditMode.value
}

const saveEdit = async () => {
    savingEdit.value = true
    try {
        await updateTicket(ticket.value.id, {
            title: editForm.value.title,
            priority: editForm.value.priority,
            module: editForm.value.module,
            description: editForm.value.description
        })
        // Update local data
        ticket.value.title = editForm.value.title
        ticket.value.priority = editForm.value.priority
        ticket.value.module = editForm.value.module
        ticket.value.description = editForm.value.description
        isEditMode.value = false
        alert('保存成功')
    } catch (e) {
        console.error(e)
        alert('保存失败，请重试')
    } finally {
        savingEdit.value = false
    }
}

// SSE Logic (Kept for compatibility if re-enabled)
const streamContent = ref('')
const isStreamActive = ref(false)
const streamFinished = ref(false)
const eventSource = ref(null)
const localParsedResult = ref({ rootCause: null, confidence: 0 })
const flowLogs = ref([])

// Helper Classes
const statusBadgeClass = computed(() => {
    switch(ticket.value.status) {
        case 'ANALYZING': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        case 'RESOLVED': return 'bg-green-100 text-green-800'
        default: return 'bg-slate-100 text-slate-800'
    }
})

const priorityDotClass = computed(() => {
    return ['HIGH', 'URGENT'].includes(ticket.value.priority) ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
})
const priorityTextClass = computed(() => {
    return ['HIGH', 'URGENT'].includes(ticket.value.priority) ? 'text-red-600 dark:text-red-400' : 'text-emerald-600'
})

// Attachments Logic (Same as before)
const parsedAttachments = computed(() => {
  const val = ticket.value.attachments
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      if (val.trim().startsWith('[')) return JSON.parse(val)
      return [val]
    } catch (e) { return [] }
  }
  return []
})

const imageAttachments = computed(() => {
  return parsedAttachments.value
      .filter(item => (typeof item === 'string' ? /\.(jpg|jpeg|png|gif|webp)$/i.test(item) : item.type === 'IMAGE'))
      .map(item => (typeof item === 'string' ? { url: item } : item))
})

const fileAttachments = computed(() => {
  return parsedAttachments.value
      .filter(item => (typeof item === 'string' ? !/\.(jpg|jpeg|png|gif|webp)$/i.test(item) : item.type !== 'IMAGE'))
      .map(item => (typeof item === 'string' ? { url: item, name: '附件', size: 0 } : item))
})

// Display Content Logic
const displayContent = computed(() => {
  const raw = streamContent.value || ticket.value.aiAnalysisSummary || ''
  return cleanAiOutput(raw)
})

const finalResult = computed(() => {
  if (localParsedResult.value.rootCause) return localParsedResult.value
  return {
    rootCause: ticket.value.possibleRootCause,
    confidence: ticket.value.confidenceScore || 0
  }
})

const timelineItems = computed(() => {
    const allEvents = []

    // 1. User Submission (Always Bottom in stable sort)
    if (ticket.value.createdAt) {
        allEvents.push({
            type: 'USER_SUBMIT',
            weight: 0, // Lower weight stays below same-time events
            title: '用户提交工单',
            content: `工单创建成功。描述: "${ticket.value.title}"`,
            time: ticket.value.createdAt,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjgshe5LeVLixVjT8g4veC8v8xOxgr21Y1qpWqW4YViSxSvkBNA97_WGDI0k8bdGnzm5BL7bMoNrgPTgYEEOVj078NjY559ASlIy1FrJD9wFbHrtuIElOBLZaqNoF1mR8DwPlABNkWfknqgRDQ4jDTYNn-EVOkqKhTkSHezAG8A8NhTrFWdUmRdNS3mbLxj2OcPpz0glXcR0zX-q8k173_o1M8iBo9FLx-cXzpMYc8ihpQByZOQetGjoaUlZcPCeHMUkwQtCBBf80'
        })
    }

    // 2. AI Analysis (Logical next step)
    if (ticket.value.aiAnalysisSummary) {
        allEvents.push({
            type: 'AI_ANALYSIS',
            weight: 1, // Higher weight stays above same-time events
            title: 'AI 助手 (System)',
            isVerified: true,
            content: ticket.value.suggestedSolution || ticket.value.aiAnalysisSummary,
            time: ticket.value.createdAt // Approx same time but higher weight
        })
    }

    // 3. Flow Logs (Real events)
    if (flowLogs.value && flowLogs.value.length) {
        flowLogs.value.forEach(log => {
             if (log.action === 'CREATED') return 
             
             allEvents.push({
                 type: 'LOG',
                 weight: 2, // Log events usually follow analysis
                 title: log.action === 'ASSIGNED' ? '自动分配' : '状态更新',
                 content: log.remarks || `动作: ${log.action}`,
                 time: log.createdAt,
                 operator: log.operator
             })
        })
    }

    // Sort Descending (Newest First)
    // Primary: Time (DESC)
    // Secondary: Weight (DESC) for same-time stability
    return allEvents.sort((a, b) => {
        const timeDiff = new Date(b.time) - new Date(a.time)
        if (timeDiff !== 0) return timeDiff
        return (b.weight || 0) - (a.weight || 0)
    }).map((item, index, arr) => ({
        ...item,
        isLast: index === arr.length - 1
    }))
})

const cleanAiOutput = (text) => {
  if (!text) return ''
  return text.replace(/---JSON_START---[\s\S]*$/, '').replace(/(PART|Part)\s*2[:：][\s\S]*$/, '').replace(/^(PART|Part)\s*1[:：].*?\n/, '').trim()
}

const formatDate = (d) => dayjs(d).format('YYYY-MM-DD HH:mm:ss')

const init = async () => {
  try {
    const data = await getTicketDetail(route.params.id)
    ticket.value = data
    
    // Fetch Flows
    const flows = await getTicketFlows(route.params.id)
    flowLogs.value = flows || []
  } finally {
    loading.value = false
  }
}

const handleUpdateTicket = async () => {
    try {
        await updateTicket(ticket.value.id, { isBug: ticket.value.isBug })
        // Optional: Notify success
    } catch (e) {
        console.error(e)
        // Revert on error?
    }
}

const handleReply = async () => {
    if (!replyContent.value.trim()) return
    sendingReply.value = true
    try {
        await replyTicket(ticket.value.id, { 
            content: replyContent.value,
            operatorId: userInfo.value.id // Pass current user ID
        })
        replyContent.value = ''
        // Refresh flows
        const flows = await getTicketFlows(ticket.value.id)
        flowLogs.value = flows || []
    } catch (e) {
        console.error(e)
        alert('发送失败，请重试')
    } finally {
        sendingReply.value = false
    }
}

onMounted(() => {
    // Tailwind Injection (Shared logic)
    if (!document.getElementById('tailwind-script')) {
        const script = document.createElement('script')
        script.id = 'tailwind-script'
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
        script.onload = () => {
            window.tailwind.config = {
                darkMode: "class",
                theme: { extend: { colors: { "primary": "#135bec", "background-light": "#f6f6f8", "background-dark": "#101622" }, fontFamily: { "display": ["Inter", "sans-serif"] } } }
            }
        }
        document.head.appendChild(script)
    }

    const stored = localStorage.getItem('userInfo')
    if (stored) {
        userInfo.value = JSON.parse(stored)
    }

    init()
})
onUnmounted(() => { if (eventSource.value) eventSource.value.close() })
</script>

<style scoped>
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.animate-blink { animation: blink 1s step-end infinite; }
/* Custom timeline line */
.timeline-line::before {
    content: '';
    position: absolute;
    top: 2.5rem; /* Start from below the icon */
    bottom: 0;   /* Go to the bottom of the container */
    left: 1.25rem;
    width: 2px;
    background-color: #e5e7eb;
    z-index: 0;
}
.dark .timeline-line::before {
    background-color: #1e293b;
}
/* Fix: Use .last-item.timeline-line to target the same element */
.timeline-line.last-item::before {
    display: none;
}
</style>