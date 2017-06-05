export interface StoragePoolsPost {
    Name: string
    Driver: string
}

export interface StoragePool {
    Name: string
    Driver: string
    UsedBy: string[]
}

export interface StoragePoolPut {
    Config: Map<string, string>
    Description: string
}

export interface StorageVolumesPostn extends StorageVolumePut {
    Name: string
    Type: string
}

export interface StorageVolume extends StorageVolumePut {
    Name: string
    Type: string
    UsedBy: string[]
}

export interface StorageVolumePut {
    Config: Map<string, string>
    Description: string
}
