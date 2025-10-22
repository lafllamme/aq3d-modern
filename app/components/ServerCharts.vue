<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="card glass-border p-4 animate-zoom-in animate-duration-700">
      <h3 class="text-sm font-semibold mb-3">Online vs Capacity</h3>
      <div class="flex items-end gap-3 h-40">
        <div class="flex-1 flex flex-col-reverse items-center">
          <div class="w-10 rounded-t bg-brand-500 transition-all duration-700" :style="{ height: onlineHeight }"></div>
          <span class="text-xs mt-2">Online</span>
        </div>
        <div class="flex-1 flex flex-col-reverse items-center">
          <div class="w-10 rounded-t bg-white/30 transition-all duration-700" :style="{ height: capacityHeight }"></div>
          <span class="text-xs mt-2">Capacity</span>
        </div>
      </div>
    </div>
    <div class="card glass-border p-4 animate-zoom-in animate-duration-700">
      <h3 class="text-sm font-semibold mb-3">Servers by Region</h3>
      <div class="flex gap-2 items-end h-40">
        <div v-for="(count, region) in byRegion" :key="region" class="flex-1 flex flex-col-reverse items-center">
          <div class="w-8 rounded-t bg-brand-400 transition-all duration-700" :style="{ height: Math.min(100, count * 20) + '%' }"></div>
          <span class="text-xs mt-2">{{ region }}</span>
        </div>
      </div>
    </div>
    <div class="card glass-border p-4 animate-zoom-in animate-duration-700">
      <h3 class="text-sm font-semibold mb-3">Average Load</h3>
      <div class="relative h-40 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-white/5"></div>
        <div class="relative w-28 h-28 rounded-full border-8 border-white/10">
          <div class="absolute inset-0 rounded-full border-8 border-brand-500" :style="ringStyle"></div>
          <div class="absolute inset-0 flex items-center justify-center text-xl font-semibold">{{ avgLoadPct }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ totalOnline: number; capacity: number; byRegion: Record<string, number>; avgOccupancy: number }>()

const pct = (n: number) => Math.max(0, Math.min(1, n))
const onlineHeight = computed(() => `${pct(props.capacity ? props.totalOnline / props.capacity : 0) * 100}%`)
const capacityHeight = computed(() => '100%')

const avgLoadPct = computed(() => `${Math.round(pct(props.avgOccupancy) * 100)}%`)
const ringStyle = computed(() => ({
  clipPath: `inset(${100 - Math.round(pct(props.avgOccupancy) * 100)}% 0 0 0)`,
}))
</script>


