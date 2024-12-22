<script setup lang="ts">
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/vue/24/solid'
import type { Todo } from '../types/todo'

// 定义组件的 props
defineProps<{
  todo: Todo // 待办事项数据
}>()

// 定义组件的事件
const emit = defineEmits<{
  (e: 'toggle', id: string): void  // 切换完成状态事件
  (e: 'delete', id: string): void  // 删除待办事项事件
}>()
</script>

<template>
  <div class="todo-item group hover:shadow-lg dark:hover:shadow-gray-800 transform hover:-translate-y-0.5 transition-all duration-200">
    <!-- 切换完成状态按钮 -->
    <button
      @click="emit('toggle', todo.id)"
      class="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
    >
      <!-- 使用不同图标表示完成状态 -->
      <CheckCircleIcon 
        v-if="!todo.completed" 
        class="w-6 h-6 text-gray-400 hover:text-primary transform hover:scale-110 transition-all" 
      />
      <CheckCircleSolidIcon 
        v-else 
        class="w-6 h-6 text-primary animate-check" 
      />
    </button>
    
    <!-- 待办事项文本 -->
    <span
      class="flex-grow text-lg select-none"
      :class="[
        'transition-all duration-200',
        todo.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'
      ]"
    >
      {{ todo.text }}
    </span>
    
    <div class="flex items-center gap-2">
      <time 
        :datetime="todo.createdAt.toISOString()"
        class="text-sm text-gray-400 hidden group-hover:block transition-all"
      >
        {{ new Date(todo.createdAt).toLocaleDateString() }}
      </time>
      
      <button
        @click="emit('delete', todo.id)"
        class="opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
        aria-label="删除"
      >
        <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-600 transform hover:scale-110 transition-all" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  @apply flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm;
  animation: slide-in 0.2s ease-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes check {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-check {
  animation: check 0.2s ease-out forwards;
}
</style> 