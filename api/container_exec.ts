export interface ContainerExecControl {
    Command: string
    Args: Map<string, string>
    Signal: number
}

export interface ContainerExecPost {
    Command: string[]
    WaitForWS: boolean
    Interactive: boolean
    Environment: Map<string, string>
    Width: number
    Height: number

    RecordOutput: boolean
}