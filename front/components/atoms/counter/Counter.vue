<script setup lang="ts">
// @ts-ignore
import NumberAnimation from 'vue-number-animation'
import { formatNumber } from '~/utils/utils'

const props = withDefaults(
  defineProps<{
    play?: boolean
    from?: number
    value: number
    duration?: number
  }>(),
  {
    duration: 1,
    play: true,
  },
)
const counter = ref(null)
watch(
  () => props.play,
  (value) => {
    // @ts-ignore
    if (value === false) counter.value?.pause()
  },
)
</script>

<template>
  <NumberAnimation
      ref="counter"
      :from="from"
      :to="value"
      :format="(number: number) =>  formatNumber(number?.toFixed(0) ?? 0)"
      :duration="duration"
  />
</template>
