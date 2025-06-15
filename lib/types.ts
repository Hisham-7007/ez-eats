export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: "appetizers" | "mains" | "desserts" | "beverages"
  image: string
  available: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
}
