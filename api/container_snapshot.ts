export type ContainerSnapshotsPost = {
    Name: string
    Stateful: boolean
}

export type ContainerSnapshotPost = {
    Name: string
    Migration: boolean
}

export type ContainerSnapshot = {
    Architecture: string
    Config: Map<string, string>
    CreationDate: Date
    Devices: Map<string, Map<string, string>>
    Ephemeral: boolean
    ExpandedConfig: Map<string, string>
    ExpandedDevices: Map<string, Map<string, string>>
    LastUsedDate: Date
    Name: string
    Profiles: string[]
    Stateful: boolean
}