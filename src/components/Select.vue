<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    :class="{
      'p-2': variant !== 'sm',
      'px-1 py-0.5 text-sm': variant === 'sm',
    }"
    class="border rounded-md transition-colors cursor-pointer select-none bg-gray-200 hover:bg-gray-300 dark:bg-secondary-400 dark:hover:bg-secondary-300 border-gray-400 dark:border-secondary-500 text-gray-800 dark:text-gray-200 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="bg-gray-200 dark:bg-secondary-400"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface Option<T = string> {
  value: T
  label: string
}

defineProps<{
  modelValue: string | number
  options: Option<string | number>[]
  variant?: 'default' | 'sm'
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
