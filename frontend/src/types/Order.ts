export interface Order {
  id: string | number
  order_id: number
  status: OrderStatus
  table_number: string
  products: Product[]
}

export type OrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE'

export interface Product {
  id: string | number
  name: string
  description: string
  imagepath: string
  price: number
  quantity: number
}
