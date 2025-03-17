<script setup lang="ts">
// @ts-ignore
import NumberAnimation from 'vue-number-animation'

withDefaults(defineProps<{ from?: number; value: number; duration?: number }>(), { from: 0, duration: 1 })
</script>

<template>
  <NumberAnimation
      :from="from"
      :to="value"
      :format="(number: number) => number.toFixed(0)"
      :duration="duration"
  />
</template>
