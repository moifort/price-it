<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '~/components/atoms/button'

defineProps({ error: Object })
const router = useRouter()
const handleError = () => {
  clearError()
  router.push('/')
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div class="space-y-6 max-w-md">
        <h1 class="text-3xl font-bold">Oops! Something went wrong</h1>
        <p class="text-muted-foreground">
          We encountered an error while processing your request.
          Please try again or return to the home page.
        </p>
        <div class="flex justify-center pt-4">
          <Button @click="handleError" size="lg">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
