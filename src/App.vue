<template>
  <Alert v-if="alertStore.open" />
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import Alert from './components/Alert.vue'
import { useAlertStore } from './stores/alert'

const alertStore = useAlertStore()
</script>
