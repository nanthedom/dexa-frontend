export interface ErrorResponse {
    success: boolean,
    statusCode: number,
    message: string,
}

export interface GeneralResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: T
}

export interface GeneralListResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: {
        data: T[],
        meta: {
            totalData: number
            totalPage: number
            from: number | null
            to: number | null
        }
    }
}
