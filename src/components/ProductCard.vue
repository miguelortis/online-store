<template>
  <v-col cols="12" sm="6" md="3" xl="2" class="d-flex grid">
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-4 d-flex flex-column"
      max-width="85%"
      width="100%"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        v-if="product?.image?.url"
        :src="product?.image?.url"
        alt="Product Image"
        height="250"
        cover
      ></v-img>
      <span v-else class="n-img">Sin Imagen</span>

      <v-card-item>
        <v-card-title>{{ product?.name }}</v-card-title>
        <v-card-subtitle>
          <span>{{
            product?.categories
              ?.map((category: any) => category?.name)
              .join(', ')
          }}</span>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row class="mx-0">
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>

          <div class="text-grey ms-2">4.5 (413)</div>
        </v-row>
        <div class="mt-4 text-subtitle-1">
          {{ formatPrice(Number(product?.price)) }}
        </div>
        <span class="stock">{{ product?.stock }} disponibles</span>
        <div>
          {{ product?.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn
          prepend-icon="mdi-cart-variant"
          color="deep-purple-lighten-2"
          text="Agregar al Carrito"
          block
          border
          @click="addToCart(product)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import axios from '@/axios'
import { ref, defineProps } from 'vue'
import { formatPrice } from '@/utils/format'
import { useAlertStore } from '@/stores/alert'
import type { Product } from '@/models/product.interface'

const loading = ref(false)
const selection = ref(1)
const alertStore = useAlertStore()

defineProps<{
  product: Product
}>()

const addToCart = async (product: Product) => {
  loading.value = true
  if (product.stock < 1) {
    alertStore.showAlert('No hay suficiente stock disponible', 'error')
    loading.value = false
    return
  }

  try {
    await axios.post('/carts', {
      product_id: product.id,
      stock: selection.value,
    })
    alertStore.showAlert('Producto agregado al carrito')
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error)
    alertStore.showAlert('Hubo un error al agregar el producto al carrito')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.stock {
  font-size: 12px;
  color: #bfbfbfc4;
  margin: 10px 0;
}

.n-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  font-size: 24px;
  color: #ccc;
}

.grid {
  padding: 0;
}
</style>
