import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchDataFromStorageByKey } from 'src/service/api'
import { ProductCartItem, localStorageInf } from 'src/utils/constant'

export interface CartSliceInf {
    value: number
}

// const initialState: localStorageInf = {

// }


let initBucket: localStorageInf = {
    product: [

    ]
}





export const cartSlices = createSlice({
    name: 'counter',
    initialState: () => {
        let result = [1]
        // return {
        //     "a":initBucket.product
        // }
        return {
            "listProduct": initBucket.product,
            "chooseProduct": []
        }
    },
    reducers: {
        getAllProductInCart: (state) => {
            return state;
        },
        firstLoadFromLocal: (state, action) => {
            console.log("State")
            console.log(state.listProduct)
            console.log()
            state.listProduct = action.payload.product
            // return state = action.payload.product
        },
        _addProductToCart: (state, action) => {

        },
        _updateProductToLocalStorage: (state, action) => {

        },
        pickProductToPay: (state, aciton) => {
            
            // aciton.payload
        },
        increment: (state) => {

            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.value += 1
        },
        decrement: (state) => {
            // state.value -= 1
        },

    },
})

// Action creators are generated for each case reducer function
export const { firstLoadFromLocal, increment, decrement, getAllProductInCart } = cartSlices.actions

export default cartSlices.reducer