<script setup lang="ts">
import { openLink } from '@telegram-apps/sdk'
import { ExternalLink } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import { CardTitle } from '~/components/atoms/card'
import type { Amount, Url } from '../../../../back/src/utils/types'

defineProps<{ close: () => void; price: Amount; productLink: Url }>()
const isOpen = ref(true)
const openProductLink = (url: Url) => {
  if (openLink.isAvailable()) {
    openLink(url, { tryInstantView: true })
  } else {
    window.open(url, 'blank_')
  }
}
</script>

<template>
  <AlertDialog :open="isOpen" >
    <AlertDialogContent class="rounded-xl">
        <AlertDialogHeader class="justify-center items-center mt-4">
          <slot name="icon" />

          <CardTitle class="text-4xl font-bold mb-4 mt-2">
            <slot name="title" />
          </CardTitle>
          <p class="text-2xl mb-2">The price was <span class="font-bold">${{ price.toFixed(2) }}</span></p>
        </AlertDialogHeader>

        <AlertDialogFooter class="gap-3 flex-col">
          <Button
              variant="outline"
              class="w-full py-6 text-lg"
              @click="() => openProductLink(productLink)"
          >
            <ExternalLink class="w-5 h-5" />
            See Product
          </Button>

          <Button
              variant="default"
              class="w-full py-6 text-lg"
              @click="() => {
                isOpen = false
                close()
              }"
          >
            Next Product
          </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
