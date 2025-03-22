<script setup lang="ts">
import Navigation, { type Menu } from '~/components/molecules/layout/Navigation.vue'

const router = useRouter()
const route = useRoute()
// TODO: Fix probleme avec scroll
</script>

<template>
  <div class="flex min-h-screen flex-col h-[100vh]">
    <main class="flex-grow h-full pb-20" id="main-application">
      <slot />
    </main>
    <Navigation :active="(route.name === 'index' ? 'game' : route.name) as Menu"
                @click:go-to="(menu) =>
                router.push(`/${menu === 'game' ? '' : menu}`)"/>
  </div>
</template>


