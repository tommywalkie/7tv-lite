<template>
  <label
    class="flex items-center cursor-pointer select-none bg-transparent hover:bg-gray-200 dark:hover:bg-secondary-400 rounded-md p-1.5 sm:p-2"
  >
    <div class="relative">
      <input
        type="checkbox"
        class="sr-only"
        :checked="modelValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <div
        class="w-5 h-5 border-2 rounded-md border-gray-400 dark:border-gray-600 bg-white dark:bg-secondary-400 transition-colors"
        :class="{
          'hover:border-gray-500 dark:hover:border-gray-500': !modelValue,
          'border-primary-500 dark:border-primary-400': isFocused,
        }"
      >
        <svg
          class="w-4 h-4 mx-auto mt-0.5 pb-0.5 text-primary-500 dark:text-primary-400 transition-opacity"
          :class="{ 'opacity-0': !modelValue, 'opacity-100': modelValue }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isFocused = ref(false)
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
