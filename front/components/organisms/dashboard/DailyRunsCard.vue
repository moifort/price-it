<script setup lang="ts">
import { Target, TimerReset } from 'lucide-vue-next'

defineProps<{ current: number; total: number; renewAt: Date }>()
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <div class="flex flex-col items-center gap-2">
        <Target class="w-8 h-8 text-blue-500" />
        <h3 class="text-lg font-semibold">Daily Runs</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-primary"><Counter :value="current" /></span>
          <span class="text-sm text-muted-foreground">/{{total}}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-muted-foreground">
          <TimerReset class="w-3 h-3" />
          <span>{{ $dayjs(renewAt).fromNow(true) }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
