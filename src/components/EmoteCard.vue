<template>
  <router-link :to="{ path: '/emote', query: { id: emote.id } }">
    <div
      :key="emote.id"
      :class="[
        'flex flex-col items-center bg-gray-200 dark:bg-secondary-400 hover:bg-gray-300 dark:hover:bg-secondary-200 rounded-lg m-auto h-35 justify-center p-3 relative',
        { 'border-2 border-yellow-500': isZeroWidth },
      ]"
    >
      <div class="max-w-full my-auto">
        <img
          :src="`https://cdn.7tv.app/emote/${emote.id}/2x.webp`"
          :alt="emote.name"
          class="max-w-20 max-h-20 object-cover rounded-md pt-2"
        />
      </div>
      <div class="mt-2 text-center max-w-full mt-auto">
        <p class="text-sm truncate max-w-full text-gray-800 dark:text-gray-400">{{ emote.name }}</p>
        <p class="text-xs truncate max-w-full text-gray-500 dark:text-gray-500">
          {{ emote.owner.username }}
        </p>
      </div>
      <div v-if="isZeroWidth" class="absolute top-2 -left-2">
        <ZeroWidthIcon />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Emote } from 'src/graphql/schema.gql'
import ZeroWidthIcon from './icons/ZeroWidthIcon.vue'

const props = defineProps<{ emote: Emote }>()

const isZeroWidth = computed(() => typeof props.emote?.flags === 'number' && props.emote.flags === 256)
</script>
