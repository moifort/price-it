<template>
  <div class="flex h-full flex-col gap-4 p-4 overflow-auto">
    <div class="flex-none">
      <slot name="title" />
    </div>

    <div class="flex-none mt-2">
      <slot name="join" />
    </div>

    <div class="flex-grow mt-2">
      <slot name="follow" />
    </div>
  </div>
</template>
