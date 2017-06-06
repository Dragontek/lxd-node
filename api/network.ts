export type NetworksPost = {
    NetworkPut
    Managed: boolean
    Name: string
    Type: string
}

export type NetworkPost = {
    Name: string
}

export type NetworkPut = {
    Config: Map<string, string>
    Description: string
}

export type Network = {
    NetworkPut

    Name: string
    Type: string
    UsedBy: string[]

    Managed: boolean
}
