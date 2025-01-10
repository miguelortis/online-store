<template>
  <v-main>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-img
          src="@/assets/shop-image.png"
          alt="Shop ico"
          class="img"
          width="40px"
          height="40px"
        />
      </template>
      <v-app-bar-title width="500px">Mi Tienda</v-app-bar-title>
      <template v-slot:append>
        <div v-if="!xs && !sm">
          <v-select
            class="select"
            clearable
            label="Categorías"
            density="compact"
            item-title="name"
            item-value="uuid"
            :items="categories"
            v-model="select"
          />
        </div>
        <div v-if="!xs && !sm" class="search-input">
          <v-text-field
            @click:append-inner="handleSearch"
            append-inner-icon="mdi-magnify"
            density="compact"
            clearable
            placeholder="Buscar productos..."
            v-model="search"
            @keyup.enter="handleSearch"
          ></v-text-field>
        </div>
        <v-menu>
          <template v-if="!xs && !sm" v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-btn width="100%" @click="item.onClick">
                {{ item.title }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- ///Mobile// -->
        <v-app-bar-nav-icon
          v-if="xs || sm"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
    </v-app-bar>
    <v-navigation-drawer location="right" v-model="drawer" temporary>
      <div class="content-drawer">
        <div>
          <div class="input-filter">
            <v-select
              clearable
              label="Categorías"
              density="compact"
              item-title="name"
              item-value="uuid"
              :items="categories"
              v-model="select"
            />
          </div>
          <div class="input-filter">
            <v-text-field
              @click:append-inner="handleSearch"
              append-inner-icon="mdi-magnify"
              density="compact"
              clearable
              placeholder="Buscar productos..."
              v-model="search"
              @keyup.enter="handleSearch"
            ></v-text-field>
          </div>
        </div>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-btn width="100%" @click="item.onClick">
            {{ item.title }}
          </v-btn>
        </v-list-item>
      </div>
    </v-navigation-drawer>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import axios from '@/axios'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAlertStore } from '@/stores/alert'
import { useUserStore } from '@/stores/user'
import { useFetchProducts } from '@/composables/useFetchProducts'
import { useProductsStore } from '@/stores/products'
import type { Category } from '@/models/category.interface'

const { xs, sm } = useDisplay()

const router = useRouter()
const userStore = useUserStore()
const alertStore = useAlertStore()
const productStore = useProductsStore()
const categories = ref<Category[]>([])
const select = ref<string>()
const search = ref<string>()
const drawer = ref<boolean>()
const { fetchProducts } = useFetchProducts()

const logout = async () => {
  userStore.clearUser()
  router.push('/login')
}

const items = [{ title: 'Cerrar sesión', onClick: logout }]

const fetchUser = async () => {
  try {
    const user = await axios.get('/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    userStore.setUser(user.data.data)
  } catch (error: any) {
    alertStore.showAlert(error.message, 'error')
  }
}
const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    categories.value = response.data.data
  } catch (error: any) {
    alertStore.showAlert(error.message, 'error')
  }
}
const handleSearch = () => {
  const params: { category_uuid?: string; search_key?: string } = {}
  if (select.value) {
    params.category_uuid = select.value
  }
  if (search.value) {
    params.search_key = search.value
  }
  productStore.setParams(params)
  productStore.clearProducts()
  fetchProducts()
}
watch(select, () => {
  handleSearch()
})
onMounted(() => {
  fetchUser()
  fetchCategories()
})
</script>

<style scoped>
.select {
  width: 200px;
  height: 40px;
  margin: 0 10px;
}
.search-input {
  width: 300px;
  height: 40px;
  margin: 0 10px;
}
.input-filter {
  margin: 10px 5px 0 5px;
}
.content-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
