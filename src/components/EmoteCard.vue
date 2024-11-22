<template>
  <a :href="`https://7tv.app/emotes/${emote.id}`" target="_blank">
    <div
      :key="emote.id"
      class="flex flex-col items-center bg-gray-800 rounded-lg m-auto h-35 justify-center p-3 hover:bg-gray-700 focus:bg-gray-800 transition-colors duration-100"
    >
      <div class="max-w-full my-auto">
        <img
          :src="`https://cdn.7tv.app/emote/${emote.id}/2x.webp`"
          :alt="emote.name"
          class="max-w-20 max-h-20 object-cover rounded-md pt-2"
        />
      </div>
      <div class="mt-2 text-center max-w-full mt-auto">
        <p class="text-white text-sm truncate max-w-full">{{ emote.name }}</p>
        <p class="text-gray-400 text-xs truncate max-w-full">
          {{ emote.owner.username }}
        </p>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
interface Emote {
  id: string;
  name: string;
  state: string;
  trending: number;
  owner: {
    id: string;
    username: string;
    display_name: string;
    style: {
      color: string;
      paint_id: string;
    };
  };
  flags: number;
  host: {
    url: string;
    files: {
      name: string;
      format: string;
      width: number;
      height: number;
    }[];
  };
}

defineProps<{ emote: Emote }>();
</script>
