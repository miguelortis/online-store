<template>
  <v-container class="fill-height d-flex justify-center">
    <v-card class="elevation-12" max-width="360px" width="100%">
      <v-card-title class="headline text-center ma-5">
        Inicio de Sesión
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
            prepend-inner-icon="mdi-email"
            color="primary"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :rules="passwordRules"
            type="password"
            required
            prepend-inner-icon="mdi-lock"
            color="primary"
            :disabled="loading"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex flex-column items-center mb-4">
        <v-btn class="button" :loading="loading" variant="tonal" @click="login"
          >Iniciar sesión</v-btn
        >
        <v-divider class="my-5" :thickness="3" width="100%"></v-divider>
        <v-btn
          color="#2E72F1"
          variant="tonal"
          class="button"
          @click="goToRegister"
          :disabled="loading"
        >
          Crear cuenta nueva
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import axios from '@/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref<string>('')
const password = ref<string>('')
const valid = ref<boolean>(false)
const loading = ref(false)
const router = useRouter()
const alertStore = useAlertStore()
const userStore = useUserStore()

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
]

const login = async () => {
  loading.value = true
  try {
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    })
    const { token } = response.data.data
    localStorage.setItem('token', token)
    userStore.setUser(response.data.user)
    router.push('/')
  } catch (error: any) {
    alertStore.showAlert(error.message, 'error')
  }
  loading.value = false
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

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
