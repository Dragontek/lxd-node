export interface ServerEnvironment {
    Addresses: string[]
    Architectures: string[]
    Certificate: string
    CertificateFingerprint: string
    Driver: string
    DriverVersion: string
    Kernel: string
    KernelArchitecture: string
    KernelVersion: string
    Server: string
    ServerPid: number
    ServerVersion: string
    Storage: string
    StorageVersion: string
}

export interface ServerPut {
    Config: Map<string, any>
}

export interface ServerUntrusted {
    APIExtensions: string[]
    APIStatus: string
    APIVersion: string
    Auth: string
    Public: boolean
}

export interface Server extends ServerPut, ServerUntrusted {
    Environment: ServerEnvironment
}