<script setup lang="ts">
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'

// TODO: Add logic comment savoir de facon simple qu'il c'est abonné ?
const { data, status } = useAsyncGql('TaskQuery')
</script>

<template>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
  />
</template>
