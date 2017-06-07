import * as api from '../api'

export interface Server {
    GetConnectionInfo():Promise<ConnectionInfo>
}

export interface ImageServer extends Server {
    GetImages():Promise<api.Image[]>
    GetImageFingerprints():Promise<string[]>

    GetImage(fingerprint:string):Promise<api.Image>
    //GetImageFile(fingerprint: string):any
    GetImageSecret(fingerprint:string):Promise<string>

    GetPrivateImage(fingerprint:string, secret:string):Promise<api.Image>
    //GetPrivateImageFile(fingerprint: string, secret: string):any

    GetImageAliases():Promise<api.ImageAliasesEntry[]>
    GetImageAliasNames():Promise<string[]>

    GetImageAlias(name:string):Promise<api.ImageAliasesEntry>
}

export interface ContainerServer extends ImageServer {

    // Server functions
    GetServer():Promise<api.Server>
    UpdateServer(server:api.ServerPut, ETag:string)
    HasExtension(extension:string):Promise<boolean>

    // Certificate functions
    GetCertificateFingerprints():Promise<string[]>
    GetCertificates():api.Certificate[]
    GetCertificate(fingerprint:string):api.Certificate
    CreateCertificate(certificate:api.CertificatesPost)
    UpdateCertificate(fingerprint:string,certificate:api.CertificatePut,ETag:string)
    DeleteCertificate(fingerprint:string)

    // Container functions
    GetContainerNames():string[]
    GetContainers():api.Container[]
    GetContainer(name:string):api.Container
    CreateContainer(container:api.ContainersPost):api.Operation
}

export type ConnectionInfo = {
    Addresses?: string[]
    Certificate?: string
    Protocol?: string
}

export interface ProgressData {
    Text: string
    
    Percentage: number

    TransferredBytes: number

    TotalBytes: number
}

export interface ImageCreateArgs {
    //MetaFile: io.Reader
    MetaName: string

    //RootfsFile: io.Reader


}