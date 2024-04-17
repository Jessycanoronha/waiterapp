export interface Order {
  id: string | number
  order_id: string
  status: OrderStatus
  table_number: string
  products: Product[]
}

export type OrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE'

export interface Product {
  id: string | number
  category_id: number | string
  name: string
  description: string
  imagepath?: string
  price: number
  quantity?: number
}
