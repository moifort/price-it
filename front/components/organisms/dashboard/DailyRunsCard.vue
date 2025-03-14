<script setup lang="ts">
import { Target } from 'lucide-vue-next'
import Counter from '../../../components/atoms/Counter.vue'

defineProps<{ current: number; total: number }>()
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
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
