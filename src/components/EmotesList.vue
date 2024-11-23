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
              class="absolute right-0 my-auto p-2 bg-transparent opacity-50 outline-none border-none"
              @click="searchQuery = ''"
            >
              &times;
            </button>
          </div>

          <select v-model="sortOption" class="ml-4 p-2 border border-gray-500 rounded mb-auto bg-gray-700">
            <option value="created_at">New</option>
            <option value="popularity">Top</option>
          </select>
        </div>
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="isExactSearch" class="form-checkbox" />
          <span class="text-sm text-gray-400">Exact Search</span>
        </label>
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
import { useEmotes } from '../hooks/useEmotes'
import EmoteSkeleton from './EmoteSkeleton.vue'
import EmoteCard from './EmoteCard.vue'
import Pagination from './Pagination.vue'

const {
  emotes,
  isFetching,
  currentPage,
  totalPages,
  searchQuery,
  isExactSearch,
  sortOption,
  goToPage,
  nextPage,
  prevPage,
} = useEmotes()
</script>
