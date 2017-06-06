export type ProfilesPost = {
    ProfilePut
    Name: string
}

export type ProfilePost = {
    Name: string
}

export type ProfilePut = {
    Config: Map<string, string>
    Description: string
    Devices: Map<string, Map<string, string>>
}

export type Profile = {
    ProfilePut
    Name: string
    UsedBy: string[]
}

