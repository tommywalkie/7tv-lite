<template>
  <div class="max-w-4xl mx-auto p-4 mt-8">
    <div v-if="isFetching" class="animate-pulse">
      <div class="bg-gray-200 dark:bg-secondary-400 h-64 w-64 mx-auto rounded-lg mb-4"></div>
      <div class="bg-gray-200 dark:bg-secondary-400 h-8 w-48 mx-auto rounded mb-2"></div>
      <div class="bg-gray-200 dark:bg-secondary-400 h-6 w-32 mx-auto rounded"></div>
    </div>

    <div v-else-if="emote" class="text-center">
      <div
        class="flex justify-center gap-4 sm:gap-12 mb-6 items-end"
        :class="{ 'flex-col sm:flex-row items-center': isLarge }"
      >
        <div v-for="(size, index) in ['1x', '2x', '3x', '4x']" :key="size" class="text-center flex flex-col">
          <img
            :src="`https://cdn.7tv.app/emote/${emote.id}/${size}.webp`"
            :alt="`${emote.name} ${size}`"
            class="mb-2 mx-auto"
            :class="{
              'max-h-8': size === '1x',
              'max-h-16': size === '2x',
              'max-h-24': size === '3x',
              'max-h-32': size === '4x',
            }"
          />
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ emote.host.files[index].height }} x {{ emote.host.files[index].width }}
          </span>
          <span class="text-xs text-gray-400 dark:text-gray-600">{{ size }}</span>
        </div>
      </div>

      <h1 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 inline-flex items-center gap-2">
        {{ emote.name }}
        <template v-if="isZeroWidth">
          <ZeroWidthIcon />
        </template>
      </h1>

      <div class="mb-4 text-gray-600 dark:text-gray-400">
        by
        <a :href="`/user?id=${emote.owner.id}`"
          ><span class="font-medium">{{ emote.owner.display_name }}</span></a
        >
      </div>

      <a :href="`https://7tv.app/emotes/${emote.id}`" target="_blank">
        <Button>View on 7TV</Button>
      </a>
    </div>

    <div v-else class="text-center text-gray-600 dark:text-gray-400">Emote not found</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import Button from '../components/Button.vue'
import { Emote } from 'src/graphql/schema.gql'
import GET_EMOTE_QUERY from '../hooks/queries/GetEmote'
import ZeroWidthIcon from '../components/ZeroWidthIcon.vue'
const route = useRoute()
const emoteId = computed(() => route.query.id as string)

const { data: emote, isFetching } = useQuery<Emote>({
  queryKey: ['emote', emoteId],
  queryFn: async () => {
    if (!emoteId.value) return null

    const response = await fetch('https://7tv.io/v3/gql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_EMOTE_QUERY,
        variables: {
          id: emoteId.value,
        },
      }),
    })

    const { data } = await response.json()
    return data.emote
  },
  enabled: !!emoteId.value,
})

const isZeroWidth = computed(() => typeof emote.value?.flags === 'number' && emote.value.flags === 256)
const isLarge = computed(() => (emote.value?.host.files?.[3]?.width || 0) > 250)

useHead({
  title: computed(() => `${emote.value?.name || 'Emote'} - 7TV Lite`),
})
</script>
