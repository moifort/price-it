<template>
  <Overlay
    :icon="loseIcon"
    :title="loseTitle"
    :description="loseDescription"
    :actions="loseActions"
  />
</template>

<script setup lang="ts">
import { ExternalLink, X } from 'lucide-vue-next'
import { computed, h } from 'vue'
import { Button } from '~/components/atoms/button'
import Overlay from '~/components/molecules/Overlay.vue'
import { openExternalUrl } from '~/utils/telegram'
import type { Amount, Url } from '../../../../back/src/utils/types'

const props = defineProps<{
  price: Amount
  productUrl: Url
  onNext: () => void
  isLastRun: boolean
}>()

const loseIcon = computed(() => h(X, { class: 'text-red-500 w-10 h-10' }))

const loseTitle = computed(() => h('div', { class: 'text-red-500' }, 'Wrong!'))

const loseDescription = computed(() =>
  h('p', {}, ['The price was ', h('span', { class: 'font-bold' }, `$${props.price.toFixed(2)}`)]),
)

const loseActions = computed(() =>
  h('div', { class: 'flex flex-col gap-3 w-full' }, [
    h(
      Button,
      {
        variant: 'outline',
        size: 'lg',
        class:
          'w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-2',
        onClick: () => openExternalUrl(props.productUrl),
      },
      [h(ExternalLink, { class: 'w-4 h-4' }), 'See Product'],
    ),
    h(
      Button,
      {
        size: 'lg',
        class: 'w-full bg-primary hover:bg-primary/90',
        onClick: props.onNext,
      },
      [props.isLastRun ? 'Finish Game' : 'Next Product'],
    ),
  ]),
)
</script>
