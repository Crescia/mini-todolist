import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo, FilterType } from '../types/todo'

// 定义 Todo Store，使用组合式 API 风格
export const useTodoStore = defineStore('todo', () => {
  // 状态定义
  const todos = ref<Todo[]>([]) // 存储所有待办事项
  const filter = ref<FilterType>('all') // 当前过滤器状态

  // 从 localStorage 加载数据的方法
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos)
        // 确保数据是数组，并将日期字符串转换为 Date 对象
        todos.value = Array.isArray(parsed) ? parsed.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })) : []
      } catch (e) {
        console.error('Error loading todos:', e)
      }
    }
  }

  // 保存数据到 localStorage 的方法
  const saveTodos = () => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos.value))
    } catch (e) {
      console.error('Error saving todos:', e)
    }
  }

  // 计算属性：根据过滤条件返回过滤后的待办事项
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active': // 未完成的待办事项
        return todos.value.filter(todo => !todo.completed)
      case 'completed': // 已完成的待办事项
        return todos.value.filter(todo => todo.completed)
      default: // 全部待办事项
        return todos.value
    }
  })

  // 计算属性：计算待办事项的完成率
  const completionRate = computed(() => {
    if (todos.value.length === 0) return 0
    return Math.round((todos.value.filter(todo => todo.completed).length / todos.value.length) * 100)
  })

  // Action：添加新的待办事项
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // 使用时间戳作为唯一ID
      text,
      completed: false,
      createdAt: new Date()
    }
    todos.value = [newTodo, ...todos.value] // 将新待办事项添加到列表开头
    saveTodos() // 保存到本地存储
  }

  // Action：切换待办事项的完成状态
  const toggleTodo = (id: string) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos() // 保存更改
    }
  }

  // Action：删除待办事项
  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
    saveTodos() // 保存更改
  }

  // 初始化时加载数据
  loadTodos()

  // 返回 store 的公共接口
  return {
    todos,
    filter,
    filteredTodos,
    completionRate,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}) 