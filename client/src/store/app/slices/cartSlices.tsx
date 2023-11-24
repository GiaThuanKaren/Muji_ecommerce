import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AddProductToLocalStorage, FetchDataFromStorageByKey, UpdateProductToLocalStorage } from 'src/service/api'
import { ProductCartItem, localStorageInf } from 'src/utils/constant'


// const initialState: localStorageInf = {

// }


let initBucket: localStorageInf = {
    product: [

    ]
}

export interface cartSlicesInf {
    "chooseProduct": ProductCartItem[],
    listProduct: ProductCartItem[]
}



export const cartSlices = createSlice({
    name: 'counter',
    initialState: () => {
        let init: cartSlicesInf = {

        }

        let chooseProduct: ProductCartItem[] = []
        return {
            "listProduct": initBucket.product,
            "chooseProduct": chooseProduct
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
            let payload: ProductCartItem = action.payload
            AddProductToLocalStorage(payload)
            state.listProduct.push(payload)
        },
        _updateProductToLocalStorage: (state, action) => {
            let payload: ProductCartItem = action.payload
            UpdateProductToLocalStorage(payload)
            
            state.listProduct = FetchDataFromStorageByKey()?.product as ProductCartItem[]
        },
        _pickProductToPay: (state, aciton) => {
            let payload: ProductCartItem = aciton.payload
            console.log(payload)
            state.chooseProduct.push(payload)
        },
        _unPickProductToPay: (state, action) => {
            let payload: ProductCartItem = action.payload
            let NewData: ProductCartItem[] = []
            for (let item of state?.chooseProduct as ProductCartItem[]) {
                
                if (item.item.productsku == payload.item.productsku &&
                    item.item.productId == payload.item.productId &&
                    item.item.size == payload.item.size) {


                } else {
                    NewData.push(item)
                }
            }
            state.chooseProduct = NewData
        },


    },
})

// Action creators are generated for each case reducer function
export const { _addProductToCart, _updateProductToLocalStorage, _unPickProductToPay, _pickProductToPay, firstLoadFromLocal, getAllProductInCart } = cartSlices.actions

export default cartSlices.reducer