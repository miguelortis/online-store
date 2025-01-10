import axios from '@/axios'
import { useProductsStore } from '@/stores/products'
import { formatQueryParams } from '@/utils/format'

export function useFetchProducts() {
  const productsStore = useProductsStore()

  const fetchProducts = async () => {
    if (
      productsStore.loading ||
      productsStore.page - 1 === productsStore.last_page
    ) {
      return
    }
    try {
      productsStore.isLoading(true)
      const response = await axios.get(
        `/shop?page=${productsStore.page}&per_page=10&${formatQueryParams(productsStore.params)}`
      )
      productsStore.setProducts(response.data.data)

      productsStore.setPagination(
        response.data.meta.current_page + 1,
        response.data.meta.last_page
      )
    } catch (error) {
      console.error(error)
    }
    productsStore.isLoading(false)
  }

  return {
    loading: productsStore.loading,
    fetchProducts,
  }
}
