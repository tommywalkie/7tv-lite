<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      :placeholder="placeholder"
      class="w-full p-2 pr-7 border rounded-md transition-colors bg-gray-200 dark:bg-secondary-400 border-gray-400 dark:border-secondary-500 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400"
    />
    <button
      class="absolute z-10 right-0 h-full px-2.5 bg-transparent text-gray-700 dark:text-gray-400 hover:text-primary-500 text-lg leading-5"
      @click="$emit('clear')"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()
</script>
