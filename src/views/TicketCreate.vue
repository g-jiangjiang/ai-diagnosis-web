<template>
  <div class="light font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center text-primary bg-primary/10 rounded-lg size-10">
           <span class="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">智能客服 AI</h2>
      </div>
      <div class="flex flex-1 justify-end gap-6 items-center">
         <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-slate-100 dark:ring-slate-800 bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
             AM
         </div>
      </div>
    </header>

    <main class="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- MAIN FORM COLUMN (Span 8) -->
        <div class="lg:col-span-8 flex flex-col gap-6">
           <div class="flex flex-col gap-2">
              <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">创建新工单</h1>
              <p class="text-slate-500 dark:text-slate-400">请填写工单详情。AI 将协助自动诊断。</p>
           </div>
           
           <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <!-- Auto-fill banner (Visual) -->
               <div class="bg-primary/5 border-b border-primary/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="flex items-start gap-3">
                      <div class="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                          <span class="material-symbols-outlined text-xl">auto_awesome</span>
                      </div>
                      <div>
                          <h3 class="text-slate-900 dark:text-white font-semibold text-sm">智能填充已启用</h3>
                          <p class="text-slate-500 dark:text-slate-400 text-sm">填写过程中 AI 可能会提供建议</p>
                      </div>
                  </div>
               </div>

               <div class="p-6 md:p-8 flex flex-col gap-8">
                   
                   <!-- Title -->
                   <div class="flex flex-col gap-2">
                       <label class="text-sm font-semibold text-slate-900 dark:text-white">工单标题</label>
                       <div class="relative group">
                           <input v-model="form.title" class="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all py-3 pl-4 pr-10" type="text" placeholder="简要描述问题 (如：服务器无法连接)"/>
                           <span class="material-symbols-outlined absolute right-3 top-3.5 text-slate-400 text-lg group-hover:text-primary transition-colors cursor-help">auto_awesome</span>
                       </div>
                   </div>

                   <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <!-- Module (Replacing Category) -->
                       <div class="flex flex-col gap-2">
                           <label class="text-sm font-semibold text-slate-900 dark:text-white">业务模块</label>
                           <div class="relative">
                               <select v-model="form.module" class="w-full appearance-none rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 pr-10">
                                   <option value="" disabled selected>选择模块</option>
                                   <option value="CUSTOMER">客户模块 (Customer)</option>
                                   <option value="ORDER">订单模块 (Order)</option>
                                   <option value="PRODUCT">商品模块 (Product)</option>
                                   <option value="FINANCE">财务模块 (Finance)</option>
                                   <option value="SYSTEM">系统设置 (System)</option>
                                   <option value="OTHER">其他 (Other)</option>
                               </select>
                               <span class="material-symbols-outlined absolute right-3 top-3.5 text-slate-500 pointer-events-none">expand_more</span>
                           </div>
                       </div>
                       <!-- Priority -->
                       <div class="flex flex-col gap-2">
                           <label class="text-sm font-semibold text-slate-900 dark:text-white">紧急程度</label>
                           <div class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                               <label class="flex-1 cursor-pointer">
                                   <input v-model="form.priority" value="LOW" class="sr-only peer" type="radio"/>
                                   <div class="text-center text-sm font-medium py-2 rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm transition-all">低</div>
                               </label>
                               <label class="flex-1 cursor-pointer">
                                   <input v-model="form.priority" value="MEDIUM" class="sr-only peer" type="radio"/>
                                   <div class="text-center text-sm font-medium py-2 rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">中</div>
                               </label>
                               <label class="flex-1 cursor-pointer">
                                   <input v-model="form.priority" value="HIGH" class="sr-only peer" type="radio"/>
                                   <div class="text-center text-sm font-medium py-2 rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-orange-600 peer-checked:shadow-sm transition-all">高</div>
                               </label>
                               <label class="flex-1 cursor-pointer">
                                   <input v-model="form.priority" value="URGENT" class="sr-only peer" type="radio"/>
                                   <div class="text-center text-sm font-medium py-2 rounded-md text-slate-500 peer-checked:bg-white peer-checked:text-red-600 peer-checked:shadow-sm transition-all">紧急</div>
                               </label>
                           </div>
                       </div>
                   </div>

                   <!-- Description -->
                   <div class="flex flex-col gap-2">
                       <label class="text-sm font-semibold text-slate-900 dark:text-white">问题描述</label>
                       <div class="relative">
                           <textarea v-model="form.description" class="w-full min-h-[160px] rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent p-4 resize-y leading-relaxed" placeholder="请详细描述报错信息、复现步骤等..."></textarea>
                           <div class="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                               <span class="material-symbols-outlined text-[14px]">auto_awesome</span> AI 辅助
                           </div>
                       </div>
                   </div>

                   <!-- Attachments -->
                   <div class="flex flex-col gap-2">
                       <label class="text-sm font-semibold text-slate-900 dark:text-white">附件上传</label>
                       <!-- Upload Area -->
                       <el-upload
                           action="#"
                           :show-file-list="false"
                           :http-request="handleUpload"
                           class="w-full"
                           drag
                       >
                           <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group w-full">
                               <div class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                   <span class="material-symbols-outlined text-slate-500 dark:text-slate-400">cloud_upload</span>
                               </div>
                               <p class="text-sm font-medium text-slate-900 dark:text-white">点击或拖拽文件到此处上传</p>
                               <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">支持 JPG, PNG, LOG (最大 10MB)</p>
                           </div>
                       </el-upload>
                       
                       <!-- File List -->
                       <div class="flex flex-col gap-2 mt-2">
                           <div v-for="(file, idx) in attachmentData" :key="idx" class="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                               <div class="flex items-center gap-3">
                                   <div class="size-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                       <span class="material-symbols-outlined">{{ file.type === 'IMAGE' ? 'image' : 'description' }}</span>
                                   </div>
                                   <div class="flex flex-col">
                                       <span class="text-sm font-medium text-slate-900 dark:text-white">{{ file.name }}</span>
                                       <span class="text-xs text-slate-500">{{ (file.size / 1024).toFixed(0) }} KB</span>
                                   </div>
                               </div>
                               <button @click="removeAttachment(idx)" class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-full transition-colors">
                                   <span class="material-symbols-outlined text-[20px]">delete</span>
                               </button>
                           </div>
                       </div>
                   </div>

               </div>
               
               <!-- Actions -->
               <div class="px-6 md:px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                   <button @click="$router.push('/')" class="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">取消</button>
                   <button @click="submitForm" :disabled="submitting" class="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-blue-700 shadow-sm shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50">
                       <span v-if="submitting" class="material-symbols-outlined animate-spin text-[18px]">sync</span>
                       <span v-else class="material-symbols-outlined text-[18px]">send</span>
                       <span>提交工单</span>
                   </button>
               </div>
           </div>
        </div>

        <!-- SIDEBAR (Reference Chat, Optional) -->
        <div class="lg:col-span-4 lg:sticky lg:top-24 flex flex-col min-h-[500px]">
           <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden">
               <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
                   <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                       <span class="material-symbols-outlined text-slate-400">history</span>
                       提示
                   </h3>
               </div>
               <div class="p-5 text-sm text-slate-500">
                   您可以在这里查看最近的对话历史作为参考（Mock Placeholder）。
               </div>
           </div>
        </div>

      </div>
    </main>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { createTicket, uploadFile } from '../api/ticket'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const submitting = ref(false)
