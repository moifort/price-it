<script setup lang="ts">
import { ArrowDown, ArrowUp } from 'lucide-vue-next'
import ActionButton from '~/components/molecules/ActionButton.vue'
import { formatNumber } from '~/utils/utils'
import type { Amount } from '../../../../back/src/utils/types'

defineProps<{ isActive: boolean; displayPrice: Amount }>()
defineEmits<{
  (e: 'click:less'): void
  (e: 'click:exact'): void
  (e: 'click:more'): void
}>()
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <ActionButton
      :isActive="isActive"
      @click="isActive && $emit('click:less')"
    >
      <template #icon>
        <ArrowDown class="w-6 h-6 text-blue-500" />
      </template>
      <template #label>
        Less
      </template>
    </ActionButton>

    <ActionButton
      :isActive="isActive"
      @click="isActive &&  $emit('click:exact')"
    >
      <template #icon>
        <span class="font-bold text-lg">${{ formatNumber(displayPrice) }}</span>
      </template>
      <template #label>
        Exact
      </template>
    </ActionButton>

    <ActionButton
      :isActive="isActive"
      @click="isActive &&  $emit('click:more')"
    >
      <template #icon>
        <ArrowUp class="w-6 h-6 text-red-500" />
      </template>
      <template #label>
        Higher
      </template>
    </ActionButton>
  </div>
</template>

