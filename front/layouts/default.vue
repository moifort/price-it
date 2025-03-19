<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="flex min-h-screen flex-col h-[100vh]">
    <main class="flex-grow h-full pb-20">
      <slot />
    </main>
    <Navigation :currentPath="route.path" @navigate="handleNavigate" />
  </div>
</template>


