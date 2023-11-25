import axios from "axios"
import { OrderDetailResponeModel, OrderResponeModel, ResponeModel } from "src/Model/apiModel"
import { BASE_DEV } from "."
import { ShowToast } from "src/utils"
import { CartItem, ProductSkuChooseInf } from "pages/pos"

export const FetchAllOrder = async function (currentPage?: number, limit?: number) {
    try {
        const params = {
            _page: currentPage,
            _limit: limit
        }

        let { data } = await axios.get<ResponeModel<OrderResponeModel>>(`${BASE_DEV}/order/getall`, { params })
        return data
    } catch (error) {
        ShowToast("Failed To Get All Order ", "ERROR")
    }
}

export const FetchAllOrderDetail = async function (id: number) {
    try {
        const params = {
            id
        }

        let { data } = await axios.get<ResponeModel<OrderDetailResponeModel>>(`${BASE_DEV}/order/getAllOrderDetailByIdOrder`, { params })
        return data
    } catch (error) {
        ShowToast("Failed To Get All Order Detail ", "ERROR")
    }
}

export const CreateNewOrder = async function (listproductOrdered: CartItem, employeeId: 1, customerId: number) {
    try {
        const params = {
            customerId,
            statusID: 1,
            shippingTypeID: 1,
            employeeId,
            listproductOrdered
        }
        let { data } = await axios.post<ResponeModel<OrderResponeModel>>(`${BASE_DEV}/order/addNew`, params)
        return data
        // return data
    } catch (error) {
        ShowToast("Failed To Order Cart Product ", "ERROR")
    }
}

export const DeleteOrderById = async function (id: number) {
    try {
        await axios.delete(`${BASE_DEV}/order/delete/${id}`)
        ShowToast("Deleted Successfully", "INFO")
    } catch (error) {
        ShowToast("Failed to delete this order", "ERROR")
    }
}