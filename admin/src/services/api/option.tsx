import axios from "axios";
import { OptionModel, OptionModelRespone } from "src/Model/apiModel";
import { BASE_DEV } from ".";
import { ResponeMSG, ShowToast } from "src/utils";
import { ResponeModel } from "src/Model/apiModel";

export const CreateNewOption = async function (optionModel: OptionModel) {
    try {

        let { data } = await axios.post<ResponeModel<OptionModelRespone>>(`${BASE_DEV}/option/create_new`, optionModel)
        ShowToast("Created Sucessfully", "INFO");
        return data
    } catch (error) {
        ShowToast("Failed To Create New Option", "ERROR");
    }
}


export const FetchAllOption = async function () {
    try {
        let { data } = await axios.get<ResponeModel<OptionModelRespone>>(`${BASE_DEV}/option/fetch_all`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Option", "ERROR");
    }
}

export const DeleteOptionById = async function (id: number) {
    try {
        let { data } = await axios.delete(`${BASE_DEV}/option/delete/${id}`)
        ShowToast("Deleted Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Delete This Option", "ERROR")
    }
}