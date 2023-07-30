
export interface ResponeModel<T> {
  message: string;
  data: T[];
  status?: string
}

export interface OptionModelRespone {
  optionID: number
  optionName: string
}



export interface OptionModel {
  optionName: string
  optionID?: number
}



