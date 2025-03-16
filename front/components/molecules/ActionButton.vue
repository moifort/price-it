<script setup lang="ts">
defineProps<{ isActive: boolean }>()
</script>

<template>
  <Button  variant="outline" :disabled="!isActive" size="lg" class="h-24 text-lg flex flex-col gap-2 border-2 transition-all" >
    <span> <slot name="icon"/> </span>
    <slot name="label"/>
  </Button>
</template>


