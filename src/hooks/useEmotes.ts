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

type Category = 'NEW' | 'TOP' | 'TRENDING_DAY'

const DEFAULT_LIMIT = 20
const DEFAULT_CATEGORY: Category = 'NEW'

export function useEmotes() {
  const route = useRoute()
  const router = useRouter()

  const currentPage = ref(parseInt(route.query.page as string) || 1)
  const totalPages = ref(1)
  const searchQuery = ref(Array.isArray(route.query.query) ? route.query.query[0] || '' : route.query.query || '')
  const debouncedSearchQuery = ref(searchQuery.value)
  const isExactSearch = ref(false)
  const category = ref<Category>((route.query.category as Category) || DEFAULT_CATEGORY)
  const zeroWidth = ref(false)
  const animated = ref(false)
  const ignoreTags = ref(false)
  const limit = ref<number>(Number(route.query.limit) || DEFAULT_LIMIT)

  const {
    data: emotes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      'emotes',
      currentPage,
      debouncedSearchQuery,
      isExactSearch,
      category,
      zeroWidth,
      animated,
      ignoreTags,
      limit,
    ],
    queryFn: async ({ queryKey }) => {
      const [_key, page, search, exact_match, category, zeroWidth, animated, ignoreTags, limit] = queryKey
      const filter = {
        ...(category && { category }),
        exact_match,
        ignore_tags: ignoreTags,
        zero_width: zeroWidth,
        animated: animated,
        aspect_ratio: '',
      }
      if (Number.isNaN(limit) || Number(limit) % 1 !== 0) {
        return []
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
            limit: Number(limit),
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

  watch(limit, (newLimit) => {
    if (Number.isNaN(newLimit) || Number(newLimit) % 1 !== 0) {
      return
    }
    if (Number(newLimit) !== DEFAULT_LIMIT) {
      router.replace({ query: { ...route.query, limit: newLimit.toString() } })
    } else {
      const newQuery = { ...route.query }
      delete newQuery.limit
      router.replace({ query: newQuery })
    }
  })

  watch(category, (newCategory) => {
    router.replace({ query: { ...route.query, category: newCategory } })
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
    limit,
    goToPage,
    nextPage,
    prevPage,
  }
}
