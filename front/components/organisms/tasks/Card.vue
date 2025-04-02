<script setup lang="ts">
import { Card } from '~/components/atoms/card'
import Modal, { type ReturnType } from '~/components/molecules/task/Modal.vue'
import { formatNumber } from '~/utils/utils'
import type { Point } from '../../../../back/src/score/types'
import type { Media, Media as MediaType } from '../../../../back/src/task/types'
import type { Url } from '../../../../back/src/utils/types'

// TODO: Add analytics
defineProps<{ points: Point; media: MediaType; url: Url; disabled?: boolean }>()
const emit = defineEmits<(e: 'click:join', media: MediaType) => void>()
const { $open } = useNuxtApp()
const join = async (media: Media, url: Url) => {
  const status = await $open<ReturnType>(Modal, { media, url })
  if (status === 'joined') {
    emit('click:join', media)
    return
  }
  return
}
</script>

<template>
  <Card
    class="p-3 h-[140px] text-white border-none shadow-md dark"
    :class="{ 'opacity-50': disabled }"
    @click="!disabled && join(media, url)"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <font-awesome :icon="['fab', media]" size="3x" />
      </div>
      <div class="text-3xl font-medium">
        {{ formatNumber(points) }}<span class="text-sm opacity-65">pts</span>
      </div>
    </div>
  </Card>
</template>
