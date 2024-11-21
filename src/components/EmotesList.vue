<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

const GET_RECENT_EMOTES = `
  query GetRecentEmotes($page: Int!) {
    emotes(
      query: ""
      sort: { order: DESCENDING, value: "created_at" }
      limit: 20
      page: $page
    ) {
      count
      items {
        id
        name
        created_at
        animated
        listed
        owner {
          id
          username
        }
        host {
          url
        }
      }
    }
  }
`;

interface Emote {
  id: string;
  name: string;
  created_at: string;
  animated: boolean;
  listed: boolean;
  owner: {
    id: string;
    username: string;
  };
  host: {
    url: string;
  };
}

const currentPage = ref(1);
const totalPages = ref(1);

const queryClient = useQueryClient();

const {
  data: emotes,
  refetch,
  isFetching,
  isError,
} = useQuery({
  queryKey: ["emotes", currentPage],
  queryFn: async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const response = await fetch("https://7tv.io/v3/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_RECENT_EMOTES,
        variables: { page },
      }),
    });

    const { data } = await response.json();
    totalPages.value = Math.ceil(data.emotes.count / 20);
    return data.emotes.items;
  },
});

const refresh = () => {
  queryClient.invalidateQueries({ queryKey: ["emotes", currentPage] });
  refetch();
};

const pages = computed<(number | string)[]>(() => {
  const maxPagesToShow = 6;
  const pagesArray: (number | string)[] = [];
  const total = totalPages.value;

  if (total <= maxPagesToShow) {
    for (let i = 1; i <= total; i++) {
      pagesArray.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      pagesArray.push(1, 2, 3, 4, "...", total);
    } else if (currentPage.value >= total - 2) {
      pagesArray.push(1, "...", total - 3, total - 2, total - 1, total);
    } else {
      pagesArray.push(
        1,
        "...",
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        "...",
        total
      );
    }
  }
  return pagesArray;
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

<template>
  <div>
    <div class="grid grid-cols-5 gap-4 p-4">
      <template v-for="emote in emotes">
        <a :href="`https://7tv.app/emotes/${emote.id}`" target="_blank">
          <div
            :key="emote.id"
            class="flex flex-col items-center bg-gray-800 rounded-lg m-auto h-35 justify-center p-3"
          >
            <img
              :src="`https://cdn.7tv.app/emote/${emote.id}/2x.webp`"
              :alt="emote.name"
              class="max-w-20 max-h-20 object-cover rounded-md"
            />
            <div class="mt-2 text-center">
              <p class="text-white text-sm truncate">{{ emote.name }}</p>
              <p class="text-gray-400 text-xs truncate">
                {{ emote.owner.username }}
              </p>
            </div>
          </div>
        </a>
      </template>
    </div>
    <div class="flex justify-center mt-4 gap-2">
      <button
        @click="prevPage"
        class="px-4 py-2 bg-gray-700 text-white rounded"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <template v-for="(page, index) in pages">
        <button
          @click="
            page > 30 && index === pages.length - 1
              ? null
              : goToPage(page as number)
          "
          :class="[
            'px-4 py-2',
            {
              'bg-blue-500': page === currentPage,
              'bg-gray-700': page !== currentPage,
              'opacity-50': page > 30 && index === pages.length - 1,
              'cursor-not-allowed': page > 30 && index === pages.length - 1,
            },
          ]"
          class="text-white"
          v-if="typeof page === 'number'"
        >
          {{ page }}
        </button>
        <span v-else class="px-4 py-2 text-white">...</span>
      </template>
      <button
        @click="nextPage"
        class="px-4 py-2 bg-gray-700 text-white rounded"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
    <div class="flex justify-center mt-4">
      <button
        @click="refresh"
        class="px-4 py-2 bg-green-500 text-white rounded"
      >
        Refresh
      </button>
    </div>
  </div>
</template>
