import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { ResponeModel, SkuValueResponeModel } from "src/Model/apiModel";

export const FetchAllSkuValue = async function () {
    try {
        let { data } = await axios.get<ResponeModel<SkuValueResponeModel>>(`${BASE_DEV}/skuvalue/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Fetch All Sku Values", "ERROR")
    }
}


export const CreateNewSkuValue = async function(){
    
}