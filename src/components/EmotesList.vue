<template>
  <div>
    <div
      class="p-4 sticky bg-gray-200 dark:bg-secondary-500 z-10"
      :class="{ 'top-10': showMinifiedHeader, 'top-0': !showMinifiedHeader }"
    >
      <div class="w-full max-w-full w-full xs:w-full sm:w-xl md:w-2xl lg:w-3xl xl:w-3xl mx-auto">
        <div class="flex items-center space-x-2">
          <ClearableInput
            v-model="searchQuery"
            placeholder="Search emotes..."
            @clear="clearSearch"
            class="w-full mb-2"
          />

          <div class="ml-4 flex items-center space-x-2 mb-2">
            <Select
              v-model="category"
              :options="[
                { value: 'NEW', label: 'Latest' },
                { value: 'TOP', label: 'Top' },
                { value: 'TRENDING_DAY', label: 'Trending' },
              ]"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1 sm:gap-2 items-center md:flex md:flex-row px-2">
          <Checkbox v-model="isExactSearch">Exact&nbsp;Search</Checkbox>
          <Checkbox v-model="zeroWidth">Zero&nbsp;Width</Checkbox>
          <Checkbox v-model="animated">Animated&nbsp;Only</Checkbox>
          <Checkbox v-model="ignoreTags">Ignore&nbsp;Tags</Checkbox>
          <div class="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 py-1">
            <Select
              v-model="limit"
              variant="sm"
              :options="[
                { value: '6', label: '6' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '30', label: '30' },
                { value: '40', label: '40' },
                { value: '50', label: '50' },
              ]"
            />
            <p>results&nbsp;per&nbsp;page</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-10 gap-4 p-4 max-w-7xl mx-auto"
    >
      <EmoteSkeleton v-if="isFetching" v-for="n in Number(limit)" :key="n" />
      <EmoteCard v-else v-for="emote in emotes" :key="emote.id" :emote="emote" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmotesState } from '../hooks/useEmotes'
import EmoteSkeleton from './EmoteSkeleton.vue'
import EmoteCard from './EmoteCard.vue'
import Checkbox from './Checkbox.vue'
import Select from './Select.vue'
import ClearableInput from './ClearableInput.vue'

defineProps<{
  showMinifiedHeader: boolean
}>()

const {
  emotes,
  isFetching,
  searchQuery,
  isExactSearch,
  category,
  zeroWidth,
  animated,
  ignoreTags,
  limit,
  clearSearch,
} = useEmotesState()
</script>
