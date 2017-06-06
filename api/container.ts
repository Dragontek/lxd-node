import { StatusCode } from './status_code'

export type ContainersPost = {
    ContainerPut
    Name: string
    Source: ContainerSource
}

export type ContainerPost = {
    // Used for renames
    Name: string
    // Used for migration
    Migration: boolean
    // API extension: container_stateless_copy
    Live: boolean
    // API extension: container_only_migration
    ContainerOnly: boolean
}

export type ContainerPut = {
    Description: string
    Architecture: string
    Config: Map<string, string>
    Devices: Map<string, Map<string, string>>
    Ephemeral: boolean
    Profiles: string[]
    Restore: string
    Stateful: boolean
}

export type Container = {
    ContainerPut
    CreatedAt: Date
    ExpandedConfig: Map<string, string>
    ExpandedDevices: Map<string, Map<string, string>>
    Name: string
    Status: string
    StatusCode: StatusCode
}

export function Writeable(c: Container):ContainerPut {
    return c.ContainerPut
}

function IsActive(c: Container):boolean {
    switch (c.Status) {
        case 'Stopped':
            return false
        case 'Error':
            return false
        default:
            return true
    }
}

export type ContainerSource = {
    Type: string
    Certificate: string

    Alias: string
    Fingerprint: string
    Properties: Map<string, string>
    Server: string
    Secret: string
    Protocol: string

    BaseImage: string
    Mode: string
    Operation: string
    Websockets: Map<string, string>

    Live: boolean

    Source: string

    ContainerOnly: string
}