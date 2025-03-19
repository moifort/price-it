<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import GameResultModal from './GameResultModal.vue'
import type { Amount, Url } from '../../../../back/src/utils/types'

interface Props {
  productName: string
  realPrice: Amount
  productLink: Url
  isOpen: boolean
}

const props = defineProps<Props>()
defineEmits<{
  (e: 'click:next'): void
}>()
</script>

<template>
  <GameResultModal
    title="Congratulations!"
    :icon="Trophy"
    iconColor="text-yellow-500"
    :product-name="productName"
    :real-price="realPrice"
    :product-link="productLink"
    :is-open="isOpen"
    @click:next="$emit('click:next')"
  />
</template> 