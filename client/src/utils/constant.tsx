import { Product, ProductModel } from "src/Model";
import { ToastContainer, toast } from 'react-toastify';
export const Key_Product_Storage = "muji_bucket"


export const ShowToast = (message: string, type: "INFO" | "WARNING" | "ERROR") => {
    switch (type) {
        case "ERROR": {
            toast.error(message)
            break
        }
        case "INFO": {
            toast.info(message)
            break
        }
        case "WARNING": {
            toast.warn(message)
            break
        }
    }

}
export interface ProductCart {
    productsku: string,
    productId: string,
    image: string,
    size: string
}

export interface ProductCartItem {
    item: ProductCart,
    quantity: number
}


export interface localStorageInf {
    product: ProductCartItem[]

}


export const ProductMock: ProductModel = {
    "productId": 552,
    "nameProduct": "Áo Polo Nam Coolmax 123",
    "quantityStock": 0,
    "productDescription": "Áo Polo Nam Coolmax123",
    "categories": {
        "catorgoryID": 204,
        "nameCategory": "Áo Thun",
        "imageCategory": "https://bizweb.dktcdn.net/100/438/408/themes/916476/assets/home_danhmuc_2_child_2_image.png?1692601864042",
        "parentID": {
            "catorgoryID": 202,
            "nameCategory": "Áo Nam",
            "imageCategory": null,
            "parentID": null
        }
    },
    "products": [
        {
            "id": {},
            "option": {
                "optionID": 203,
                "optionName": "Material",
                "optionValues": []
            }
        },
        {
            "id": {},
            "option": {
                "optionID": 252,
                "optionName": "Size",
                "optionValues": [
                    {
                        "id": {
                            "productId": 502,
                            "optionId": 252,
                            "valueId": 1
                        },
                        "valuesName": "XL"
                    },
                    {
                        "id": {
                            "productId": 502,
                            "optionId": 252,
                            "valueId": 2
                        },
                        "valuesName": "XXL"
                    }
                ]
            }
        },
        {
            "id": {},
            "option": {
                "optionID": 253,
                "optionName": "Color",
                "optionValues": [
                    {
                        "id": {
                            "productId": 552,
                            "optionId": 253,
                            "valueId": 1
                        },
                        "valuesName": "Red"
                    },
                    {
                        "id": {
                            "productId": 502,
                            "optionId": 253,
                            "valueId": 1
                        },
                        "valuesName": "Green"
                    },
                    {
                        "id": {
                            "productId": 502,
                            "optionId": 253,
                            "valueId": 3
                        },
                        "valuesName": "Red"
                    },
                    {
                        "id": {
                            "productId": 502,
                            "optionId": 253,
                            "valueId": 2
                        },
                        "valuesName": "Yellow"
                    }
                ]
            }
        }
    ],
    "productSkus": [
        {
            "id": {
                "productId": 552,
                "skuId": 1
            },
            "skuName": "R4611",
            "quantityStock": 12,
            "imageProduct": "1ZGQ1lUhNlMpSxeu0U4N7sFxYopMKT5om",
            "price": 123.0
        },
        {
            "id": {
                "productId": 552,
                "skuId": 2
            },
            "skuName": "R4612",
            "quantityStock": 12,
            "imageProduct": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/akm5037-cam-2.jpg?v=1690163735137",
            "price": 123.0
        },
        {
            "id": {
                "productId": 552,
                "skuId": 2
            },
            "skuName": "R4612",
            "quantityStock": 12,
            "imageProduct": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/akm5037-cam-2.jpg?v=1690163735137",
            "price": 123.0
        },
        {
            "id": {
                "productId": 552,
                "skuId": 2
            },
            "skuName": "R4612",
            "quantityStock": 12,
            "imageProduct": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/akm5037-cam-2.jpg?v=1690163735137",
            "price": 123.0
        },
        {
            "id": {
                "productId": 552,
                "skuId": 2
            },
            "skuName": "R4612",
            "quantityStock": 12,
            "imageProduct": "https://bizweb.dktcdn.net/thumb/large/100/438/408/products/akm5037-cam-2.jpg?v=1690163735137",
            "price": 123.0
        }
    ],
    "orderProducts": []
}


