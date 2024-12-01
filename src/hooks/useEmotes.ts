import { ref, watch, provide, inject, type InjectionKey } from 'vue'
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

const QUERY_PARAMS = {
  page: {
    key: 'page',
    default: 1,
    transform: (val: string) => parseInt(val) || 1,
  },
  limit: {
    key: 'limit',
    default: DEFAULT_LIMIT,
    transform: (val: string) => Number(val) || DEFAULT_LIMIT,
  },
  category: {
    key: 'category',
    default: DEFAULT_CATEGORY as Category,
    transform: (val: string) => (val as Category) || DEFAULT_CATEGORY,
  },
  query: {
    key: 'query',
    default: '',
    transform: (val: string | string[]) => (Array.isArray(val) ? val[0] || '' : val || ''),
  },
} as const

// Create a symbol for injection key
export const EmotesKey = Symbol() as InjectionKey<ReturnType<typeof useEmotes>>

export function useEmotes() {
  const route = useRoute()
  const router = useRouter()

  const currentPage = ref<number>(QUERY_PARAMS.page.default)
  const totalPages = ref<number>(1)
  const searchQuery = ref<string>(QUERY_PARAMS.query.default)
  const debouncedSearchQuery = ref<string>(searchQuery.value)
  const isExactSearch = ref(false)
  const category = ref<Category>(QUERY_PARAMS.category.default)
  const zeroWidth = ref(false)
  const animatedOnly = ref(false)
  const ignoreTags = ref(false)
  const limit = ref<number>(QUERY_PARAMS.limit.default)

  // Initialize state from URL once
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page as string) || 1
  }
  if (route.query.query) {
    searchQuery.value = Array.isArray(route.query.query) ? route.query.query[0] || '' : route.query.query || ''
  }

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
      animatedOnly,
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
  }, 300)

  const clearSearch = () => {
    searchQuery.value = ''
  }

  watch(searchQuery, (newQuery) => {
    updateDebouncedQuery(newQuery)
    updateQueryParams({ query: newQuery || undefined })
  })

  watch(currentPage, (newPage) => {
    updateQueryParams({ page: newPage.toString() })
  })

  watch(
    [category, limit, zeroWidth, animatedOnly, ignoreTags, isExactSearch],
    ([newCategory, newLimit, newZeroWidth, newAnimated, newIgnoreTags, newExact], [, oldLimit]) => {
      if (newLimit !== oldLimit) {
        currentPage.value = 1
      }
      updateQueryParams({
        category: newCategory,
        limit: newLimit === DEFAULT_LIMIT ? undefined : newLimit,
        zeroWidth: newZeroWidth || undefined,
        animated: newAnimated || undefined,
        ignoreTags: newIgnoreTags || undefined,
        exact: newExact || undefined,
      })
    },
  )

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page
      refetch()
    }
  }

  const nextPage = () => goToPage(currentPage.value + 1)
  const prevPage = () => goToPage(currentPage.value - 1)

  // Helper to update URL without multiple router.replace calls
  const updateQueryParams = (updates: Record<string, any>) => {
    const newQuery = { ...route.query }

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === QUERY_PARAMS[key as keyof typeof QUERY_PARAMS]?.default ||
        (key === 'limit' && Number(value) === DEFAULT_LIMIT)
      ) {
        // Convert to number for comparison
        delete newQuery[key]
      } else {
        newQuery[key] = value.toString()
      }
    })

    router.replace({ query: newQuery })
  }

  const emotesState = {
    emotes,
    isFetching,
    currentPage,
    totalPages,
    searchQuery,
    isExactSearch,
    category,
    zeroWidth,
    animated: animatedOnly,
    ignoreTags,
    limit,
    goToPage,
    nextPage,
    prevPage,
    clearSearch,
  }

  // Provide the state if it hasn't been provided yet
  provide(EmotesKey, emotesState)

  return emotesState
}

// Add a consumer hook
export function useEmotesState() {
  const state = inject(EmotesKey)
  if (!state) {
    throw new Error('useEmotesState must be used within a component that has called useEmotes')
  }
  return state
}
