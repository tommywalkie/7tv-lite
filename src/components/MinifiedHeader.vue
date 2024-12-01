<template>
  <div
    v-show="show"
    class="px-4 pt-3 h-12 sticky z-10 top-0 bg-gray-200 dark:bg-secondary-500 z-10 transition-opacity duration-200"
    :class="{ 'opacity-0': !show, 'opacity-100': show }"
  >
    <div class="flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <img src="/logo.svg" alt="7TV Lite" class="w-6 h-6" />
        <span class="text-md font-bold text-gray-800 dark:text-gray-200">7TV Lite</span>
      </a>
      <DarkModeToggle variant="sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DarkModeToggle from './DarkModeToggle.vue'

defineProps<{
  show: boolean
}>()
</script>
