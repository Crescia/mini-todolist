<script setup lang="ts">
import { TransitionGroup } from 'vue'
import type { FilterType } from '../types/todo'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { filteredTodos, completionRate, filter } = storeToRefs(store)

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'completed', label: '已完成' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <div class="flex gap-2">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          @click="filter = option.value"
          class="px-4 py-2 rounded-lg transition-all duration-200 relative"
          :class="[
            filter === option.value
              ? 'text-primary font-medium'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          ]"
        >
          {{ option.label }}
          <div
            v-if="filter === option.value"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-200"
          />
        </button>
      </div>
      
      <div class="flex items-center gap-2">
        <div class="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary transition-all duration-500"
            :style="{ width: `${completionRate}%` }"
          />
        </div>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ completionRate }}%
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="space-y-3"
        move-class="transition-transform duration-300"
      >
        <template v-if="filteredTodos.length > 0">
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="store.toggleTodo"
            @delete="store.deleteTodo"
          />
        </template>
        <div 
          v-else 
          key="empty" 
          class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl"
        >
          <div class="text-gray-400 dark:text-gray-500 text-lg">
            暂无待办事项
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style> 