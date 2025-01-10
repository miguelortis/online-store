import type { FetchProductsParams } from '@/models/fetch-products-params.interface'
import type { Product } from '@/models/product.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[] | []>([])
  const page = ref<number>(1)
  const last_page = ref<number>(1)
  const loading = ref<boolean>(false)
  const params = ref<{ search_key?: string; category_uuid?: string }>({})

  function setProducts(pdts: Product[]) {
    products.value = [...products.value, ...pdts]
  }

  function setPagination(pg: number, l_pg: number) {
    page.value = pg
    last_page.value = l_pg
  }

  function isLoading(value: boolean) {
    loading.value = value
  }

  function setParams(data: FetchProductsParams) {
    params.value = data
  }

  function clearProducts() {
    products.value = []
    page.value = 1
  }

  return {
    products,
    page,
    last_page,
    loading,
    params,
    setParams,
    setProducts,
    setPagination,
    isLoading,
    clearProducts,
  }
})
