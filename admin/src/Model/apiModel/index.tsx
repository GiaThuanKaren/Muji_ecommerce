
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
  parentID?:number
}
