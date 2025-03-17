<template>
  <div class="flex h-[100vh] flex-col gap-4 p-4">
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
