export type StoragePoolsPost = {
    Name: string
    Driver: string
}

export type StoragePool = {
    Name: string
    Driver: string
    UsedBy: string[]
}

export type StoragePoolPut = {
    Config: Map<string, string>
    Description: string
}

export type StorageVolumesPost = {
    StorageVolumePut
    Name: string
    Type: string
}

export type StorageVolume = {
    StorageVolumePut
    Name: string
    Type: string
    UsedBy: string[]
}

export type StorageVolumePut = {
    Config: Map<string, string>
    Description: string
}
