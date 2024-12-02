<template>
  <div>
    <!-- User Header Section -->
    <div
      class="px-4 py-2 sticky bg-gray-100 dark:bg-secondary-500 z-10"
      :class="{ 'top-10': showMinifiedHeader, 'top-0': !showMinifiedHeader }"
    >
      <div class="w-full max-w-7xl mx-auto">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-20 bg-gray-200 dark:bg-secondary-400 rounded-lg"></div>
        </div>
        <div v-else-if="user" class="flex items-center space-x-4 py-3">
          <img :src="user.avatar_url" :alt="user.display_name" class="w-8 h-8 object-cover" />
          <div>
            <h1 class="text-2xl font-bold">{{ user.display_name }}</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Emote Sets Section -->
    <div class="p-4">
      <div class="w-full max-w-7xl mx-auto">
        <h2 class="text-xl font-bold mb-4 hidden">Emote Sets</h2>
        <div v-if="isLoading" class="animate-pulse hidden">
          <div v-for="n in 3" :key="`set-${n}`" class="h-12 bg-gray-200 dark:bg-secondary-400 rounded mb-2"></div>
        </div>
        <div v-else class="grid gap-4 mb-8 hidden">
          <div
            v-for="set in emoteSets"
            :key="set.id as any"
            class="p-4 bg-white dark:bg-secondary-400 rounded-lg shadow"
          >
            <div class="flex justify-between items-center">
              <h3 class="font-medium">{{ set.name }}</h3>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ set.emote_count }}/{{ set.capacity }} emotes
              </span>
            </div>
          </div>
        </div>

        <!-- Owned Emotes Section -->
        <div class="mb-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">
            <span>Owned Emotes</span>
            <span class="text-sm text-gray-400 dark:text-gray-400" v-if="totalOwnedEmotes > 0">
              ({{ totalOwnedEmotes }})
            </span>
          </h2>
          <div class="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Select
              v-model="limit"
              variant="sm"
              :options="[
                { value: '4', label: '4' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '40', label: '40' },
                { value: '60', label: '60' },
                { value: '80', label: '80' },
              ]"
            />
            <p>results&nbsp;per&nbsp;page</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          <EmoteSkeleton v-if="isLoading" v-for="n in 6" :key="n" />
          <EmoteCard v-else v-for="emote in ownedEmotes" :key="emote.id" :emote="emote" />
        </div>

        <Pagination
          :total-pages="totalPages"
          :current-page="ownedEmotesPage"
          @prev-page="ownedEmotesPage--"
          @next-page="ownedEmotesPage++"
          @go-to-page="ownedEmotesPage = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '../hooks/useGetUser'
import EmoteCard from '../components/EmoteCard.vue'
import EmoteSkeleton from '../components/EmoteSkeleton.vue'
import Select from '../components/Select.vue'
import Pagination from '../components/Pagination.vue'
const route = useRoute()
const userId = route.query.id as string
const limit = ref('20')
const ownedEmotesPage = ref(1)

// Initialize user data
const { user, isLoading } = useUser(userId)

const totalOwnedEmotes = computed(() => user.value?.owned_emotes?.length || 0)

// Get emote sets and owned emotes using sub-hooks
const emoteSets = computed(() => user.value?.emote_sets || [])
const ownedEmotes = computed(() =>
  (user.value?.owned_emotes || []).slice(
    (ownedEmotesPage.value - 1) * parseInt(limit.value),
    ownedEmotesPage.value * parseInt(limit.value),
  ),
)
const totalPages = computed(() => Math.ceil((user.value?.owned_emotes || []).length / parseInt(limit.value)))

defineProps<{
  showMinifiedHeader: boolean
}>()
</script>
