import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AddProductToLocalStorage, FetchDataFromStorageByKey, UpdateProductToLocalStorage } from 'src/service/api'
import { Key_Product_Storage, ProductCartItem, ShowToast, localStorageInf } from 'src/utils/constant'


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
            let indexFound = -1
            let existedProduct = state.listProduct.find((item: ProductCartItem, index) => {
                if (
                    item.item.optionId == payload.item.optionId &&
                    item.item.productId == payload.item.productId &&
                    item.item.valuesId == payload.item.valuesId &&
                    item.item.productsku == payload.item.productsku
                ) {
                    indexFound = index
                }
                return item.item.optionId == payload.item.optionId &&
                    item.item.productId == payload.item.productId &&
                    item.item.valuesId == payload.item.valuesId &&
                    item.item.productsku == payload.item.productsku

            })


            // let editedArray = state.listProduct.filter((item, index) => index !== x)

            if (existedProduct) {
                //  Nếu  tìm thấy sản phẩm đã có trong giỏ hàng
                console.log("Update So Luong San Pham")
                ShowToast("Update So Luong San Pham", "INFO")
                existedProduct.quantity = payload.quantity
                console.log("Mảng sản phẩm sau khi update sản phẩm đã có trong store")
                console.log(state.listProduct)

                // let editedArray = state.listProduct.filter((item, index1) => {
                //     return item.item.optionId !== payload.item.optionId &&
                //         item.item.productId !== payload.item.productId &&
                //         item.item.valuesId !== payload.item.valuesId &&
                //         item.item.productsku !== payload.item.productsku
                // })
                localStorage.setItem(Key_Product_Storage, JSON.stringify({
                    "product": state.listProduct
                }))
                // editedArray.push(existedProduct)
                state.listProduct = state.listProduct
                // AddProductToLocalStorage(payload)


                // state.listProduct = editedArray
                // state.listProduct.push(payload)
                // AddProductToLocalStorage(payload)
            } else {
                //  Nếu không tìm thấy sản phẩm đã có trong giỏ hàng
                console.log("Add moi san pham")
                ShowToast("Add moi san pham", "INFO")
                state.listProduct.push(
                    payload
                )
                console.log(
                    "Mảng sản phẩm sau khi thêm sản phẩm mới hoàn toàn"

                )
                console.log(
                    state.listProduct
                )
                AddProductToLocalStorage(payload)
                // console.log(state.listProduct)
                // state.listProduct.push(payload)
                // AddProductToLocalStorage(payload)
            }

            // let Isexisted = false
            // let indexFound = -1
            // let arrNew = []

            // for (let item of state.listProduct) {
            //     if (
            //         item.item.optionId == payload.item.optionId &&
            //         item.item.productId == payload.item.productId &&
            //         item.item.valuesId == payload.item.valuesId &&
            //         item.item.productsku == payload.item.productsku &&
            //     ) {
            //         indexFound
            //         Isexisted = true

            //     }
            // }

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

                if (item.item.optionId == payload.item.optionId &&
                    item.item.productId == payload.item.productId &&
                    item.item.valuesId == payload.item.valuesId &&
                    item.item.productsku == payload.item.productsku) {


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