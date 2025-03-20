<script setup lang="ts">
import { Card, CardHeader } from '~/components/atoms/card'
</script>


<template>
  <Transition name="fade" appear>
    <Card>
      <CardHeader class="flex justify-center items-center">
        <slot />
        <div class="mt-2 text-foreground/60 font-medium">Loading...</div>
      </CardHeader>
    </Card>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-appear-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-appear-from {
  opacity: 0;
}

.fade-enter-to,
.fade-appear-to {
  opacity: 1;
}
</style>

