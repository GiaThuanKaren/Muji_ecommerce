import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { OptionValueModel, OptionValueResponeModel, ResponeModel } from "src/Model/apiModel";

export const FetchAllOptionValue = async function () {
    try {
        let { data } = await axios.get<ResponeModel<OptionValueResponeModel[]>>(`${BASE_DEV}/option_value/fetch_all`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All OptionValue", "ERROR")
    }
}

export const CreateNewOptionValueAPi = async function (optionValue: OptionValueModel) {
    try {
        // let optionValueCreate: OptionValueModel = {
        //     option_id: (optionValue.id && optionValue.id?.optionId.toString() as string),
        //     product_id:  optionValue.id?.productId.toString(),
        //     value_id: optionValue.id && optionValue.id?.valueId as string,
        //     value_name: optionValue.valuesName as string
        // }
        await axios.post(`${BASE_DEV}/option_value/create_new`, optionValue)
        ShowToast("Created Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create New Option Value", "ERROR")
    }
}