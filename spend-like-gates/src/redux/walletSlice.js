import { createSlice } from "@reduxjs/toolkit"

import products from "../data/products";


export const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        money: 100000000000,
        cart: []
    },
    reducers: {
        buy: (state, action) => {
            let id = action.payload.id;
            let itemInCart = state.cart.find((item) => item.id === id);
            if (itemInCart) itemInCart.count += 1;
            if (!itemInCart) state.cart.push({ id: id, count: 1 })
            state.money -= products.find(product => product.id == id).productPrice
        },
        sell: (state, action) => {
            let id = action.payload.id;
            let itemInCart = state.cart.find((item) => item.id === id);
            if (itemInCart) itemInCart.count -= 1;
            if (itemInCart) state.money += products.find(product => product.id === id).productPrice
            if (itemInCart?.count <= 0) state.cart = state.cart.filter(item => item.id !== id)
        },
        buyNsellMore: (state, action) => {
            let id = action.payload.id;
            let quantity = action.payload.quantity;
            let productPrice = products.find(product => product.id === id).productPrice
            let itemInCart = state.cart.find((item) => item.id === id);

            // reset money and quantity if is already in cart else push new item
            if (itemInCart) {                                      
                state.money += itemInCart.count * productPrice;
                itemInCart.count = 0
            } else {
                state.cart.push({ id: id, count: 0 })
            }

            itemInCart = state.cart.find((item) => item.id === id);

            // get quantity if have enough money else get max affordable quantity 
            if (quantity * productPrice <= state.money) {
                state.money -= productPrice * quantity;
                itemInCart.count = quantity;
            } else {
               let affordableQuantity =  Math.floor(state.money / productPrice )
               state.money -= productPrice * affordableQuantity;
               itemInCart.count = affordableQuantity;
            }
            
        }
    }

})

export default walletSlice.reducer;

export const { buy, sell, buyNsellMore } = walletSlice.actions;