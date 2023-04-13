import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart, CartState } from "../../models/interfaces/CartInterfaces";

const initialState: CartState = {
    cartItems: [],
}

const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        cartAdded: {
            reducer(state, action: PayloadAction<Cart>) {
                const itemExist = state.cartItems.findIndex((item) => item.id === action.payload.id)

                if (itemExist >= 0) {
                    state.cartItems[itemExist] = { ...state.cartItems[itemExist], quantity: state.cartItems[itemExist].quantity + 1 }
                } else {
                    state.cartItems.push(action.payload)
                }
            },
            prepare(id, title, desc, price, stock, image) {
                return {
                    payload: {
                        id,
                        title,
                        desc,
                        price,
                        stock,
                        image,
                        quantity: 1
                    }
                }
            }
        },

        deleteCart(state, action) {
            console.log(action.payload);

            const updatedCartItems = state.cartItems.filter((item) => item.id !== action.payload)

            state.cartItems = updatedCartItems

            alert('product removed')
        },

        quantityIncreased(state, action) {
            const id  = action.payload
            const existingItem = state.cartItems.find(cart => cart.id === id)

            if (existingItem) {
                existingItem.quantity++
            }

        },
        quantityDecreased(state,action){
            const id  = action.payload
            const existingItem = state.cartItems.find(cart => cart.id === id)

            if (existingItem) {
                existingItem.quantity--
            }
        }
    }
})


export const { cartAdded, deleteCart,quantityIncreased,  quantityDecreased } = cartsSlice.actions

export default cartsSlice.reducer