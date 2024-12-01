<template>
  <div>
    <div
      class="px-4 py-2 sticky bg-gray-100 dark:bg-secondary-500 z-10"
      :class="{ 'top-10': showMinifiedHeader, 'top-0': !showMinifiedHeader }"
    >
      <div class="w-full max-w-full w-full xs:w-full sm:w-xl md:w-2xl lg:w-3xl xl:w-3xl mx-auto mb-2">
        <div class="flex items-center space-x-2">
          <ClearableInput v-model="searchQuery" placeholder="Search emotes..." @clear="clearSearch" class="w-full" />

          <div class="ml-4 flex items-center space-x-2">
            <Select
              v-model="category"
              :options="[
                { value: 'NEW', label: 'Latest' },
                { value: 'TOP', label: 'Top' },
                { value: 'TRENDING_DAY', label: 'Trending' },
              ]"
            />
          </div>

          <div class="relative">
            <Button
              @click="showFilters = !showFilters"
              class="text-sm flex items-center space-x-1 px-2"
              aria-label="Toggle filters panel"
              :aria-expanded="showFilters"
              aria-controls="filters-panel"
              aria-haspopup="true"
              role="button"
            >
              <svg
                fill="currentColor"
                class="w-4 h-4"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 210.68 210.68"
                xml:space="preserve"
              >
                <path
                  d="M205.613,30.693c0-10.405-10.746-18.149-32.854-23.676C154.659,2.492,130.716,0,105.34,0
              C79.965,0,56.021,2.492,37.921,7.017C15.813,12.544,5.066,20.288,5.066,30.693c0,3.85,1.476,7.335,4.45,10.479l68.245,82.777v79.23
              c0,2.595,1.341,5.005,3.546,6.373c1.207,0.749,2.578,1.127,3.954,1.127c1.138,0,2.278-0.259,3.331-0.78l40.075-19.863
              c2.55-1.264,4.165-3.863,4.169-6.71l0.077-59.372l68.254-82.787C204.139,38.024,205.613,34.542,205.613,30.693z M44.94,20.767
              C61.467,17.048,82.917,15,105.34,15s43.874,2.048,60.399,5.767c18.25,4.107,23.38,8.521,24.607,9.926
              c-1.228,1.405-6.357,5.819-24.607,9.926c-16.525,3.719-37.977,5.767-60.399,5.767S61.467,44.338,44.94,40.62
              c-18.249-4.107-23.38-8.521-24.607-9.926C21.56,29.288,26.691,24.874,44.94,20.767z M119.631,116.486
              c-1.105,1.341-1.711,3.023-1.713,4.761l-0.075,57.413l-25.081,12.432v-69.835c0-1.741-0.605-3.428-1.713-4.771L40.306,54.938
                            C58.1,59.1,81.058,61.387,105.34,61.387c24.283,0,47.24-2.287,65.034-6.449L119.631,116.486z"
                />
              </svg>
              <svg
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-180': showFilters }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
            <div class="absolute -top-2 -right-2" v-if="appliedFilters > 0">
              <span class="text-xs text-white rounded-full bg-primary-500 px-2 py-1">{{ appliedFilters }}</span>
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            id="filters-panel"
            class="overflow-hidden transition-all duration-200 ease-in-out"
            :class="{ 'max-h-0': !showFilters, 'max-h-40': showFilters }"
            role="region"
            aria-label="Search filters"
          >
            <div class="grid grid-cols-2 gap-1 sm:gap-2 items-center md:flex md:flex-row px-2 mt-3" v-if="showFilters">
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
              <Button @click="resetFilters" customClass="text-sm px-3 py-1 w-max">Reset</Button>
            </div>
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

    <div class="flex justify-center mb-8">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @goToPage="goToPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
        :disabled="isFetching"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEmotesStore } from '../hooks/useGetEmotes'
import EmoteSkeleton from './EmoteSkeleton.vue'
import EmoteCard from './EmoteCard.vue'
import Checkbox from './Checkbox.vue'
import Select from './Select.vue'
import ClearableInput from './ClearableInput.vue'
import Button from './Button.vue'
import Pagination from './Pagination.vue'
defineProps<{
  showMinifiedHeader: boolean
}>()

const showFilters = ref(false)

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
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
} = useEmotesStore()

const appliedFilters = ref(0)

watch([isExactSearch, zeroWidth, animated, ignoreTags, limit], () => {
  appliedFilters.value = 0
  if (isExactSearch.value) appliedFilters.value++
  if (zeroWidth.value) appliedFilters.value++
  if (animated.value) appliedFilters.value++
  if (ignoreTags.value) appliedFilters.value++
  if (limit.value !== 20) appliedFilters.value++
})

function resetFilters() {
  isExactSearch.value = false
  zeroWidth.value = false
  animated.value = false
  ignoreTags.value = false
  limit.value = 20
}
</script>
