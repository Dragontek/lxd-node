export interface ContainerStatePut {
    Action: string
    Timeout: number
    Force: boolean
    Stateful: boolean
}

export interface ContainerState {
    Status: string
    Disk: Map<string, ContainerStateDisk>
    Memory: ContainerStateMemory
    Network: Map<string, ContainerStateNetwork>
    Pid: number
    Process: number

    CPU: ContainerStateCPU
}

export interface ContainerStateDisk {
    Usage: number
}

export interface ContainerStateCPU {
    Usage: number
}

export interface ContainerStateMemory {
    Usage: number
    UsagePeak: number
    SwapUsage: number
    SwapUsagePeak: number
}

export interface ContainerStateNetwork {
    Addresses: ContainerStateNetworkAddress[]
    Counters: ContainerStateNetworkCounters
    Hwaddr: string
    HostName: string
    Mtu: number
    State: string
    Type: string
}

export interface ContainerStateNetworkAddress {
    Family: string
    Address: string
    Netmask: string
    Scop: string
}

export interface ContainerStateNetworkCounters {
    BytesReceived: number
    BytesSent: number
    PacketsReceived: number
    PacketsSent: number
}