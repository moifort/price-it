<script setup lang="ts">
import { XCircle } from 'lucide-vue-next'
import type { Amount, Url } from '../../../../back/src/utils/types'
import GameResultModal from './GameResultModal.vue'

interface Props {
  productName: string
  realPrice: Amount
  productLink: Url
  isOpen: boolean
}

const props = defineProps<Props>()
defineEmits<(e: 'click:next') => void>()
</script>

<template>
  <GameResultModal
    title="Not Quite Right"
    :icon="XCircle"
    iconColor="text-destructive"
    :product-name="productName"
    :real-price="realPrice"
    :product-link="productLink"
    :is-open="isOpen"
    @click:next="$emit('click:next')"
  />
</template>
