export type ContainerStatePut = {
    Action: string
    Timeout: number
    Force: boolean
    Stateful: boolean
}

export type ContainerState = {
    Status: string
    Disk: Map<string, ContainerStateDisk>
    Memory: ContainerStateMemory
    Network: Map<string, ContainerStateNetwork>
    Pid: number
    Process: number

    CPU: ContainerStateCPU
}

export type ContainerStateDisk = {
    Usage: number
}

export type ContainerStateCPU = {
    Usage: number
}

export type ContainerStateMemory = {
    Usage: number
    UsagePeak: number
    SwapUsage: number
    SwapUsagePeak: number
}

export type ContainerStateNetwork = {
    Addresses: ContainerStateNetworkAddress[]
    Counters: ContainerStateNetworkCounters
    Hwaddr: string
    HostName: string
    Mtu: number
    State: string
    Type: string
}

export type ContainerStateNetworkAddress = {
    Family: string
    Address: string
    Netmask: string
    Scop: string
}

export type ContainerStateNetworkCounters = {
    BytesReceived: number
    BytesSent: number
    PacketsReceived: number
    PacketsSent: number
}