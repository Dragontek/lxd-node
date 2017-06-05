export interface ProfilesPost extends ProfilePut {
    Name: string
}

export interface ProfilePost {
    Name: string
}

export interface ProfilePut {
    Config: Map<string, string>
    Description: string
    Devices: Map<string, Map<string, string>>
}

export interface Profile extends ProfilePut {
    Name: string
    UsedBy: string[]
}

