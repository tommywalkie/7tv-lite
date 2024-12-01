<template>
  <EmotesList :showMinifiedHeader="showMinifiedHeader" />
</template>

<script setup lang="ts">
import EmotesList from 'src/components/EmotesList.vue'
import { useHead } from '@unhead/vue'
import { useEmotes } from 'src/hooks/useGetEmotes'
import { computed, onMounted } from 'vue'

const { category, refetch } = useEmotes()

useHead({
  title: computed(() => {
    const categoryTitle =
      category.value === 'NEW'
        ? 'Latest Emotes'
        : category.value === 'TOP'
          ? 'Most Popular Emotes'
          : category.value === 'TRENDING_DAY'
            ? 'Trending Emotes'
            : 'Emotes'
    return `${categoryTitle} - 7TV Lite`
  }),
})

onMounted(() => {
  refetch()
})

defineProps<{
  showMinifiedHeader: boolean
}>()
</script>
