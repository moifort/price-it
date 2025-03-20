<script setup lang="ts">
// @ts-ignore
import NumberAnimation from 'vue-number-animation'

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
      :format="(number: number) => number.toFixed(0)"
      :duration="duration"
  />
</template>
