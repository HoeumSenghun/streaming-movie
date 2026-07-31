import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function sanitizeItems (raw) {
  if (!Array.isArray(raw)) return []
  return raw.filter(
    item =>
      item &&
      Number.isFinite(Number(item.id)) &&
      (item.mediaType === 'movie' || item.mediaType === 'tv')
  ).map(item => ({
    id: Number(item.id),
    mediaType: item.mediaType,
    title: typeof item.title === 'string' ? item.title : '',
    posterPath: item.posterPath ?? null,
    addedAt: Number.isFinite(Number(item.addedAt)) ? Number(item.addedAt) : Date.now()
  }))
}

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      setHasHydrated (value) {
        set({ _hasHydrated: Boolean(value) })
      },

      toggle (item) {
        if (!get()._hasHydrated) return get().has(item.id, item.mediaType)

        const { id, mediaType, title, posterPath } = item
        const exists = get().items.some(
          i => i.id === id && i.mediaType === mediaType
        )
        if (exists) {
          set({
            items: get().items.filter(
              i => !(i.id === id && i.mediaType === mediaType)
            )
          })
          return false
        }
        set({
          items: [
            ...get().items,
            {
              id,
              mediaType,
              title: title ?? '',
              posterPath: posterPath ?? null,
              addedAt: Date.now()
            }
          ]
        })
        return true
      },

      remove (id, mediaType) {
        if (!get()._hasHydrated) return
        set({
          items: get().items.filter(
            i => !(i.id === id && i.mediaType === mediaType)
          )
        })
      },

      has (id, mediaType) {
        return get().items.some(
          i => i.id === id && i.mediaType === mediaType
        )
      }
    }),
    {
      name: 'merlmovie24-watchlist-v1',
      version: 1,
      partialize: state => ({ items: state.items }),
      migrate: persisted => ({
        items: sanitizeItems(persisted?.items)
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true)
      }
    }
  )
)
