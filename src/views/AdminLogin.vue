<template>
<div class="dark flex min-h-screen w-full flex-col font-display text-slate-900 dark:text-white antialiased selection:bg-primary/30 bg-[#101622]">
    <!-- Background Pattern Effect -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20" style="background-image: radial-gradient(circle at 50% 50%, #0f49bd 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 30%); filter: blur(100px);">
    </div>
    <!-- Grid overlay for tech feel -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 flex min-h-screen w-full flex-col">
    <!-- Header / Nav (Simplified) -->
    <header class="flex items-center justify-between px-6 py-4 lg:px-10 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#111318]/50 backdrop-blur-md">
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                <span class="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <h2 class="text-slate-900 dark:text-white text-lg font-bold tracking-tight">AI客服系统</h2>
        </div>
        <router-link to="/login" class="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 group">
            <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            返回用户门户
        </router-link>
    </header>
    
    <!-- Login Section -->
    <main class="flex flex-1 items-center justify-center p-4">
    <div class="flex w-full max-w-[440px] flex-col gap-6">
    <!-- Login Card -->
    <div class="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#1c1f27]/90 p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <!-- Top accent line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
        
        <div class="flex flex-col items-center gap-2 pb-8">
            <div class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary shadow-inner">
                <span class="material-symbols-outlined text-[32px]">admin_panel_settings</span>
            </div>
            <h1 class="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">管理员登录</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">请输入您的管理凭证以访问后台</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <!-- Username Field -->
            <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="admin_id">管理员账号</label>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                    <input v-model="form.username" class="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111318] pl-10 pr-3 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" id="admin_id" placeholder="ID 或 邮箱地址" type="text" required/>
                </div>
            </div>
            
            <!-- Password Field -->
            <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                    <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="password">密码</label>
                    <a class="text-xs font-medium text-primary hover:text-primary/80 hover:underline" href="#">忘记密码?</a>
                </div>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <span class="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input v-model="form.password" class="form-input block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111318] pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" id="password" placeholder="••••••••" :type="showPassword ? 'text' : 'password'" required/>
                    <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
                    </button>
                </div>
            </div>
            


            <!-- Error Message -->
            <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                {{ errorMsg }}
            </div>
            
            <!-- Submit Button -->
            <button :disabled="loading" type="submit" class="mt-2 flex w-full items-center justify-center rounded-lg bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-[0.98] transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed">
               <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
               {{ loading ? '登录中...' : '立即登录' }}
            </button>
        </form>
        
        <!-- Footer links in card -->
        <div class="mt-6 flex items-center justify-center border-t border-slate-100 dark:border-slate-800 pt-4">
            <p class="text-xs text-slate-400 dark:text-slate-500">
                遇到问题? <a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary underline decoration-slate-300 dark:decoration-slate-700 underline-offset-2" href="#">联系技术支持</a>
            </p>
        </div>
    </div>
    
    <!-- Bottom Copyright -->
    <div class="text-center">
        <p class="text-xs text-slate-500 dark:text-slate-600">
            © 2024 AI Customer Service System. Security Encrypted.
        </p>
    </div>
    </div>
    </main>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '../api/auth'

const router = useRouter()
const form = ref({ username: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''
    


    try {
        const res = await loginAdmin(form.value)
        
        // Role Check for Admin Portal
        if (res && (res.role === 'SUPPORT' || res.role === 'ADMIN')) {
             // Normalize role for TicketList compatibility
             localStorage.setItem('userInfo', JSON.stringify({ ...res, role: 'STAFF' }))
             router.push('/list') 
        } else {
             errorMsg.value = '无权访问'
        }

    } catch (e) {
        console.error(e)
        errorMsg.value = '管理员账号或密码错误'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    // Tailwind Injection (Admin Theme)
    if (!document.getElementById('tailwind-script')) {
        const script = document.createElement('script')
        script.id = 'tailwind-script'
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
        script.onload = () => {
             window.tailwind.config = {
                darkMode: "class",
                theme: { extend: { colors: { "primary": "#0f49bd", "background-light": "#f6f6f8", "background-dark": "#101622" }, fontFamily: { "display": ["Inter", "sans-serif"] } } }
            }
        }
        document.head.appendChild(script)
    }
})
</script>
