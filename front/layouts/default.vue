<script setup lang="ts">
import { viewport } from '@telegram-apps/sdk-vue'
import Navigation, { type Menu } from '~/components/molecules/layout/Navigation.vue'
// TODO: Fix probleme avec scroll

const router = useRouter()
const route = useRoute()
if (viewport.expand.isAvailable()) {
  viewport.expand()
}
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


