import axios from "axios"
import { ResponeModel, RevenueInMonthResponeModel, RevenueInWeekResponeModel, Top10ProductResponeModel, Top5CustomerResponeModel, Top5EmployeeResponeModel } from "src/Model/apiModel"
import { BASE_DEV } from "."
import { ShowToast } from "src/utils"


export const Top5EmployeeBestSale = async function () {
    try {
   
        let { data } = await axios.get<ResponeModel<Top5EmployeeResponeModel>>(`${BASE_DEV}/statistic/top5EmployeeBestSale`)
        return data
    } catch (error) {
        ShowToast("Failed To Get Top 5 Employee Best Sale", "ERROR")
    }
}

export const Top5CustomerBuy = async function () {
    try {
   
        let { data } = await axios.get<ResponeModel<Top5CustomerResponeModel>>(`${BASE_DEV}/statistic/top5CustomerBuy`)
        return data
    } catch (error) {
        ShowToast("Failed To Get Top 5 Customer Buy", "ERROR")
    }
}

export const Top10ProductBestSale = async function () {
    try {
   
        let { data } = await axios.get<ResponeModel<Top10ProductResponeModel>>(`${BASE_DEV}/statistic/top10ProductBestSale`)
        return data
    } catch (error) {
        ShowToast("Failed To Get Top 5 Product Best Sale", "ERROR")
    }
}

export const RevenueInMonth = async function () {
    try {
   
        let { data } = await axios.get<ResponeModel<RevenueInMonthResponeModel>>(`${BASE_DEV}/statistic/revenueInMonth`)
        return data
    } catch (error) {
        ShowToast("Failed To Get Revenue In Month", "ERROR")
    }
}

export const RevenueInWeek = async function () {
    try {
   
        let { data } = await axios.get<ResponeModel<RevenueInWeekResponeModel>>(`${BASE_DEV}/statistic/revenueInWeekly`)
        return data
    } catch (error) {
        ShowToast("Failed To Get Revenue In Week", "ERROR")
    }
}