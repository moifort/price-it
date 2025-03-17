<script setup lang="ts">
import { Clock, ShoppingCart, Zap } from 'lucide-vue-next'
import { Badge } from '~/components/atoms/badge'
import { Run } from '../../../../back/src/run/validators'
import type { Seconde } from '../../../../back/src/utils/types'

defineProps<{ time: Seconde; bonus: Seconde }>()
defineEmits<{ 'click:buy': () => void }>()
</script>

<template>
  <Card class="relative overflow-visible">
    <div class="absolute -top-4 -right-3 z-10">
      <Badge class="flex items-center gap-1 shadow-lg animate-pulse bg-yellow-400 text-black border-0 px-3 py-1.5 rounded-full"
             @click="$emit('click:buy')">
        <Zap class="w-4 h-4"  />
        <span class="text-sm">+{{ bonus }}s</span>
        <div class="h-4 w-px bg-border/70 mx-1" />
        <ShoppingCart class="w-4 h-4" />
        <span class="text-sm">Buy</span>
      </Badge>
    </div>
    <CardContent class="pt-6">
      <div class="flex flex-col items-center gap-2">
        <Clock class="w-8 h-8 text-green-500" />
        <h3 class="text-lg font-semibold">Time limit</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-primary"><Counter :value="time" />s</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
