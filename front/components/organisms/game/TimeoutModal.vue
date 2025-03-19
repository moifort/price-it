<script setup lang="ts">
import { ClockAlert } from 'lucide-vue-next'
import Modal from '~/components/molecules/game/Modal.vue'
import type { Amount, Url } from '../../../../back/src/utils/types'

defineProps<{ price: Amount; productLink: Url }>()
defineEmits<(e: 'click:next') => void>()
</script>

<template>
  <Modal :price="price" :product-link="productLink" @click:next="$emit('click:next')">
    <template #icon>
      <ClockAlert class="h-12 w-12 text-yellow-500" />
    </template>

    <template #title>
      <div class="text-yellow-500">Time's Up!</div>
    </template>
  </Modal>
</template>
