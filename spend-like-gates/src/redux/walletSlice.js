import { createSlice } from "@reduxjs/toolkit"


const products = [
    {
        id: 1,
        value: 15,
    },
    {
        id: 2,
        value: 20,
    },
    {
        id: 3,
        value: 30,
    },
    {
        id: 4,
        value: 50,
    }
]


export const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        money: 1000,
        cart: [
            {
                id: 1,
                count: 1,
            },
            {
                id: 2,
                count: 2,
            },
            {
                id: 3,
                count: 3,
            }
        ]
    },
    reducers: {
        buy: (state, action) => {
            let id = Number(action.payload.id);  // Take Id 

            let isInCart = state.cart.find((item) => item.id === id ? item.count += 1 : false);  // Check it is already in a cart or not

            if (!isInCart) state.cart.push({ id: id, count: 1 }) // is it not in a cart, push the new one

            state.money -= products.find(product => product.id === id).value // reduce total money
        },
        sell: (state, action) => {
            let id = Number(action.payload.id);  // Take Id 

            let isInCart = state.cart.find((item) => item.id === id ? item.count-- : false);  // Check it is already in a cart or not

            if(isInCart) state.money += products.find(product => product.id === id).value // Reduce total money

            if (isInCart?.count <= 0) state.cart = state.cart.filter(item => item.id !== id) // If the item count is zero, delete it from the cart.
           
        }
    }

})

export default walletSlice.reducer;

export const { buy, sell } = walletSlice.actions;