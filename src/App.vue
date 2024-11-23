<template>
  <div class="p-4">
    <div class="flex flex-col items-center">
      <img src="/logo.svg" alt="7TV Lite" class="w-24 h-24 mb-5" />
      <h1 class="text-2xl font-bold text-center">7TV Lite</h1>
      <p class="text-center text-gray-400">
        Lightweight client for browsing the latest
        <a href="https://7tv.app/" target="_blank" rel="noopener noreferrer">7TV</a>
        emotes.
      </p>
    </div>
    <div>
      <EmotesList />
    </div>
    <div class="flex items-center mt-8 gap-2 justify-center">
      <p>
        <a href="https://github.com/tommywalkie/7tv-lite" target="_blank" rel="noopener noreferrer"
          ><img src="/github.svg" alt="Source" class="w-5 h-5 inline-block mr-1 align-sub" /> Source</a
        >
      </p>
      <span class="text-gray-400">✦</span>
      <p class="text-center text-gray-400">
        Made with ❤️ by
        <a href="https://github.com/tommywalkie" target="_blank" rel="noopener noreferrer">tommywalkie</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmotesList from './components/EmotesList.vue'
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
