
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
