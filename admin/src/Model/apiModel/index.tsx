
export interface ResponeModel<T> {
  message: string;
  data: T[];
  status?: string
}

export interface OptionModelRespone {
  optionID: number
  optionName: string
}


export interface ProductLineModel {
  productLineId?: number
  nameProductLine: string
  imageProductLine: string
}

export interface ProductLineResponeModel {
  nameProductLine: string
  imageProductLine: string
}


export interface OptionModel {
  optionName: string
  optionID?: number
}


export interface CategoriesResponeModel {
  catorgoryID?: number
  nameCategory: string
  parentID: CategoriesResponeModel | null
  productList: any[]
}



export interface CategoriesModel {
  catorgoryID?: number
  nameCategory: string
  product_lineid?: number
  parentID?: number
}


export interface ProductResponeModel {
  productId?: number
  nameProduct?: string
  quantityStock?: number
  productDescription?: string
  productSkus?: any[]
  orderProducts?: any[]
  categories_id?: number
  list_option?: number[]
}


export interface ProductModel {
  nameProduct: string
  quantityStock: number
  productDescription: string
  categories_id: number
  list_option: number[]
}


export interface ProductSkuResponeModel {
  id: ProductSkuResponeModelId
  skuName: string
  quantityStock: number
  imageProduct: string
  price: number
  skuValues: any[]
}

export interface ProductSkuResponeModelId {
  productId: number
  skuId: number
}

export interface ProductSkuModel {
  product_id?: number
  sku_id?: number
  price?: number
  sku_name: string
  quantityStock?: number
  imageProduct?: string
}




export interface CustomerResponeModel {
  customerId: number
  customerLastName: string
  customerFirstName: string
  customerPhone: string
  customerEmail: string
  enableStatus: boolean
}

export interface CustomerModel {
  customerLastName: string
  customerFirstName: string
  customerPhone: string
  customerEmail: string
}
