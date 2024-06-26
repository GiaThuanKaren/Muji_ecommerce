import axios from "axios";
import { ProductSkuModel, ResponeModel ,ProductSkuResponeModel } from "src/Model/apiModel";
// import {  } from "src/utils/routingLink";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";

export const FetchAllProductSku = async function () {
    try {
        let { data } = await axios.get<ResponeModel<ProductSkuResponeModel>>(`${BASE_DEV}/product_sku/fetch_all`)
        return data;
    } catch (error) {
        ShowToast("Failed to fetch all product sku", "INFO")
    }
}

export const CreateNewProductSku = async function (productSkuModel: ProductSkuModel, image: File | null) {
    interface UpdateImage {
        "msg": string,
        "others": null,
        "data": string,
        "status": string
    }
    try {
        if (image) {
            console.log("Uploading File")
            let formData = new FormData()
            formData.append("tenfile", image as File)
            let { data } = await axios.post<UpdateImage>(`https://instagram-backend-gia-thuan.vercel.app/api/upload/upload_single`, formData, {
                headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
            })
            productSkuModel.imageProduct = data.data;
        }

        // productSkuModel.imageProduct = "test.jpg"
        await axios.post(`${BASE_DEV}/product_sku/create_new`, productSkuModel);
        ShowToast("Create New Product Sku Successfully", "INFO")
    } catch (error) {
        console.log(error)
        ShowToast("Failed To Create New Product Sku", "ERROR")
    }
}

export const DeleteProductSkuById = async function (idProduct: number, idSku: number) {
    try {
        await axios.delete(`${BASE_DEV}/product_sku/delete_product_sku?idproduct=${idProduct}&idsku=${idSku}`)
        ShowToast("Deleted Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to delete this product Sku", "ERROR")
    }
}