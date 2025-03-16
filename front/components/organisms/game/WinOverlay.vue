<template>
  <Overlay
    :icon="winIcon"
    :title="winTitle"
    :description="winDescription"
    :actions="winActions"
  />
</template>

<script setup lang="ts">
import { ExternalLink, Trophy } from 'lucide-vue-next'
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

const winIcon = computed(() => h(Trophy, { class: 'text-green-500 w-10 h-10' }))

const winTitle = computed(() => h('div', { class: 'text-green-500' }, 'Correct!'))

const winDescription = computed(() => 
  h('p', {}, [
    'The price was ',
    h('span', { class: 'font-bold' }, `$${props.price.toFixed(2)}`)
  ])
)

const winActions = computed(() => 
  h('div', { class: 'flex flex-col gap-3 w-full' }, [
    h(Button, {
      variant: 'outline',
      size: 'lg',
      class: 'w-full border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 flex items-center justify-center gap-2',
      onClick: () => openExternalUrl(props.productUrl)
    }, [
      h(ExternalLink, { class: 'w-4 h-4' }),
      'See Product'
    ]),
    h(Button, {
      variant: 'default',
      size: 'lg',
      class: 'w-full',
      onClick: props.onNext
    }, [
      props.isLastRun ? 'Finish Game' : 'Next Product'
    ])
  ])
)
</script> 