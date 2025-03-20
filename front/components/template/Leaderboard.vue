<template>
  <div class="flex h-full flex-col gap-4 p-4 overflow-auto">
    <div class="flex-none">
      <slot name="title" />
    </div>

    <div class="flex-grow">
      <slot name="body" />
    </div>
  </div>
</template>
