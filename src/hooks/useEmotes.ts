import { ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import debounce from 'lodash.debounce'
import { useRoute, useRouter } from 'vue-router'

const SEARCH_EMOTES_QUERY = `
    query SearchEmotes($query: String!, $page: Int, $limit: Int, $filter: EmoteSearchFilter) {
      emotes(query: $query, page: $page, limit: $limit, filter: $filter) {
        count
        max_page
        items {
          id
          name
          state
          trending
          owner {
            id
            username
            display_name
            style {
              color
              paint_id
            }
          }
          flags
          host {
            url
            files {
              name
              format
              width
              height
            }
          }
        }
      }
    }
  `

export function useEmotes() {
  const route = useRoute()
  const router = useRouter()

  const currentPage = ref(parseInt(route.query.page as string) || 1)
  const totalPages = ref(1)
  const searchQuery = ref(Array.isArray(route.query.query) ? route.query.query[0] || '' : route.query.query || '')
  const debouncedSearchQuery = ref(searchQuery.value)
  const isExactSearch = ref(false)
  const category = ref<'NEW' | 'TOP' | 'TRENDING_DAY'>('NEW')
  const zeroWidth = ref(false)
  const animated = ref(false)
  const ignoreTags = ref(false)

  const {
    data: emotes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['emotes', currentPage, debouncedSearchQuery, isExactSearch, category, zeroWidth, animated, ignoreTags],
    queryFn: async ({ queryKey }) => {
      const [_key, page, search, exact_match, category, zeroWidth, animated, ignoreTags] = queryKey
      const sortField = category === 'TRENDING_DAY' || category === 'TOP' ? 'popularity' : 'created_at'
      const filter = {
        ...(category && { category }),
        exact_match,
        ignore_tags: false,
        zero_width: zeroWidth,
        animated: animated,
        aspect_ratio: '',
      }
      const response = await fetch('https://7tv.io/v3/gql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: SEARCH_EMOTES_QUERY,
          variables: {
            query: search,
            page,
            limit: 20,
            filter,
          },
        }),
      })

      const { data } = await response.json()
      totalPages.value = data.emotes.max_page
      return data.emotes.items
    },
  })

  const updateDebouncedQuery = debounce((newQuery: string) => {
    debouncedSearchQuery.value = newQuery
    currentPage.value = 1
    refetch()
  }, 300)

  watch(searchQuery, (newQuery) => {
    updateDebouncedQuery(newQuery)
    router.replace({ query: { ...route.query, query: newQuery || undefined } })
  })

  watch(currentPage, (newPage) => {
    router.replace({ query: { ...route.query, page: newPage.toString() } })
  })

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page
      refetch()
    }
  }

  const nextPage = () => goToPage(currentPage.value + 1)
  const prevPage = () => goToPage(currentPage.value - 1)

  return {
    emotes,
    isFetching,
    currentPage,
    totalPages,
    searchQuery,
    isExactSearch,
    category,
    zeroWidth,
    animated,
    ignoreTags,
    goToPage,
    nextPage,
    prevPage,
  }
}
