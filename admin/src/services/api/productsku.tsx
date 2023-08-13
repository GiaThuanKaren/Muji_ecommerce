import axios from "axios";
import { ProductSkuModel, ResponeModel } from "src/Model/apiModel";
import { ProductSkuResponeModel } from "src/utils/routingLink";
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

export const CreateNewProductSku = async function (productSkuModel: ProductSkuModel, image: File) {
    interface UpdateImage {
        "msg": string,
        "others": null,
        "data": string,
        "status": string
    }
    try {
        let formData = new FormData()
        formData.append("tenfile", image)
        let { data } = await axios.post<UpdateImage>(`https://instagram-backend-gia-thuan.vercel.app/api/upload/upload_single`, formData, {
            headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
        })
        productSkuModel.imageProduct = data.data;
        await axios.post(`${BASE_DEV}/product_sku/create_new`, productSkuModel);
        ShowToast("Create New Product Sku Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create New Product Sku", "ERROR")
    }
}