const attachmentData = ref([])

const form = reactive({
  tenantId: 1, 
  userId: 1003,
  title: '',
  description: '',
  module: '',
  priority: 'MEDIUM',
  attachments: null
})

const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename)

const handleUpload = async (options) => {
  try {
    const file = options.file
    const res = await uploadFile(file)
    attachmentData.value.push({
      type: isImage(file.name) ? "IMAGE" : "LOG",
      url: res.url,
      name: file.name,
      size: file.size
    })
  } catch (e) {
    ElMessage.error('Upload Failed')
  }
}

const removeAttachment = (idx) => {
    attachmentData.value.splice(idx, 1)
}

const submitForm = async () => {
  if (!form.title || !form.description || !form.module) {
      ElMessage.warning('请填写必填项 (标题、模块、描述)')
      return
  }

  submitting.value = true
  try {
    if (attachmentData.value.length > 0) {
      form.attachments = JSON.stringify(attachmentData.value)
    }
    const res = await createTicket(form)
    ElMessage.success('工单已提交')
    router.push(`/detail/${res.id}`)
  } catch (e) {
    ElMessage.error('提交失败')
  } finally {
    submitting.value = false
  }
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
                theme: { extend: { colors: { "primary": "#135bec", "background-light": "#f6f6f8", "background-dark": "#101622" }, fontFamily: { "display": ["Inter", "sans-serif"] } } }
            }
        }
        document.head.appendChild(script)
    }
})
</script>