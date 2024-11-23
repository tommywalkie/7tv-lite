import { ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import debounce from 'lodash.debounce'

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
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref('')
  const debouncedSearchQuery = ref('')
  const isExactSearch = ref(false)
  const sortOption = ref('created_at')

  const {
    data: emotes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['emotes', currentPage, debouncedSearchQuery, isExactSearch, sortOption],
    queryFn: async ({ queryKey }) => {
      const [_key, page, search, exact_match, sortValue] = queryKey
      const category = sortValue === 'popularity' ? 'TOP' : sortValue === 'created_at' ? 'NEW' : undefined
      const filter = {
        ...(category && { category }),
        exact_match,
        ignore_tags: false,
        zero_width: false,
        animated: false,
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
    sortOption,
    goToPage,
    nextPage,
    prevPage,
  }
}
