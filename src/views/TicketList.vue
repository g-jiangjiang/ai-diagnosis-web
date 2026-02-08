<template>
  <div class="light w-full min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased transition-colors duration-200">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 w-full bg-card-light dark:bg-card-dark border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo / Title -->
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center size-8 bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined icon-fill text-2xl">grid_view</span>
            </div>
            <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">工单管理中心</span>
          </div>
          
          <!-- User Profile -->
          <div class="flex items-center gap-4">
            <button @click="logout" class="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">退出登录</button>
            <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
            <div class="flex items-center gap-3 pl-2">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ userInfo.username || 'User' }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 capitalize">{{ userInfo.role ? userInfo.role.toLowerCase() : 'Loading...' }}</p>
              </div>
              <div class="size-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgshe5LeVLixVjT8g4veC8v8xOxgr21Y1qpWqW4YViSxSvkBNA97_WGDI0k8bdGnzm5BL7bMoNrgPTgYEEOVj078NjY559ASlIy1FrJD9wFbHrtuIElOBLZaqNoF1mR8DwPlABNkWfknqgRDQ4jDTYNn-EVOkqKhTkSHezAG8A8NhTrFWdUmRdNS3mbLxj2OcPpz0glXcR0zX-q8k173_o1M8iBo9FLx-cXzpMYc8ihpQByZOQetGjoaUlZcPCeHMUkwQtCBBf80" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div class="flex flex-col gap-1">
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {{ userInfo.role === 'STAFF' ? '待由我处理的工单' : '我的工单列表' }}
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-base">
              {{ userInfo.role === 'STAFF' ? '查看分配给您的工单并进行处理。' : '查看您提交的工单及其处理进度。' }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto" v-if="userInfo.role !== 'STAFF'">
          <button @click="$router.push('/create')" class="flex-1 lg:flex-none items-center justify-center gap-2 h-11 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm flex text-sm">
            <span class="material-symbols-outlined text-[20px]">add</span>
            新建工单
          </button>
          <button @click="$router.push('/')" class="flex-1 lg:flex-none items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-primary/25 flex text-sm">
            <span class="material-symbols-outlined icon-fill text-[20px]">auto_awesome</span>
            咨询AI助手
          </button>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 mb-6 flex flex-col md:flex-row gap-2">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input v-model="searchKeyword" @input="handleSearch" class="block w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-background-dark border-transparent rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-colors sm:text-sm font-medium" placeholder="搜索工单..." type="text"/>
        </div>
        <div class="h-px w-full md:w-px md:h-auto bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 px-1 md:px-0">
             <button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-background-dark text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                <span class="material-symbols-outlined text-[20px] text-slate-400">filter_list</span>
                 状态: 全部
             </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>

      <!-- Ticket List -->
      <div v-else class="space-y-4">
        <!-- Header Row (Desktop) -->
        <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <div class="col-span-1">工单ID</div>
          <div class="col-span-4">标题</div>
          <div class="col-span-2">业务模块</div>
          <div class="col-span-1">来源</div>
          <div class="col-span-2">优先级</div>
          <div class="col-span-1">状态</div>
          <div class="col-span-1 text-right">操作</div>
        </div>

        <!-- Ticket Items -->
        <div v-for="ticket in ticketList" :key="ticket.id" class="group bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:px-6 md:py-4 shadow-sm hover:shadow-md transition-all flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">
            
            <div class="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">工单ID</div>
            <div class="col-span-1 font-mono text-sm text-slate-500">#{{ ticket.id }}</div>
            
            <div class="col-span-4 w-full">
                <router-link :to="`/detail/${ticket.id}`" class="text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-1 group-hover:underline decoration-primary/50 underline-offset-2">
                    {{ ticket.title }}
                </router-link>
            </div>

            <div class="col-span-2 hidden md:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <div class="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <span class="material-symbols-outlined text-[18px]">category</span>
                </div>
                {{ ticket.module || ticket.category || 'General' }}
            </div>

            <div class="col-span-1 hidden md:flex text-sm text-slate-500">
                {{ ticket.source || 'WEB' }}
            </div>

            <div class="col-span-2 w-full md:w-auto flex items-center gap-2">
                <span 
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide"
                    :class="getPriorityClass(ticket.priority)"
                >
                    {{ ticket.priority }}
                </span>
                <span class="md:hidden text-xs text-slate-400 mx-2">•</span>
                <span class="md:hidden text-xs text-slate-500">{{ formatDate(ticket.createdAt) }}</span>
            </div>

            <div class="col-span-1 w-full md:w-auto">
                <span 
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    :class="getStatusClass(ticket.status)"
                >
                    <span class="material-symbols-outlined text-[16px]">info</span>
                    {{ getStatusLabel(ticket.status) }}
                </span>
            </div>

            <div class="col-span-1 w-full md:w-auto flex justify-end">
                <button @click="$router.push(`/detail/${ticket.id}`)" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors">
                    <span class="material-symbols-outlined">visibility</span>
                </button>
            </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="ticketList.length === 0" class="text-center py-10 text-slate-500">
            暂无工单
        </div>

      </div>
    </main>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserTickets, getAssignedTickets, getAllTickets, searchTickets } from '../api/ticket'
