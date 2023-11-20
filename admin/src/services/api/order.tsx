import axios from "axios"
import { OrderResponeModel, ResponeModel } from "src/Model/apiModel"
import { BASE_DEV } from "."
import { ShowToast } from "src/utils"
import { CartItem, ProductSkuChooseInf } from "pages/pos"
import { headers } from "next/dist/client/components/headers"


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
