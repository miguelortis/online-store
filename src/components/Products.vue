<template>
  <div>
    <v-row>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </v-row>
    <div v-if="loading" class="loading">
      <v-progress-circular
        indeterminate
        :size="35"
        :width="7"
        class="mr-2"
      ></v-progress-circular
      >Cargando...
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'
import { useFetchProducts } from '@/composables/useFetchProducts'

const { fetchProducts } = useFetchProducts()
const loading = computed(() => useFetchProducts().loading)
const products = computed(() => useProductsStore().products)

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
</style>
