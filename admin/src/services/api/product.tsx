import axios from "axios";
import { ProductModel, ProductResponeModel, ResponeModel } from "src/Model/apiModel";
import { BASE_DEV, BASE_PRO } from ".";
import { ShowToast } from "src/utils";



export const FetchAllProduct = async function (currentPage?: number, limit?: number, name?: string) {
    try {
        const params = {
            _page: currentPage,
            _limit: limit,
            _name: name
        }
        let { data } = await axios.get<ResponeModel<ProductResponeModel>>(`${BASE_DEV}/product/fetchAll`, { params })
        // let arr = data.data.filter((item: ProductResponeModel) => {
        //     return item.categorie.parentID != null
        // })
        // data.data = arr
        return data
    } catch (error) {
        ShowToast("Failed To Get All Product ", "ERROR")
    }
}

export const CreateNewProduct = async function (productModel: ProductModel) {
    try {
        let { data } = await axios.post<ResponeModel<ProductResponeModel>>(`${BASE_DEV}/product/create_new`, productModel)
        console.log(data)
        ShowToast("Created New Product Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Create New Product", "ERROR")
    }

}

export const GetDetailProductById = async function (productId?: string) {
    try {
        interface ResponeModel1<T> {
            status: string,
            message: string,
            data: T
        }
        let { data } = await axios.get<ResponeModel1<ProductResponeModel>>(`${BASE_DEV}/product/getproductbyid?productid=${productId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateProductId = async function (productModel: ProductResponeModel) {
    console.log('cate ', productModel);
    try {
        interface UpdateProductMdodel {
            productId: number
            nameProduct: string
            quantityStock: number
            productDescription: string
            categories_id: number
            list_option: number[]
            // product_sky: number
        }
        let updatePayLoad: UpdateProductMdodel = {
            productId: productModel.productId as number,
            nameProduct: productModel.nameProduct,
            quantityStock: productModel.quantityStock,
            productDescription: productModel.productDescription,
            categories_id: productModel.categories_id as number,
            list_option: productModel.list_option,
            // product_sky
        }
        let { data } = await axios.put(`${BASE_DEV}/product/updateProductByID`, updatePayLoad)
        console.log(data)
        ShowToast("Updated Product Sucessfully", "INFO")
    } catch (error) {
        console.log(error)
        ShowToast("Failed To Update  Product", "ERROR")
    }
}

export const DeleteProductById = async function (id: number) {
    try {
        await axios.delete(`${BASE_DEV}/product/deleteProduct/${id}`)
        ShowToast("Deleted Product Sucessfully", "INFO")
    } catch (error) {
        ShowToast("Failed To Delete This Product", "ERROR")
    }
}