import { useQuery } from '@tanstack/vue-query'
import { ref, computed, provide, inject, type InjectionKey } from 'vue'
import type { User, EmoteSet, Emote } from '../graphql/schema.gql'
import GET_USER_QUERY from './queries/GetUser'

// Create injection key for user state
export const UserKey = Symbol() as InjectionKey<ReturnType<typeof useUser>>

// Main hook that manages user state
export function useUser(userId: string) {
  const user = ref<User | null>(null)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch('https://7tv.io/v3/gql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_USER_QUERY,
          variables: {
            id: userId,
          },
        }),
      })

      const { data } = await response.json()
      user.value = data.user
      return data.user as User
    },
  })

  // Computed properties for sub-data
  const emoteSets = computed(() => data.value?.emote_sets ?? [])
  const ownedEmotes = computed(() => data.value?.owned_emotes ?? [])

  const userState = {
    user: data,
    emoteSets,
    ownedEmotes,
    isLoading,
    error,
    refetch,
  }

  // Provide the state
  provide(UserKey, userState)

  return userState
}

// Consumer hook for components that need user state
export function useUserStore() {
  const state = inject(UserKey)
  if (!state) {
    throw new Error('useUserStore must be used within a component that has called useUser')
  }
  return state
}

// Sub-hooks that use the injected state
export function useUserEmoteSets() {
  const { emoteSets, isLoading, error } = useUserStore()
  return {
    emoteSets,
    isLoading,
    error,
  }
}

export function useUserOwnedEmotes() {
  const { ownedEmotes, isLoading, error } = useUserStore()
  return {
    ownedEmotes,
    isLoading,
    error,
  }
}

// Type guards for type safety
export function isEmoteSet(item: unknown): item is EmoteSet {
  return typeof item === 'object' && item !== null && 'id' in item && 'name' in item && 'capacity' in item
}

export function isEmote(item: unknown): item is Emote {
  return (
    typeof item === 'object' && item !== null && 'id' in item && 'name' in item && 'flags' in item && 'host' in item
  )
}
