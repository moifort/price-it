<template>
  <div class="flex w-full flex-col gap-4 p-4">
    <div class="flex items-center justify-between">
      <slot name="title" />
    </div>
    <div class="flex-1">
      <slot name="body" />
    </div>
    <div class="flex items-center justify-end">
      <slot name="action" />
    </div>
  </div>
</template>
