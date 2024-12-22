<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    @click="toggleDark()"
    class="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    aria-label="切换主题"
  >
    <SunIcon v-if="isDark" class="w-6 h-6" />
    <MoonIcon v-else class="w-6 h-6" />
  </button>
</template> 