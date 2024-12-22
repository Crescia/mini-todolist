import { ref, computed, watchEffect } from 'vue'
import type { Todo, FilterType } from '../types/todo'

const STORAGE_KEY = 'todo-list'

// 创建一个单例 store
const todos = ref<Todo[]>([])
const filter = ref<FilterType>('all')

export const useTodoStore = () => {
  // 只在第一次调用时初始化数据
  if (todos.value.length === 0) {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    try {
      if (savedTodos) {
        const parsed = JSON.parse(savedTodos)
        todos.value = Array.isArray(parsed) ? parsed.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })) : []
      }
    } catch (e) {
      console.error('Error parsing todos from localStorage:', e)
    }
  }

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  // 数据持久化
  watchEffect(() => {
    try {
      const todosToSave = todos.value.map(todo => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString()
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todosToSave))
    } catch (e) {
      console.error('Error saving todos to localStorage:', e)
    }
  })

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    }
    // 使用扩展运算符创建新数组
    todos.value = [newTodo, ...todos.value]
  }

  const toggleTodo = (id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      const todo = todos.value[index]
      // 创建新的数组以触发响应式更新
      todos.value = [
        ...todos.value.slice(0, index),
        { ...todo, completed: !todo.completed },
        ...todos.value.slice(index + 1)
      ]
    }
  }

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  const completionRate = computed(() => {
    if (todos.value.length === 0) return 0
    return Math.round((todos.value.filter(todo => todo.completed).length / todos.value.length) * 100)
  })

  return {
    todos,
    filter,
    filteredTodos,
    completionRate,
    addTodo,
    toggleTodo,
    deleteTodo
  }
} 