import dayjs from 'dayjs'

const router = useRouter()
const ticketList = ref([])
const loading = ref(false)
const userInfo = ref({})
const searchKeyword = ref('')
let searchTimeout = null

const logout = () => {
    const isAdmin = userInfo.value.role === 'STAFF' || userInfo.value.role === 'ADMIN'
    localStorage.removeItem('userInfo')
    router.push(isAdmin ? '/admin/login' : '/login')
}

const fetchData = async () => {
  loading.value = true
  try {
    if (userInfo.value.role === 'STAFF' || userInfo.value.role === 'ADMIN') {
         // 管理员/客服看所有工单或分配给自己的
         const data = await getAllTickets()
         ticketList.value = data || []
    } else {
         const data = await getUserTickets(userInfo.value.id)
         ticketList.value = data || []
    }
  } catch (e) {
      console.error(e)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
    // Debounce search
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        loading.value = true
        try {
            if (searchKeyword.value.trim()) {
                const data = await searchTickets(searchKeyword.value)
                ticketList.value = data || []
            } else {
                await fetchData()
            }
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false
        }
    }, 300)
}

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD HH:mm')

const getPriorityClass = (p) => {
    switch(p) {
        case 'HIGH': 
        case 'URGENT':
            return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        case 'MEDIUM':
            return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
        case 'LOW':
        default:
            return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
    }
}

const getStatusClass = (s) => {
    switch(s) {
        case 'PENDING':
        case 'OPEN':
            return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
        case 'PROCESSING':
        case 'ANALYZING':
            return 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 border border-primary/20'
        case 'WAITING_USER':
            return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
        case 'RESOLVED':
        case 'CLOSED':
            return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
        default:
            return 'bg-slate-100'
    }
}

const getStatusLabel = (s) => {
    const map = {
        'PENDING': '待处理',
        'PROCESSING': '处理中',
        'WAITING_USER': '等待用户',
        'RESOLVED': '已解决',
        'CLOSED': '已关闭',
        'OPEN': '待处理',
        'ANALYZING': '分析中'
    }
    return map[s] || s
}

onMounted(() => {
    // Tailwind Injection
    if (!document.getElementById('tailwind-script')) {
        const script = document.createElement('script')
        script.id = 'tailwind-script'
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
        script.onload = () => {
             window.tailwind.config = {
                darkMode: "class",
                theme: { extend: { colors: { "primary": "#135bec", "background-light": "#f6f6f8", "background-dark": "#101622", "card-light": "#ffffff", "card-dark": "#1a2230" }, fontFamily: { "display": ["Inter", "sans-serif"] } } }
            }
        }
        document.head.appendChild(script)
    }

    const stored = localStorage.getItem('userInfo')
    if (stored) {
        userInfo.value = JSON.parse(stored)
        fetchData()
    } else {
        router.push('/login')
    }
})
</script>

<style scoped>
/* Scoped styles mainly for overrides if needed */
</style>