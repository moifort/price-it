<template>
  <Card
    :class="[
      'w-full transition-colors border-2',
      timer <= 3 ? 'border-red-500 animate-pulse' : timer <= 5 ? 'border-yellow-500' : 'border-primary/40'
    ]"
  >
    <div class="flex items-center justify-center p-6">
      <div class="flex items-center gap-3">
        <Clock :class="['w-6 h-6', timer <= 3 && 'text-red-500']" />
        <span
          :class="[
            'text-4xl font-bold tabular-nums',
            timer <= 3 ? 'text-red-500' : timer <= 5 ? 'text-yellow-500' : 'text-primary'
          ]"
        >
          {{ timer }}
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import { Card } from '~/components/atoms/card'
import type { Seconde } from '../../../../back/src/utils/index.type'

defineProps<{
  timer: Seconde
}>()
</script> 