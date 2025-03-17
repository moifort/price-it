<script setup lang="ts">
import { Timer } from 'lucide-vue-next'
import { Card } from '~/components/atoms/card'
import type { Seconde } from '../../../../back/src/utils/types'

defineProps<{ timer: Seconde }>()
defineEmits<{ timeout: () => void }>()
</script>

<template>
  <Card class="w-full transition-colors border-2 border-primary/40">
    <div class="flex items-center justify-center p-6">
      <div class="flex items-center gap-3">
        <Timer class="w-6 h-6" />
        <span
          class="text-4xl font-bold tabular-nums text-primary">
          <Counter :from="timer" :value="0" :duration="timer" @complete="$emit('timeout')" />
        </span>
      </div>
    </div>
  </Card>
</template>


