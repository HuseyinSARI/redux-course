import { createSlice } from "@reduxjs/toolkit"

import products from "../data/products";


export const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        money: 1000,
        cart: []
    },
    reducers: {
        buy: (state, action) => {
            let id = action.payload.id;  

            let itemInCart = state.cart.find((item) => item.id === id );  

            if(itemInCart) itemInCart.count += 1 ;

            if (!itemInCart) state.cart.push({ id: id, count: 1 }) 

            state.money -= products.find(product => product.id == id).productPrice 
        },
        sell: (state, action) => {
            let id = action.payload.id;  

            let itemInCart = state.cart.find((item) => item.id === id);  

            if(itemInCart) itemInCart.count -= 1 ;

            if (itemInCart) state.money += products.find(product => product.id === id).productPrice 

            if (itemInCart?.count <= 0) state.cart = state.cart.filter(item => item.id !== id) 
        },
        buyMore: (state, action) => {
            let id = action.payload.id;
            let quantity = action.payload.quantity;
            let productPrice = products.find(product => product.id === id).productPrice            
            let itemInCart = state.cart.find((item) => item.id === id);  
            
            if(itemInCart) itemInCart.count += quantity;
            if (!itemInCart) state.cart.push({ id: id, count: quantity }) 
            state.money -= productPrice* quantity; 

        }
    }

})

export default walletSlice.reducer;

export const { buy, sell } = walletSlice.actions;