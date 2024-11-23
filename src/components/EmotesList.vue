<template>
  <div>
    <div class="p-4">
      <div class="w-full max-w-full w-full xs:w-full sm:w-full md:w-full lg:w-3xl xl:w-3xl mx-auto">
        <div class="flex items-center space-x-2">
          <div class="w-full relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search emotes..."
              class="w-full p-2 mb-2 border border-gray-700 focus:outline-none rounded bg-gray-800 pr-15"
            />
            <button
              class="absolute right-0 bottom-2 top-0 px-3 bg-transparent opacity-50 outline-none border-none"
              @click="clearSearch"
            >
              &times;
            </button>
          </div>

          <select v-model="category" class="ml-4 p-2 border border-gray-500 rounded mb-auto bg-gray-700">
            <option value="NEW">Latest</option>
            <option value="TOP">Top</option>
            <option value="TRENDING_DAY">Trending</option>
          </select>
        </div>
        <div class="grid grid-cols-2 items-center sm:space-x-2 sm:flex sm:flex-row">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="isExactSearch" class="form-checkbox" />
            <span class="text-sm text-gray-400">Exact Search</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="zeroWidth" class="form-checkbox" />
            <span class="text-sm text-gray-400">Zero Width</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="animated" class="form-checkbox" />
            <span class="text-sm text-gray-400">Animated</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="ignoreTags" class="form-checkbox" />
            <span class="text-sm text-gray-400">Ignore Tags</span>
          </label>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-10 gap-4 p-4"
    >
      <template v-if="isFetching">
        <EmoteSkeleton v-for="n in 20" :key="n" />
      </template>
      <template v-else v-for="emote in emotes" :key="emote.id">
        <EmoteCard :emote="emote" />
      </template>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @goToPage="goToPage"
      @nextPage="nextPage"
      @prevPage="prevPage"
      :disabled="isFetching"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmotes } from '../hooks/useEmotes'
import EmoteSkeleton from './EmoteSkeleton.vue'
import EmoteCard from './EmoteCard.vue'
import Pagination from './Pagination/Pagination.vue'

const route = useRoute()
const router = useRouter()

const {
  emotes,
  isFetching,
  currentPage,
  totalPages,
  searchQuery,
  isExactSearch,
  category,
  zeroWidth,
  animated,
  ignoreTags,
  goToPage,
  nextPage,
  prevPage,
} = useEmotes()

// Initialize searchQuery from URL
searchQuery.value = Array.isArray(route.query.query) ? route.query.query[0] || '' : route.query.query || ''

// Initialize page from URL
const pageFromUrl = route.query.page
currentPage.value = typeof pageFromUrl === 'string' ? parseInt(pageFromUrl) || 1 : 1

// Watch for changes in searchQuery and update the URL
watch(searchQuery, (newQuery) => {
  router.replace({ query: { ...route.query, query: newQuery || undefined } })
})

// Function to clear the search query
const clearSearch = () => {
  searchQuery.value = ''
}
</script>
