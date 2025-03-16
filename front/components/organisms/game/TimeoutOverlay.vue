<template>
  <Overlay
    :icon="timeoutIcon"
    :title="timeoutTitle"
    :description="timeoutDescription"
    :actions="timeoutActions"
  />
</template>

<script setup lang="ts">
import { Clock, ExternalLink } from 'lucide-vue-next'
import { computed, h } from 'vue'
import type { Amount, Url } from '../../../../back/src/utils/index.type'
import { Button } from '~/components/atoms/button'
import Overlay from '~/components/molecules/Overlay.vue'
import { openExternalUrl } from '~/utils/telegram'

const props = defineProps<{
  price: Amount
  productUrl: Url
  onNext: () => void
  isLastRun: boolean
}>()

const timeoutIcon = computed(() => h(Clock, { class: 'text-yellow-500 w-10 h-10' }))

const timeoutTitle = computed(() => h('div', { class: 'text-yellow-500' }, 'Time\'s Up!'))

const timeoutDescription = computed(() => 
  h('p', {}, [
    'The price was ',
    h('span', { class: 'font-bold' }, `$${props.price.toFixed(2)}`)
  ])
)

const timeoutActions = computed(() => 
  h('div', { class: 'flex flex-col gap-3 w-full' }, [
    h(Button, {
      variant: 'outline',
      size: 'lg',
      class: 'w-full border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 flex items-center justify-center gap-2',
      onClick: () => openExternalUrl(props.productUrl)
    }, [
      h(ExternalLink, { class: 'w-4 h-4' }),
      'See Product'
    ]),
    h(Button, {
      size: 'lg',
      class: 'w-full bg-primary hover:bg-primary/90',
      onClick: props.onNext
    }, [
      props.isLastRun ? 'Finish Game' : 'Next Product'
    ])
  ])
)
</script> 