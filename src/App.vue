<script setup lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useTodoStore } from './stores/todo'

// 初始化 Todo Store
const store = useTodoStore()
</script>

<template>
  <div class="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
    <!-- 主题切换组件 -->
    <ThemeToggle />
    
    <div class="max-w-2xl mx-auto space-y-8 pt-16">
      <!-- 标题 -->
      <h1 class="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        我的待办清单
      </h1>
      
      <!-- 输入组件 -->
      <TodoInput @add="store.addTodo" />
      
      <!-- 列表组件 -->
      <TodoList />
    </div>
  </div>
</template>
