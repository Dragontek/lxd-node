export type ServerEnvironment = {
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

export type ServerPut = {
    Config: Map<string, any>
}

export type ServerUntrusted = {
    APIExtensions: string[]
    APIStatus: string
    APIVersion: string
    Auth: string
    Public: boolean
}

export type Server = {
    ServerPut
    ServerUntrusted
    Environment: ServerEnvironment
}