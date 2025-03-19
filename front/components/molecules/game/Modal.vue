<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { Button } from '~/components/atoms/button'
import { Card } from '~/components/atoms/card'
import { CardFooter } from '~/components/atoms/card'
import { CardHeader } from '~/components/atoms/card'
import { CardTitle } from '~/components/atoms/card'
import { openLink } from '~/utils/utils'
import type { Amount, Url } from '../../../../back/src/utils/types'

defineProps<{ price: Amount; productLink: Url }>()
defineEmits<(e: 'click:next') => void>()
</script>

<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Card class="w-full max-w-md shadow-md">
        <CardHeader class="flex flex-col items-center text-center mt-2">
          <slot name="icon" />

          <CardTitle class="text-4xl font-bold mb-4 mt-2">
            <slot name="title" />
          </CardTitle>
          <p class="text-2xl mb-2">The price was <span class="font-bold">${{ price.toFixed(2) }}</span></p>
        </CardHeader>

        <CardFooter class="gap-3 flex-col">
          <Button
              variant="outline"
              class="w-full py-6 text-lg"
              @click="openLink(productLink)"
          >
            <ExternalLink class="w-5 h-5" />
            See Product
          </Button>

          <Button
              variant="default"
              class="w-full py-6 text-lg"
              @click="$emit('click:next')"
          >
            Next Product
          </Button>
        </CardFooter>
      </Card>
    </div>
  </Transition>
</template>
