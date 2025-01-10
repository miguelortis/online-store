<template>
  <v-sheet class="d-flex flex-column">
    <v-snackbar
      v-model="snackbar"
      :timeout="time"
      :color="alertColor()"
      variant="tonal"
    >
      {{ msg }}
    </v-snackbar>
  </v-sheet>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import { computed } from 'vue'

const alertStore = useAlertStore()
const snackbar = ref(alertStore.open)
const msg = computed(() => alertStore.msg)
const type = computed(() => alertStore.alertType)
const time = computed(() => alertStore.alertTime)
const alertColor = () => {
  switch (type.value) {
    case 'error':
      return 'red'
    case 'success':
      return 'green'
    case 'warning':
      return 'yellow'
    default:
      return 'blue'
  }
}
</script>
