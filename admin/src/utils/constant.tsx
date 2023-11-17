import { ProductResponeModel } from "src/Model/apiModel"

export const Key_Product_Storage = "muji_order"

export interface ProductCart {
    productsku: string,
    productId: string,
    image: string,
    size: string
    name:string
    price:any
}

export interface ProductCartItem {
    item: ProductCart,
    quantity: number,
}


export interface localStorageInf {
    product: ProductCartItem[]
}

