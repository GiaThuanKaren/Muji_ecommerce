
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
  productLineId: number,
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
  productList: any[],
  imageCategory: string
}



export interface CategoriesModel {
  catorgoryID?: number
  nameCategory: string
  product_lineid?: number
  parentID?: number,
  imageCategory: string
}


export interface ProductResponeModel {
  productId: number
  nameProduct: string
  quantityStock: number
  productDescription: string
  productSkus: ProductSkuResponeModel[]
  orderProducts: any[]
  categories: CategoriesResponeModel
  products: Product[]
  // list_option: number[]
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

export interface RoleModel {
  roleId: number
  roleName: string
}

export interface FunctionModel {
  functionId: number
  functionName: string
}

export interface PermissionModel {
  permission: {
    roleId: number
    functionId: number
  }
}

export interface PermissionResponeModel {
  // functionId: number
  function_name: string,
  slug: string
}

export interface CustomerModel {
  customerLastName: string
  customerFirstName: string
  customerPhone: string
  customerEmail: string
}

export interface EmployeeModel {
  employeeLastName: string
  employeeFirstName: string
  employeePhone: string
  employeeEmail: string
}

export interface LoginModel {
  employeeEmail: string
  employeePassword: string
}

export interface OptionValueResponeModel {
  id?: OptionValueId
  valuesName?: string
  skuValuesSet?: any
}

export interface OptionValueId {
  productId: number
  optionId: number
  valueId: number
}

export interface OptionValueModel {
  product_id: string
  option_id: string
  value_id?: string
  value_name: string
}





// export interface SkuValueResponeModel {
//   id: SkuValueId
//   valuesId: ValuesId
//   productSku: ProductSku
// }

// export interface SkuValueId {}

export interface SkuValueResponeModel {
  id: SkuValueId
  valuesId: ValuesId
  productSku: ProductSku
  option: Option
}

export interface SkuValueId {}

export interface ValuesId {
  id: Id2
  valuesName: string
}

export interface Id2 {
  productId: number
  optionId: number
  valueId: number
}

export interface ProductSku {
  id: Id3
  skuName: string
  quantityStock: number
  imageProduct: string
  price: number
}

export interface Id3 {
  productId: number
  skuId: number
}

export interface Option {
  optionID: number
  optionName: string
  optionValues: OptionValue[]
}

export interface OptionValue {
  id: Id4
  valuesName: string
}

export interface Id4 {
  productId: number
  optionId: number
  valueId: number
}

export interface SkuValueModel {
  productId: string
  skuId: string
  optionId: string
  valuesId: string
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

export interface ProductPOSModel {
  productId: number
  nameProduct: string
  quantityStock: number
  productDescription: string
  categories: Categories
  products: Product[]
  productSkus: ProductSkuPOSModel[]
  orderProducts: any[]
}

export interface ProductSkuPOSModel {
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