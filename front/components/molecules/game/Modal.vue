<script setup lang="ts">
import { openLink } from '@telegram-apps/sdk'
import { ExternalLink } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import { CardTitle } from '~/components/atoms/card'
import { formatNumber } from '~/utils/utils'
import type { Amount, Url } from '../../../../back/src/utils/types'

defineProps<{ close?: () => void; price: Amount; productLink: Url }>()
const isOpen = ref(true)

const openProductLink = (url: Url) => {
  if (openLink.isAvailable()) {
    // openLink(url, { tryInstantView: false })
    window.open(url)
  } else {
    window.open(url, '_blank')
  }
}

const openWithWindowOpen = (url: Url) => {
  window.open(url)
}

const openWithWindowOpenBlank = (url: Url) => {
  window.open(url, '_blank')
}

const openWithWindowOpenSelf = (url: Url) => {
  window.open(url, '_self')
}

const openWithTelegramSDK = (url: Url) => {
  if (openLink.isAvailable()) {
    openLink(url, { tryInstantView: false })
  }
}

const openWithLocationHref = (url: Url) => {
  window.location.href = url
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
          <p class="text-2xl mb-2">The price was <span class="font-bold">${{ formatNumber(price) }}</span></p>
        </AlertDialogHeader>

        <div class="px-6 py-2">
          <Button
            variant="outline"
            size="sm"
            class="w-full py-2 mb-2 text-sm"
            @click="() => openWithWindowOpen(productLink)"
          >
            <ExternalLink class="w-4 h-4 mr-1" />
            window.open(url)
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="w-full py-2 mb-2 text-sm"
            @click="() => openWithWindowOpenBlank(productLink)"
          >
            <ExternalLink class="w-4 h-4 mr-1" />
            window.open(url, '_blank')
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="w-full py-2 mb-2 text-sm"
            @click="() => openWithWindowOpenSelf(productLink)"
          >
            <ExternalLink class="w-4 h-4 mr-1" />
            window.open(url, '_self')
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="w-full py-2 mb-2 text-sm"
            @click="() => openWithTelegramSDK(productLink)"
          >
            <ExternalLink class="w-4 h-4 mr-1" />
            Telegram SDK openLink()
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="w-full py-2 mb-2 text-sm"
            @click="() => openWithLocationHref(productLink)"
          >
            <ExternalLink class="w-4 h-4 mr-1" />
            window.location.href
          </Button>

          <a
            :href="productLink"
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full text-center py-2 mb-2 border rounded-md hover:bg-gray-100 text-sm"
          >
            <ExternalLink class="w-4 h-4 inline mr-1" />
            Regular HTML a tag
          </a>
        </div>

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
                close!()
              }"
          >
            Next Product
          </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
