<template>
  <div class="card glass-border overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <h2 class="text-lg font-semibold">Servers</h2>
      <div class="flex items-center gap-2">
        <button class="btn-primary" @click="refresh()" :disabled="isLoading">Refresh</button>
      </div>
    </div>

    <div v-if="isError" class="p-4 text-danger">Failed to load servers.</div>

    <div class="overflow-auto animate-fade-in animate-duration-700">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left bg-white/5">
            <th class="px-4 py-2 font-medium">Name</th>
            <th class="px-4 py-2 font-medium">Region</th>
            <th class="px-4 py-2 font-medium">Users</th>
            <th class="px-4 py-2 font-medium">Status</th>
            <th class="px-4 py-2 font-medium">Load</th>
            <th class="px-4 py-2 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sortedServers" :key="s.ID" class="border-t border-white/5 hover:bg-white/5 transition-colors">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <span :class="['i-heroicons-server-bolt-solid text-xl', s.isOnline ? 'text-success' : 'text-danger']" />
                <div class="flex flex-col">
                  <span class="font-medium">{{ s.Name }}</span>
                  <span class="text-xs text-white/60">{{ s.HostName }}:{{ s.Port }}</span>
                </div>
              </div>
            </td>
            <td class="px-4 py-3">
              <span class="pill bg-white/5">{{ s.Region || 'Unknown' }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="tabular-nums">
                {{ (s.UserCount ?? s.Connections ?? 0).toLocaleString() }}
                <span class="text-white/50">/</span>
                {{ (s.MaxUsers ?? 0).toLocaleString() }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span :class="['pill', s.isOnline ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger']">
                {{ s.isOnline ? 'Online' : 'Offline' }}
              </span>
            </td>
            <td class="px-4 py-3 w-56">
              <div class="h-2 rounded bg-white/10 overflow-hidden">
                <div class="h-full bg-brand-500 transition-all duration-700" :style="{ width: (s.occupancy * 100).toFixed(0) + '%' }" />
              </div>
            </td>
            <td class="px-4 py-3 text-white/70">
              <span v-if="s.updatedAt" :title="s.updatedAt.toLocaleString()">{{ timeAgo(s.updatedAt) }}</span>
              <span v-else>—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isLoading" class="p-4 text-white/70">Loading…</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ servers: any[]; isLoading?: boolean; isError?: any; refresh: () => void }>()

const sortedServers = computed(() => {
  return [...props.servers].sort((a, b) => (a.SortIndex ?? 0) - (b.SortIndex ?? 0))
})

const timeAgo = (d: Date) => {
  const diff = Date.now() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
</script>


