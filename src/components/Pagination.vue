<template>
  <div class="flex justify-center mt-4 gap-3">
    <Button
      @click="prevPage"
      :disabled="currentPage === 1 || disabled"
      :customClass="
        ['text-sm sm:text-base px-3 sm:px-4', currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''].join(' ')
      "
    >
      Prev
    </Button>
    <template v-for="page in visiblePages" :key="page.index || 'ellipsis'">
      <Button
        v-if="!page.isEllipsis"
        @click="typeof page.index === 'number' && page.index !== currentPage && goToPage(page.index)"
        :isActive="page.index === currentPage"
        :disabled="disabled"
        :customClass="
          ['text-sm sm:text-base px-3 sm:px-4', page.index === currentPage ? 'bg-primary' : 'hidden sm:block'].join(' ')
        "
      >
        {{ page.index }}
      </Button>
      <span v-else class="px-2 py-2 text-gray-600 dark:text-gray-400 hidden sm:block">...</span>
    </template>
    <Button
      @click="nextPage"
      :disabled="currentPage === totalPages || disabled"
      :customClass="
        ['text-sm sm:text-base px-3 sm:px-4', currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''].join(
          ' ',
        )
      "
    >
      Next
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps<{
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

interface Page {
  index?: number
  isEllipsis: boolean
}

const visiblePages = computed(() => {
  const maxPagesToShow = 5
  const pagesArray: Page[] = []
  const total = props.totalPages

  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pagesArray.push({ index: i, isEllipsis: false })
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pagesArray.push({ index: i, isEllipsis: false })
      }
      pagesArray.push({ isEllipsis: true })
      pagesArray.push({ index: total, isEllipsis: false })
    } else if (props.currentPage >= total - 2) {
      pagesArray.push({ index: 1, isEllipsis: false })
      pagesArray.push({ isEllipsis: true })
      for (let i = total - 3; i <= total; i++) {
        pagesArray.push({ index: i, isEllipsis: false })
      }
    } else {
      pagesArray.push({ index: 1, isEllipsis: false })
      pagesArray.push({ isEllipsis: true })
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pagesArray.push({ index: i, isEllipsis: false })
      }
      pagesArray.push({ isEllipsis: true })
      pagesArray.push({ index: total, isEllipsis: false })
    }
  }
  return pagesArray
})
</script>
