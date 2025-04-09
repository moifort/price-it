<template>
  <div class="flex h-full flex-col gap-4 p-4 overflow-auto">
    <div class="flex-none">
      <slot name="title" />
    </div>

    <div>
      <slot name="run" />
    </div>

    <div>
      <slot name="win" />
    </div>
  </div>
</template>
