<template>
  <div class="flex h-full flex-col gap-4 p-4 pb-6">

    <div class="flex-none">
      <slot name="title" />
    </div>

    <div class="flex-grow">
      <slot name="body" />
    </div>

    <div class="flex-none">
      <slot name="subbody" />
    </div>

    <div class="flex-none">
       <slot name="action" />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
