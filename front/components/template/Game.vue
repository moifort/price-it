<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="container max-w-screen-md mx-auto p-4 md:p-6 space-y-6">
      <slot name="header" />

      <slot name="body"/>

      <slot name="actions" />
    </div>
  </div>
</template>
