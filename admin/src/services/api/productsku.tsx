import axios from "axios";
import { ResponeModel } from "src/Model/apiModel";
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

