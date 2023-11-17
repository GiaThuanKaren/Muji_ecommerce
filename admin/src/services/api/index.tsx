import { Key_Product_Storage, ProductCartItem, localStorageInf } from "src/utils/constant"

export const BASE_DEV: string = process.env.NODE_ENV == "development" ? "http://localhost:8080" : "https://yody-backend-api.onrender.com"
export const BASE_PRO: string = "https://yody-backend-api.onrender.com"

export const FetchDataFromStorageByKey = function () {
    try {
        initLocalStorage()
        const data: localStorageInf = JSON.parse(localStorage.getItem(Key_Product_Storage) as string)
        return data
    } catch (error) {

    }
}

export const initLocalStorage = function () {
    let initBucket: localStorageInf = {
        product: [

        ]
    }
    if (!localStorage.getItem(Key_Product_Storage)) {

        localStorage.setItem(Key_Product_Storage, JSON.stringify(initBucket))
    }
}

export const AddProductToLocalStorage = function (productCart: ProductCartItem) {
    try {
        // localStorage.setItem("123123", "123")
        let previousProduct = FetchDataFromStorageByKey();
        console.log("Previous Product ", previousProduct?.product)
        previousProduct?.product.push(productCart)

        console.log(previousProduct)
        localStorage.setItem(Key_Product_Storage, JSON.stringify(previousProduct))

    } catch (error) {
        console.log(error)
    }
}

export const UpdateProductToLocalStorage = function (productCart: ProductCartItem) {
    try {
        let previousProduct = FetchDataFromStorageByKey();
        let result: ProductCartItem | undefined = previousProduct?.product.find((item: ProductCartItem, index: number) => {
            return item.item.productSkus == productCart.item.productSkus &&
                item.item.productId == productCart.item.productId 
                // &&
                // item.item.size == productCart.item.size
        })
        if (result) {
            if (productCart.quantity != 0) {
                for (let item of previousProduct?.product as ProductCartItem[]) {

                    if (item.item.productSkus == productCart.item.productSkus &&
                        item.item.productId == productCart.item.productId 
                        // &&
                        // item.item.size == productCart.item.size
                        ) {
                        item.quantity = productCart.quantity
                        break
                    }
                }
                localStorage.setItem(Key_Product_Storage, JSON.stringify(previousProduct))
            } else {
                let NewData: ProductCartItem[] = []
                for (let item of previousProduct?.product as ProductCartItem[]) {

                    if (item.item.productSkus == productCart.item.productSkus &&
                        item.item.productId == productCart.item.productId 
                        // &&
                        // item.item.size == productCart.item.size
                        ) {


                    } else {
                        NewData.push(item)
                    }
                }
                previousProduct={
                    ...previousProduct,
                    product:NewData
                }
                localStorage.setItem(Key_Product_Storage, JSON.stringify(previousProduct))
            }


        } else {

        }
    } catch (error) {

    }
}