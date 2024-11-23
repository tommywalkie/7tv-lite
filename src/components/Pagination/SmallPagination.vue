<template>
  <div class="flex justify-center mt-4 gap-1.5 text-sm">
    <button
      @click="prevPage"
      :disabled="currentPage === 1 || disabled"
      class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-primary-600"
      v-if="totalPages > 1 && currentPage !== 1"
    >
      Prev
    </button>
    <button
      @click="goToPage(1)"
      :disabled="currentPage === 1 || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded hover:bg-primary-600',
        { 'opacity-50': currentPage === 1, 'cursor-not-allowed': currentPage === 1 },
      ]"
      v-if="totalPages > 1 && currentPage !== 1"
    >
      1
    </button>
    <span v-if="totalPages > 2 && currentPage > 2" class="px-2 py-2 text-white">...</span>
    <span class="px-4 py-2 text-white bg-primary rounded hover:bg-primary-600 select-none">{{ currentPage }}</span>
    <span v-if="totalPages > currentPage + 1 && currentPage < totalPages - 1" class="px-2 py-2 text-white">...</span>
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded hover:bg-primary-600',
        { 'opacity-50': currentPage === totalPages },
      ]"
      v-if="totalPages > 1 && currentPage !== totalPages"
    >
      {{ totalPages }}
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || disabled"
      class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-primary-600"
      v-if="totalPages > 1 && currentPage !== totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'goToPage', page: number): void
  (e: 'nextPage'): void
  (e: 'prevPage'): void
}>()

const goToPage = (page: number) => emit('goToPage', page)
const nextPage = () => emit('nextPage')
const prevPage = () => emit('prevPage')
</script>
