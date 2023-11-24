import axios from "axios";
import { BASE_DEV } from ".";
import { ShowToast } from "src/utils";
import { RoleModel, ResponeModel } from "src/Model/apiModel";

export const FetchAllRole = async function () {
    try {
        let { data } = await axios.get<ResponeModel<RoleModel>>(`${BASE_DEV}/role/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Role ", "ERROR")
    }
}

export const CreateNewRole = async function (roleModel: RoleModel) {
    try {
        let { data } = await axios.post(`${BASE_DEV}/role/create_new_role`, roleModel)
        ShowToast("Created Sucessfully", "INFO");
        return data
    } catch (error) {
        ShowToast("Failed To Create New Role", "ERROR");
    }
}

export const DeleteRoleById = async function (id: number) {
    try {
        let { data } = await axios.delete(`${BASE_DEV}/role/delete/${id}`)
        ShowToast("Deleted Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Delete This Role", "ERROR")
    }
}

export const UpdateRoleById = async function(role: RoleModel){
    try {
        
        await axios.put(`${BASE_DEV}/role/edit`, role)
        ShowToast("Update Role Sucessfully","INFO")
    } catch (error) {
        ShowToast("Error To Update This Role","ERROR")
    }
}