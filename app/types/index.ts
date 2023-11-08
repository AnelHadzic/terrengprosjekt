export type WithRelation<T, U> = T & U

export type Data<T> = {
  success: true
  data: T
}

export type ResultError = {
  success: false
  type?: string
  error: string
}

export type Result<T> = Data<T> | ResultError