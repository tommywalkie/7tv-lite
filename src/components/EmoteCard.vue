<template>
  <a :href="`https://7tv.app/emotes/${emote.id}`" target="_blank">
    <div
      :key="emote.id"
      :class="[
        'flex flex-col items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-800 dark:focus:bg-gray-700 rounded-lg m-auto h-35 justify-center p-3 transition-colors duration-100 relative',
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
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fass"
          data-icon="object-group"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="w-5 h-5"
        >
          <path
            class="fill-yellow-500"
            d="M0 128V64 0H64h64V32H448V0h64 64V64v64H544V384h32v64 64H512 448V480H128v32H64 0V448 384H32V128H0zM96 416H480V96H96V416zm32-288H320V288H128V128zM256 320h64 32V288 224h96V384H256V320z"
          ></path>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Emote {
  id: string
  name: string
  state: string
  trending: number
  owner: {
    id: string
    username: string
    display_name: string
    style: {
      color: string
      paint_id: string
    }
  }
  flags: number
  host: {
    url: string
    files: {
      name: string
      format: string
      width: number
      height: number
    }[]
  }
}

const props = defineProps<{ emote: Emote }>()

const isZeroWidth = computed(() => typeof props.emote?.flags === 'number' && props.emote.flags === 256)
</script>
