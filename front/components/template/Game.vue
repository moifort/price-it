<template>
  <div class="flex h-[100vh] flex-col gap-4 p-4 pb-8">
    <div class="flex-none">
      <slot name="header"  />
    </div>

    <div class="flex-grow">
      <slot name="body"/>
    </div>
  </div>
</template>
