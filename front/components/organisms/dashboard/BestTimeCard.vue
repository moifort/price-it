<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import type { Seconde } from '../../../../back/src/utils/types'
import Counter from '../../../components/atoms/Counter.vue'

defineProps<{ time: Seconde }>()
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <div class="flex flex-col items-center gap-2">
        <Clock class="w-8 h-8 text-green-500" />
        <h3 class="text-lg font-semibold">Daily Runs</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-primary"><Counter :value="time" />s</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
