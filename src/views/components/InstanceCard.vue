<template>
  <div class="instance-card bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-blue-200 dark:border-blue-800 shadow-sm my-3 max-w-md">
    <!-- 标题 -->
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-lg font-semibold text-slate-800 dark:text-white truncate">
        {{ data.name || data.instanceId }}
      </h4>
      <span :class="statusClass" class="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
        {{ statusText }}
      </span>
    </div>
    
    <!-- 实例 ID -->
    <div class="text-xs text-slate-500 dark:text-slate-400 mb-3 font-mono">
      ID: {{ data.instanceId }}
    </div>
    
    <!-- 监控指标 -->
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="bg-white dark:bg-slate-800/50 rounded-lg p-3 text-center">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">CPU</div>
        <div class="text-xl font-bold" :class="cpuClass">{{ data.cpu || 'N/A' }}</div>
      </div>
      <div class="bg-white dark:bg-slate-800/50 rounded-lg p-3 text-center">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">内存</div>
        <div class="text-xl font-bold text-purple-600 dark:text-purple-400">{{ data.memory || 'N/A' }}</div>
      </div>
    </div>
    
    <!-- 运行时间 -->
    <div class="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
      <span class="material-symbols-outlined text-sm">schedule</span>
      运行时长：{{ data.uptime || 'N/A' }}
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex gap-2">
      <button 
        @click="$emit('confirm')" 
        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
      >
        <span class="material-symbols-outlined text-base">check</span>
        是这一台
      </button>
      <button 
        @click="$emit('requery')" 
        class="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
      >
        <span class="material-symbols-outlined text-base">refresh</span>
        重查
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['confirm', 'requery'])

// 状态样式
const statusClass = computed(() => {
  const status = props.data.status?.toUpperCase()
  return {
    'RUNNING': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'STOPPED': 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    'ERROR': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }[status] || 'bg-gray-100 text-gray-700'
})

// 状态文本
const statusText = computed(() => {
  const status = props.data.status?.toUpperCase()
  return {
    'RUNNING': '运行中',
    'STOPPED': '已停止',
    'ERROR': '错误'
  }[status] || status
})

// CPU 颜色（高负载显示红色）
const cpuClass = computed(() => {
  const cpu = props.data.cpu
  if (!cpu || cpu === 'N/A') return 'text-slate-400'
  const value = parseInt(cpu)
  if (value >= 80) return 'text-red-600 dark:text-red-400'
  if (value >= 60) return 'text-orange-600 dark:text-orange-400'
  return 'text-blue-600 dark:text-blue-400'
})
</script>

<style scoped>
.instance-card {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
