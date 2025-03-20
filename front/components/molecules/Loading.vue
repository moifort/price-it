<script setup lang="ts">
import { Card, CardHeader } from '~/components/atoms/card'
</script>


<template>
  <Transition class="fade-in">
    <Card>
      <CardHeader class="flex justify-center items-center">
        <slot />
        <div class="mt-2 text-foreground/70 font-medium">Loading...</div>
      </CardHeader>
    </Card>
  </Transition>
</template>

