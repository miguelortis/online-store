import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | null>(null)

  function setUser(user: User) {
    userInfo.value = user
  }

  function clearUser() {
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return { userInfo, setUser, clearUser }
})
