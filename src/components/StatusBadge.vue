<template>
  <el-tag :type="type">{{ statusLabel }}</el-tag>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusMap = {
  'PENDING': { label: '待处理', type: 'info' },
  'PROCESSING': { label: '处理中', type: 'warning' },
  'WAITING_USER': { label: '等待用户', type: '' },
  'RESOLVED': { label: '已解决', type: 'success' },
  'CLOSED': { label: '已关闭', type: 'info' },
  // Legacy support
  'OPEN': { label: '待处理', type: 'info' },
  'ANALYZING': { label: '处理中', type: 'warning' }
}

const statusLabel = computed(() => statusMap[props.status]?.label || props.status)
const type = computed(() => statusMap[props.status]?.type || '')
</script>
