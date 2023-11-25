
export interface ResponeModel<T> {
    status: string,
    message: string,
    data: T[]
}

export interface CategoriesModel {
    catorgoryID: number
    nameCategory: string
    parentID: CategoriesModel | null
    imageCategory: string | null
}


export interface ProductLineModel {
    productLineId: number
    nameProductLine: string
    imageProductLine: string
    categoriesList: CategoriesModel[]
}




export interface ProductModel {
    productId: number
    nameProduct: string
    quantityStock: number
    productDescription: string
    categories: Categories
    products: Product[]
    productSkus: ProductSkuModel[]
    orderProducts: any[]
}

export interface Categories {
    catorgoryID: number
    nameCategory: string
    imageCategory: string
    parentID: ParentId
}

export interface ParentId {
    catorgoryID: number
    nameCategory: string
    imageCategory: any
    parentID: any
}

export interface Product {
    id: Id
    option: Option
}

export interface Id { }

export interface Option {
    optionID: number
    optionName: string
    optionValues: OptionValues[]
}

export interface OptionValues {
    id: OptionValuesId
    valuesName: string
}

export interface OptionValuesId {
    productId: number
    optionId: number
    valueId: number
}




export interface ProductSkuModel {
    id: ProductSkuId
    skuName: string
    quantityStock: number
    imageProduct: string
    price: number
}

export interface ProductSkuId {
    productId: number
    skuId: number
}



export interface RegisterModel {
    customerLastName: string
    customerFirstName: string
    customerPhone: string
    customerEmail: string
    password: string
}


export interface LoginModel {
    customerEmail: string
    password: string
}



export interface NewOrderInf {
    customerId: number
    statusID: number
    shippingTypeID: number
    employeeId: number
    listproductOrdered: ListproductOrdered[]
}

export interface ListproductOrdered {
    skuId: number
    productId: number
    quantity: number
    optionId: string
    valuesId: string
}


export interface OptionValueListWithProductIdINF {
    values_name: string
    product_id: number
    values_id: number
    quantity: number
    option_id: number
    value_id: number
    sku_id: number
}
