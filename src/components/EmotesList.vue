<template>
  <div>
    <div class="p-4">
      <div
        class="w-full max-w-full w-full xs:w-full sm:w-full md:w-full lg:w-3xl xl:w-3xl mx-auto"
      >
        <div class="flex items-center space-x-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search emotes..."
            class="w-full p-2 mb-2 border border-gray-700 focus:outline-none rounded bg-gray-800"
          />
          <select
            v-model="sortOption"
            class="ml-4 p-2 border border-gray-500 rounded mb-auto bg-gray-700"
          >
            <option value="created_at">New</option>
            <option value="popularity">Top</option>
          </select>
        </div>
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="isExactSearch"
            class="form-checkbox"
          />
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
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import debounce from "lodash.debounce";
import EmoteSkeleton from "./EmoteSkeleton.vue";
import EmoteCard from "./EmoteCard.vue";
import Pagination from "./Pagination.vue";

const SEARCH_EMOTES_QUERY = `
  query SearchEmotes($query: String!, $page: Int, $limit: Int, $filter: EmoteSearchFilter) {
    emotes(query: $query, page: $page, limit: $limit, filter: $filter) {
      count
      max_page
      items {
        id
        name
        state
        trending
        owner {
          id
          username
          display_name
          style {
            color
            paint_id
          }
        }
        flags
        host {
          url
          files {
            name
            format
            width
            height
          }
        }
      }
    }
  }
`;

const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("");
const debouncedSearchQuery = ref("");
const isExactSearch = ref(false);
const sortOption = ref("created_at");

const {
  data: emotes,
  refetch,
  isFetching,
} = useQuery({
  queryKey: [
    "emotes",
    currentPage,
    debouncedSearchQuery,
    isExactSearch,
    sortOption,
  ],
  queryFn: async ({ queryKey }) => {
    const [_key, page, search, exact_match, sortValue] = queryKey;
    const category =
      sortValue === "popularity"
        ? "TOP"
        : sortValue === "created_at"
        ? "NEW"
        : undefined;
    const filter = {
      ...(category && { category }),
      exact_match,
      ignore_tags: false,
      zero_width: false,
      animated: false,
      aspect_ratio: "",
    };
    const response = await fetch("https://7tv.io/v3/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SEARCH_EMOTES_QUERY,
        variables: {
          query: search,
          page,
          limit: 20,
          filter,
        },
      }),
    });

    const { data } = await response.json();
    totalPages.value = data.emotes.max_page;
    return data.emotes.items;
  },
});

const updateDebouncedQuery = debounce((newQuery: string) => {
  debouncedSearchQuery.value = newQuery;
  currentPage.value = 1;
  refetch();
}, 300);

watch(searchQuery, (newQuery) => {
  updateDebouncedQuery(newQuery);
});

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    refetch();
  }
};

const nextPage = () => goToPage(currentPage.value + 1);
const prevPage = () => goToPage(currentPage.value - 1);
</script>
