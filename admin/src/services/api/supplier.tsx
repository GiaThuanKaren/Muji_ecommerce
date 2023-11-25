import axios from "axios";
import { OptionModelRespone, SupplierModel, SupplierModelRespone } from "src/Model/apiModel";
import { BASE_DEV } from ".";
import { ResponeModel } from "src/Model/apiModel";
import { ShowToast } from "src/utils";

export const CreateNewSupplier = async function (supplierModel: SupplierModel) {
    try {

        let { data } = await axios.post<ResponeModel<SupplierModelRespone>>(`${BASE_DEV}/supplier/createNewSupplier`, supplierModel)
        ShowToast("Created Sucessfully", "INFO");
        return data
    } catch (error) {
        ShowToast("Failed To Create New Supplier", "ERROR");
    }
}


export const FetchAllSupplier = async function () {
    try {
        let { data } = await axios.get<ResponeModel<SupplierModelRespone>>(`${BASE_DEV}/supplier/fetchAll`)
        return data
    } catch (error) {
        ShowToast("Failed To Get All Supplier", "ERROR");
    }
}

export const DeleteSupplierById = async function (id: number) {
    try {
        let { data } = await axios.delete(`${BASE_DEV}/supplier/deleteSupplierById?id=${id}`)
        ShowToast("Deleted Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Delete This Supplier", "ERROR")
    }
}

export const UpdateSupplierById = async function(supplierModel: SupplierModel){
    try {
        
        await axios.put(`${BASE_DEV}/supplier/updateSupplierById`,supplierModel)
        ShowToast("Update Supplier Sucessfully","INFO")
    } catch (error) {
        ShowToast("Error To Update This Supllier","ERROR")
    }
}