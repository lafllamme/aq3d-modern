<template>
  <div class="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">AQ3D Server Status</h1>
        <p class="text-white/70 text-sm">Live server list with fancy visuals</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn-primary" @click="refresh()" :disabled="isLoading">Refresh</button>
      </div>
    </header>

    <section>
      <ServerCharts :total-online="totalOnline" :capacity="capacity" :by-region="byRegion" :avg-occupancy="avgOccupancy" />
    </section>

    <ServerTable :servers="servers" :is-loading="isLoading" :is-error="isError" :refresh="refresh" />
  </div>
  
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'AQ3D Server Status',
})

const { servers, isLoading, isError, totalOnline, capacity, byRegion, refresh } = useServers()
const avgOccupancy = computed(() => {
  if (!servers.value.length) return 0
  return servers.value.reduce((sum, s) => sum + s.occupancy, 0) / servers.value.length
})
</script>


