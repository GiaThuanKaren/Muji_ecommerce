import axios from "axios";
import { ResponeModel } from "src/Model/apiModel";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";

// export const FetchAllSupplier = async function () {
//     try {
//         let { data } = await axios.get<ResponeModel<ProductSkuResponeModel>>(`${BASE_DEV}/supplier/fetchAll`)
//         return data;
//     } catch (error) {
//         ShowToast("Failed to fetch all product sku", "INFO")
//     }
// }
