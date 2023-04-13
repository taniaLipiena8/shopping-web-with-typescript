export interface Cart{
    id?: string
    title: string
    desc: string
    price: number
    stock: number
    image: string
    quantity: number
}

export interface CartState{
    cartItems: Cart[]
}