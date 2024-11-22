<template>
  <div class="p-4">
    <div class="flex flex-col items-center">
      <img src="/logo.svg" alt="7TV Lite" class="w-24 h-24 mb-5" />
      <h1 class="text-2xl font-bold text-center">7TV Lite</h1>
      <p class="text-center text-gray-400">
        Lightweight client for browsing the latest 7TV emotes.
      </p>
    </div>
    <div>
      <EmotesList />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmotesList from "./components/EmotesList.vue";
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
