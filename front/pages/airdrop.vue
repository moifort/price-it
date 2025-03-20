<script setup lang="ts">
import AirdropComponent from '~/components/pages/Airdrop.vue'
import type { WalletId } from '../../back/src/airdrop/types'

const { data, refresh } = useAsyncGql('AirdropWalletId')
const save = async (walletId: WalletId) => {
  await GqlAirdropSetWalletId({ walletId })
  await refresh()
}
</script>

<template>
  <AirdropComponent :wallet-id="data?.me.airdrop?.walletId ?? undefined" :save-wallet-id="save"/>
</template>
