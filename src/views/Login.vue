<template>
<div class="light flex min-h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white antialiased transition-colors duration-200 font-display">
    <!-- Left Side: Illustration / Hero -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-blue-50 dark:bg-slate-900 items-center justify-center overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDC4eb1sqbsUVOwo7oGX_XcziCCiNWt-y-lIrMAtAPNOLY7uh7hAOWCynSJ5qckHBe57Nk05nncu8PuhGT9fAQZZ37wqFDZyZGjj_XIdHHYvht9yOX111DsFPE3v1e42zkiuO4JcMRCibMgBqxhBYOgKnFoKEuTlGiaATCDn7L2AYm6uP8qyAT5C0fXPe-PLmfSQbDzJllm7Hb2LXS94oXpDIVhS9iVb8J2F7JpATB-DclGbzMaawxTBQtemztMCVDVg0EyHEoqjTE');"></div>
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/80 to-blue-400/30 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-black/10"></div>
        <!-- Content Overlay -->
        <div class="relative z-10 p-12 text-white max-w-xl">
            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                <span class="material-symbols-outlined text-3xl">smart_toy</span>
            </div>
            <h2 class="text-4xl font-bold tracking-tight mb-4 text-shadow-sm">智能客服系统</h2>
            <p class="text-lg text-blue-50/90 font-medium leading-relaxed">
                体验下一代 AI 驱动的客户支持。高效、智能、全天候为您服务。
            </p>
            <!-- Decorative Elements Deleted as requested -->
        </div>
    </div>
    
    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex flex-col relative bg-background-light dark:bg-background-dark">
        <!-- Top Right Action -->
        <div class="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
            <router-link to="/admin/login" class="group flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all text-sm font-medium text-text-muted hover:text-primary dark:text-gray-300 dark:hover:text-primary">
                <span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">admin_panel_settings</span>
                <span>切换至管理员登录</span>
            </router-link>
        </div>
        
        <!-- Main Form Container -->
        <div class="flex-1 flex items-center justify-center p-4 sm:p-8">
            <div class="w-full max-w-[440px] animate-fade-in-up">
                <!-- Mobile Logo -->
                <div class="lg:hidden flex justify-center mb-8">
                    <div class="h-12 w-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                        <span class="material-symbols-outlined text-3xl">smart_toy</span>
                    </div>
                </div>
                
                <!-- Card -->
                <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 dark:border-border-dark p-8 sm:p-10">
                    <!-- Header -->
                    <div class="text-center mb-8">
                        <h1 class="text-2xl sm:text-3xl font-bold text-text-main dark:text-white mb-2">欢迎回来</h1>
                        <p class="text-text-muted dark:text-gray-400 text-sm">请输入您的账户信息以登录系统</p>
                    </div>
                    
                    <!-- Form -->
                    <form @submit.prevent="handleLogin" class="space-y-5">
                        <!-- Username Input -->
                        <div class="space-y-1.5">
                            <label for="username" class="block text-sm font-semibold text-text-main dark:text-gray-200 ml-1">用户名 / 邮箱</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span class="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors">person</span>
                                </div>
                                <input v-model="form.username" type="text" id="username" name="username" class="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark rounded-xl text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" placeholder="输入用户名或邮箱地址" required />
                            </div>
                        </div>
                        
                        <!-- Password Input -->
                        <div class="space-y-1.5">
                            <label for="password" class="block text-sm font-semibold text-text-main dark:text-gray-200 ml-1">密码</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span class="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors">lock</span>
                                </div>
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password" name="password" class="block w-full pl-11 pr-11 py-3 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark rounded-xl text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" placeholder="输入密码" required />
                                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-main dark:hover:text-white transition-colors cursor-pointer focus:outline-none">
                                    <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                           {{ errorMsg }}
                        </div>
                        
                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between pt-1">
                            <label class="flex items-center cursor-pointer group">
                                <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-colors cursor-pointer" />
                                <span class="ml-2 text-sm text-text-muted group-hover:text-text-main dark:group-hover:text-gray-300 transition-colors">记住我</span>
                            </label>
                            <a href="#" class="text-sm font-medium text-primary hover:text-primary-hover hover:underline decoration-2 underline-offset-2 transition-all">忘记密码?</a>
                        </div>
                        
                        <!-- Submit Button -->
                        <button :disabled="loading" type="submit" class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed">
                            <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                            {{ loading ? '登录中...' : '立即登录' }}
                        </button>
                    </form>
                    
                    <!-- Divider -->
                    <div class="relative my-8">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-border-light dark:border-border-dark"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-surface-light dark:bg-surface-dark text-text-muted">或者</span>
                        </div>
                    </div>
                    
                    <!-- Register Link -->
                    <div class="text-center">
                        <p class="text-sm text-text-muted dark:text-gray-400">
                            还没有账号？
                            <a href="#" class="font-bold text-primary hover:text-primary-hover transition-colors ml-1">立即注册</a>
                        </p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="mt-8 text-center">
                    <p class="text-xs text-text-muted/60 dark:text-gray-500">© 2024 智能客服系统. 保留所有权利.</p>
                    <div class="mt-2 flex justify-center gap-4 text-xs text-text-muted/60 dark:text-gray-500">
                        <a href="#" class="hover:text-text-muted">隐私政策</a>
                        <span>•</span>
                        <a href="#" class="hover:text-text-muted">服务条款</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../api/auth'

const router = useRouter()
const form = ref({ username: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''
    try {
        const res = await loginUser(form.value)
        // With updated AuthController, res matches standard Result format: { code, data, message }
        // request.js unwraps data if code is 200, so 'res' here should be the User object directly assuming standard format compliance by request.js
        // Wait, check request.js line 19: return res.data.
        // Yes, if Result.success(u) produces { code: 200, msg: "success", data: u }, request.js returns u.
        
        if (res && res.username) {
            localStorage.setItem('userInfo', JSON.stringify(res))
            router.push('/')
        } else {
             // Should be caught by request.js interceptor if code != 200, but just in case
            errorMsg.value = '登录失败'
        }
    } catch (e) {
        console.error(e)
        // request.js throws error if code != 200
        errorMsg.value = e.message || '登录失败，请检查用户名或密码'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    // Inject Tailwind with User's specific config
    if (!document.getElementById('tailwind-script')) {
        const script = document.createElement('script')
        script.id = 'tailwind-script'
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
        script.onload = () => {
             window.tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        colors: {
                            "primary": "#135bec",
                            "primary-hover": "#1d4ed8",
                            "background-light": "#f6f6f8",
                            "background-dark": "#101622",
                            "surface-light": "#ffffff",
                            "surface-dark": "#1e293b",
                            "border-light": "#e2e8f0",
                            "border-dark": "#334155",
                            "text-main": "#111318",
                            "text-muted": "#64748b",
                        },
                        fontFamily: {
                            "display": ["Inter", "Noto Sans SC", "sans-serif"],
                            "body": ["Inter", "Noto Sans SC", "sans-serif"],
                        },
                        borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
                    },
                },
            }
        }
        document.head.appendChild(script)
    }
})
</script>

<style scoped>
/* Custom scrollbar matching user request */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: transparent; 
}
::-webkit-scrollbar-thumb {
    background: #cbd5e1; 
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; 
}
</style>
