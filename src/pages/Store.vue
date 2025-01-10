<template>
  <div class="store-view" @scroll="onScroll">
    <Products />
  </div>
</template>

<script setup lang="ts">
import Products from '@/components/Products.vue'
import { useFetchProducts } from '@/composables/useFetchProducts'

const { fetchProducts } = useFetchProducts()

const onScroll = async (event: Event) => {
  const target = event.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    await fetchProducts()
  }
}
</script>

<style scoped>
.store-view {
  padding: 16px;
  max-height: calc(100vh - 64px);
  overflow: auto;
}
</style>
