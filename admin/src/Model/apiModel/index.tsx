
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



