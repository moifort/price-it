<script setup lang="ts">
// @ts-ignore
import NumberAnimation from 'vue-number-animation'

const props = withDefaults(defineProps<{ value: number; duration?: number }>(), { duration: 1 })
</script>

<template>
  <NumberAnimation
      :from="0"
      :to="value"
      :format="(number: number) => number.toFixed(0)"
      :duration="duration"
  />
</template>
