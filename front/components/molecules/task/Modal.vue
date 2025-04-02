<script setup lang="ts">
import { openLink } from '@telegram-apps/sdk'
import { ExternalLink } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import { CardTitle } from '~/components/atoms/card'
import type { Media } from '../../../../back/src/task/types'
import type { Url } from '../../../../back/src/utils/types'

export type ReturnType = 'later' | 'joined'
const { close } = defineProps<{ close?: (status: ReturnType) => Promise<void>; media: Media; url: Url }>()
const isOpen = ref(true)
const openMediaLink = async (url: Url) => {
  isOpen.value = false
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  await close!('joined')
  if (openLink.isAvailable()) {
    openLink(url)
  } else {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent class="rounded-xl">
        <AlertDialogHeader class="justify-center items-center mt-4">
          <font-awesome :icon="['fab', media]" size="3x" />

          <CardTitle class="text-4xl font-bold mb-4 mt-2">
            Join Our Community
          </CardTitle>
          <p class="text-2xl mb-2">Join our <span class="font-bold">{{ media }}</span> community!</p>
        </AlertDialogHeader>

        <AlertDialogFooter class="gap-3 flex-col">
          <Button
              variant="outline"
              class="w-full py-6 text-lg"
              @click="openMediaLink(url)"
          >
            <ExternalLink class="w-5 h-5" />
            Go to {{ media }}
          </Button>

          <Button
              variant="default"
              class="w-full py-6 text-lg"
              @click="() => {
                isOpen = false
                close!('later')
              }"
          >
            Maybe Later
          </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
