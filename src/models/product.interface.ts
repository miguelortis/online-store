export interface Product {
  id: number
  uuid: string
  name: string
  resumen: string
  description: string
  sku: string
  nmp: string
  width: string
  height: string
  weight: string
  lenght?: string
  depth: string
  price: string
  make_offer: number
  user?: User
  brands: any[]
  offers: any[]
  categories: any[]
  colors: any[]
  image: Image
  images: Image[]
  stock: number
  status: number
  cart: number
  favorite: number
}

export interface Image {
  id: number
  uuid: string
  type: string
  name: string
  url: string
  fileable_type: string
  fileable_id: number
  status: number
  created_at: Date
  updated_at: Date
  path: string
}

export interface User {
  id: number
  uuid: string
  name: string
  address: string
  phone: string
  email: string
  email_verified_at: null
  lat: null
  lng: null
  bulk_products: number
  bulk_offer: number
  avatar: null
  rating: number
  punctuation: number
  role_id: number
  status: number
  code_password: null
  date_code_password: null
  created_at: null
  updated_at: null
}
