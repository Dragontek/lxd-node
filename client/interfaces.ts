import * as api from '../api'

export interface Server {
    GetConnectionInfo():any
}

export interface ImageServer extends Server {
    GetImages():api.Image[]
    GetImageFingerprints():string[]

    GetImage(fingerprint:string):api.Image
    //GetImageFile(fingerprint: string):any
    GetImageSecret(fingerprint:string):string

    GetPrivateImage(fingerprint:string, secret:string):api.Image
    //GetPrivateImageFile(fingerprint: string, secret: string):any

    GetImageAliases():api.ImageAliasesEntry[]
    GetImageAliasNames():string[]

    GetImageAlias(name:string):api.ImageAliasesEntry
}

export interface ContainerServer extends ImageServer {

    // Server functions
    GetServer():api.Server
    UpdateServer(server:api.ServerPut, ETag:string)
    HasExtension(extension:string):boolean

    // Certificate functions
    GetCertificateFingerprints():string[]
    GetCertificates():api.Certificate[]
    GetCertificate(fingerprint:string):api.Certificate
    CreateCertificate(certificate:api.CertificatesPost)
    UpdateCertificate(fingerprint:string,certificate:api.CertificatePut,ETag:string)
    DeleteCertificate(fingerprint:string)

    // Container functions
    GetContainerNames():string[]
    GetContainers():api.Container[]
    GetContainer(name:string):api.Container
    CreateContainer()
}