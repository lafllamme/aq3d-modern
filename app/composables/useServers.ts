import type { ServerInfo, ServerWithMetrics } from '~/types/server'

export const useServers = () => {
  const { data, pending, error, refresh } = useFetch<ServerInfo[]>('/api/servers', {
    key: 'servers',
    server: true,
    default: () => [],
    transform: (servers) => servers?.map((s) => {
      const maxUsers = s.MaxUsers ?? 0
      const current = s.UserCount ?? s.Connections ?? 0
      const occupancy = maxUsers > 0 ? Math.min(1, current / maxUsers) : 0
      const isOnline = (s.State ?? true) && (s.Status ?? 1) === 1
      const updatedAt = s.LastUpdated ? new Date(s.LastUpdated) : undefined
      const withMetrics: ServerWithMetrics = { ...s, occupancy, isOnline, updatedAt }
      return withMetrics
    }) ?? [],
  })

  const servers = computed(() => data.value ?? [])
  const totalOnline = computed(() => servers.value.reduce((sum, s) => sum + (s.UserCount ?? s.Connections ?? 0), 0))
  const capacity = computed(() => servers.value.reduce((sum, s) => sum + (s.MaxUsers ?? 0), 0))
  const byRegion = computed(() =>
    servers.value.reduce<Record<string, number>>((acc, s) => {
      const key = s.Region ?? 'Unknown'
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  )

  return { servers, isLoading: pending, isError: error, totalOnline, capacity, byRegion, refresh }
}


