<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits<{
  (e: 'add', text: string): void
}>()

const todoText = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const isAnimating = ref(false)

const handleSubmit = () => {
  const text = todoText.value.trim()
  if (text) {
    isAnimating.value = true
    emit('add', text)
    todoText.value = ''
    setTimeout(() => {
      isAnimating.value = false
      inputRef.value?.focus()
    }, 300)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="relative group">
    <input
      ref="inputRef"
      v-model="todoText"
      type="text"
      placeholder="添加新的待办事项..."
      class="todo-input pr-12 focus:ring-primary dark:focus:ring-primary-light"
      :class="{ 'animate-shake': isAnimating }"
      @keydown="handleKeydown"
    />
    <button
      type="submit"
      class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      :class="{ 'scale-90': isAnimating }"
      :disabled="!todoText.trim()"
    >
      <PlusIcon class="w-6 h-6 text-primary transform group-hover:rotate-90 transition-transform duration-200" />
    </button>
  </form>
</template>

<style scoped>
.todo-input {
  @apply w-full px-6 py-4 text-lg border rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-700
         focus:outline-none focus:ring-2 transition-all duration-200
         shadow-sm hover:shadow-md dark:shadow-gray-900;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style> 