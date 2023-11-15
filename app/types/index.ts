export type WithRelation<T, U> = T & U

export type Data<T> = {
  success: true
  data: T
}

export type ResultError = {
  success: false
  type?: string | number
  error: string
}

export type Result<T> = Data<T> | ResultError