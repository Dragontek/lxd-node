import { StatusCode } from './status_code'

export type Operation = {
    ID: string
    Class: string
    CreatedAt: Date
    UpdatedAt: Date
    Status: string
    StatusCode: StatusCode
    Resources: Map<string, string[]>
    Metadata: Map<string, any>
    MayCancel: boolean
    Err: string
}