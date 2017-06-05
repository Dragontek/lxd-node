import { StatusCode } from './status_code'

export interface ContainersPost extends ContainerPut {
    Name: string
    Source: ContainerSource
}

export interface ContainerPost {
    // Used for renames
    Name: string
    // Used for migration
    Migration: boolean
    // API extension: container_stateless_copy
    Live: boolean
    // API extension: container_only_migration
    ContainerOnly: boolean
}

export interface ContainerPut {
    Description: string
    Architecture: string
    Config: Map<string, string>
    Devices: Map<string, Map<string, string>>
    Ephemeral: boolean
    Profiles: string[]
    Restore: string
    Stateful: boolean
}

export interface Container extends ContainerPut {
    CreatedAt: Date
    ExpandedConfig: Map<string, string>
    ExpandedDevices: Map<string, Map<string, string>>
    Name: string
    Status: string
    StatusCode: StatusCode
}

/*
function Writeable(c: Container):ContainerPut {
    return c.ContainerPut
}
*/

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

export interface ContainerSource {
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