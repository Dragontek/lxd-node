export interface NetworksPost extends NetworkPut {
    Managed: boolean
    Name: string
    Type: string
}

export interface NetworkPost {
    Name: string
}

export interface NetworkPut {
    Config: Map<string, string>
    Description: string
}

export interface Network extends NetworkPut {
    Name: string
    Type: string
    UsedBy: string[]

    Managed: boolean
}
