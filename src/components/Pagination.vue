<template>
  <div class="flex justify-center mt-4 gap-2 hidden sm:flex">
    <button
      @click="prevPage"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        {
          'opacity-50': currentPage === 1,
          'cursor-not-allowed': currentPage === 1,
        },
      ]"
      :disabled="currentPage === 1 || disabled"
    >
      Prev
    </button>
    <template v-for="page in visiblePages" :key="page.index || 'ellipsis'">
      <button
        v-if="!page.isEllipsis"
        @click="typeof page.index === 'number' && goToPage(page.index)"
        :class="[
          'px-4 py-2',
          {
            'bg-blue-500': page.index === currentPage,
            'bg-gray-700': page.index !== currentPage,
          },
        ]"
        class="text-white select-none"
        :disabled="disabled"
      >
        {{ page.index }}
      </button>
      <span v-else class="px-2 py-2 text-white">...</span>
    </template>
    <button
      @click="nextPage"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        { 'opacity-50': currentPage === totalPages },
      ]"
      :disabled="currentPage === totalPages || disabled"
    >
      Next
    </button>
  </div>
  <div class="flex justify-center mt-4 gap-2 sm:hidden">
    <button
      @click="prevPage"
      :disabled="currentPage === 1 || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        {
          'opacity-50': currentPage === 1,
          'cursor-not-allowed': currentPage === 1,
        },
      ]"
      v-if="totalPages > 1 && currentPage !== 1"
    >
      Prev
    </button>
    <button
      @click="goToPage(1)"
      :disabled="currentPage === 1 || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        {
          'opacity-50': currentPage === 1,
          'cursor-not-allowed': currentPage === 1,
        },
      ]"
      v-if="totalPages > 1 && currentPage !== 1"
    >
      1
    </button>
    <span v-if="totalPages > 2 && currentPage > 2" class="px-2 py-2 text-white"
      >...</span
    >
    <span class="px-4 py-2 text-white bg-gray-800 rounded">{{
      currentPage
    }}</span>
    <span
      v-if="totalPages > currentPage + 1 && currentPage < totalPages - 1"
      class="px-2 py-2 text-white"
      >...</span
    >
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        { 'opacity-50': currentPage === totalPages },
      ]"
      v-if="totalPages > 1 && currentPage !== totalPages"
    >
      {{ totalPages }}
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || disabled"
      :class="[
        'px-4 py-2 bg-gray-700 text-white rounded',
        { 'opacity-50': currentPage === totalPages },
      ]"
      v-if="totalPages > 1 && currentPage !== totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "goToPage", page: number): void;
  (e: "nextPage"): void;
  (e: "prevPage"): void;
}>();

const goToPage = (page: number) => emit("goToPage", page);
const nextPage = () => emit("nextPage");
const prevPage = () => emit("prevPage");

interface Page {
  index?: number;
  isEllipsis: boolean;
}

const visiblePages = computed(() => {
  const maxPagesToShow = 5;
  const pagesArray: Page[] = [];
  const total = props.totalPages;

  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pagesArray.push({ index: i, isEllipsis: false });
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pagesArray.push({ index: i, isEllipsis: false });
      }
      pagesArray.push({ isEllipsis: true });
      pagesArray.push({ index: total, isEllipsis: false });
    } else if (props.currentPage >= total - 2) {
      pagesArray.push({ index: 1, isEllipsis: false });
      pagesArray.push({ isEllipsis: true });
      for (let i = total - 3; i <= total; i++) {
        pagesArray.push({ index: i, isEllipsis: false });
      }
    } else {
      pagesArray.push({ index: 1, isEllipsis: false });
      pagesArray.push({ isEllipsis: true });
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pagesArray.push({ index: i, isEllipsis: false });
      }
      pagesArray.push({ isEllipsis: true });
      pagesArray.push({ index: total, isEllipsis: false });
    }
  }
  return pagesArray;
});
</script>
