import axios from "axios";
import { CategoriesModel, CategoriesResponeModel, ResponeModel } from "src/Model/apiModel";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";

export const FetchAllCategories = async function () {
    try {
        let { data } = await axios.get<ResponeModel<CategoriesResponeModel>>(`${BASE_DEV}/categories/fetchAll`)
        let arr = data.data.filter((item: CategoriesResponeModel) => {
            return item.parentID != null
        })
        // data.data = arr
        return data
    } catch (error) {
        ShowToast("Error To Fetching All Categories", "ERROR")
    }

}


export const DeleteCatorgiesById = async function (id: number) {
    try {
        await axios.delete(`${BASE_DEV}/categories/delete/${id}`)
        ShowToast("Deleted Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Error To Delete This Categories", "ERROR")
    }
}


export const UpdateCategoriesById = async function (categoriesModel1: CategoriesModel) {
    try {
        if (categoriesModel1.parentID == 0) {
            categoriesModel1.parentID = undefined
        }
        let { data } = await axios.put<CategoriesModel>(`${BASE_DEV}/categories/update`, categoriesModel1)
        ShowToast("Update Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Update", "ERROR")
    }
}

export const CreateNew = async function (categoriesModel: CategoriesModel) {
    try {
        await axios.post(`${BASE_DEV}/categories/creat_new`, categoriesModel)
        ShowToast("Created Sucessfully", "INFO")

    } catch (error) {
        ShowToast("Failed To Create", "ERROR")

    }
}