<script setup lang="ts">
import { openLink, openTelegramLink, shareURL } from '@telegram-apps/sdk'
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'

// TODO: Add logic jsute si il clique sur le lien
const { data, status } = useAsyncGql('TaskQuery')
const copy = () => {
  navigator.clipboard.writeText('https://t.me/guessprice_bot?start=ref_1234')
  alert('Invitation link copied!')
}
const share = () => {
  shareURL('https://t.me/guessprice_bot?start=ref_1234', 'Invite a friend!')
}

const openT = () => {
  openTelegramLink('https://t.me/guessprice_bot?start=ref_1234')
}

const openL = () => {
  openLink('https://t.me/guessprice_bot?start=ref_1234')
}
</script>

<template>
  {{ shareURL.isAvailable() }}
  <Button @click="share">ShareUrl</Button>
  <Button @click="openT">telegram</Button>
  <Button @click="openL">Link</Button>
  <Button @click="copy">Copy</Button>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
  />
</template>
