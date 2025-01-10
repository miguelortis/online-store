import type { FetchProductsParams } from '@/models/fetch-products-params.interface'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const formatQueryParams = (params: FetchProductsParams): string => {
  return Object.keys(params)
    .filter((key) => params[key as keyof FetchProductsParams])
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof FetchProductsParams] ?? '')}`
    )
    .join('&')
}
