<template>
  <EmotesList :showMinifiedHeader="showMinifiedHeader" />
</template>

<script setup lang="ts">
import EmotesList from 'src/components/EmotesList.vue'

defineProps<{
  showMinifiedHeader: boolean
}>()
</script>
