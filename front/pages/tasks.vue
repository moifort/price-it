<script setup lang="ts">
import { shareURL } from '@telegram-apps/sdk'
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'

const openProductLink = () => {
  if (shareURL.isAvailable()) {
    shareURL('https://t.me/guessprice_bot?start=ref_1234', 'Invite a friend!')
  }
}
// TODO: Add logic jsute si il clique sur le lien
const { data, status } = useAsyncGql('TaskQuery')
</script>

<template>
  <Button @click="openProductLink">Referal</Button>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
  />
</template>
