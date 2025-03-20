<script setup lang="ts">
import Shop from '~/components/pages/Shop.vue'

const { data, status } = useAsyncGql('ShopProducts')
</script>

<template>
  <Shop :products="status === 'success' ? data.shopProducts :  []" />
</template>

