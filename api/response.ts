export type ResponseRaw = {
    Response
    Metadata: any
}

export type Response = {
    Type: ResponseType

    Status: string
    StatusCode: number

    Operation: string

    Code: number
    Error: string

    Metadata: any
}

type ResponseType = string

export const SyncResponse:ResponseType = "sync"
export const AsyncResponse:ResponseType = "async"
export const ErrorResponse:ResponseType = "error"
