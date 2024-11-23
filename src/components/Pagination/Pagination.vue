<template>
  <div>
    <div class="hidden sm:block">
      <LargePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @goToPage="goToPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
        :disabled="disabled"
      />
    </div>
    <div class="block sm:hidden">
      <SmallPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @goToPage="goToPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LargePagination from './LargePagination.vue'
import SmallPagination from './SmallPagination.vue'

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
