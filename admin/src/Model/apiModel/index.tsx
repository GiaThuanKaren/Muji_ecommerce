
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
}

export interface ProductModel {
  nameProduct: string
  quantityStock: number
  productDescription: string
  categories_id: number
  list_option: number[]
}
