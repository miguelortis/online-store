<template>
  <v-container class="fill-height d-flex justify-center">
    <v-card class="elevation-12" max-width="360px" width="100%">
      <v-card-title class="headline text-center ma-5">
        Crear una cuenta
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Nombre"
            required
            prepend-inner-icon="mdi-account"
            color="primary"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Correo"
            :rules="emailRules"
            required
            prepend-inner-icon="mdi-email"
            color="primary"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            :rules="passwordRules"
            type="password"
            required
            prepend-inner-icon="mdi-lock"
            color="primary"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            v-model="cPassword"
            label="Confirmar contraseña"
            :rules="cPasswordRules"
            type="password"
            required
            :prepend-inner-icon="cPasswordIcon"
            color="primary"
            :disabled="loading"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex flex-column items-center mb-4">
        <v-btn
          class="button"
          :loading="loading"
          variant="tonal"
          @click="register"
          >Registrarte</v-btn
        >
        <v-divider class="my-5" :thickness="3" width="100%"></v-divider>
        <v-btn
          :disabled="loading"
          variant="plain"
          class="button"
          @click="goToLogin"
          >Ya tienes una cuenta?</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'
import type { VForm } from 'vuetify/components'
import { useAlertStore } from '@/stores/alert'

const name = ref('')
const email = ref('')
const password = ref('')
const cPassword = ref('')
const cPasswordIcon = ref('mdi-lock')
const valid = ref(false)
const form = ref<VForm | null>(null)
const loading = ref(false)
const router = useRouter()
const alertStore = useAlertStore()

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
]

const cPasswordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v === password.value || 'Passwords do not match',
]

const register = async () => {
  loading.value = true
  if (form.value?.validate()) {
    try {
      await axios.post('/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        c_password: cPassword.value,
      })
      alertStore.showAlert('Cuenta registrada con éxito!.')
      goToLogin()
    } catch (error: any) {
      alertStore.showAlert(
        'Ocurrio un problema al registrar la cuenta!.',
        'error'
      )
    }
  }
  loading.value = false
}
watch([password, cPassword], ([newPassword]) => {
  if (cPassword.value.length === 0 && newPassword.length === 0) {
    cPasswordIcon.value = 'mdi-lock'
  } else if (newPassword === cPassword.value) {
    cPasswordIcon.value = 'mdi-lock-check'
  } else {
    cPasswordIcon.value = 'mdi-lock-remove'
  }
})

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-card-title {
  font-size: 24px;
}

.button {
  width: 100%;
  padding: 0 1rem;
}
</style>
