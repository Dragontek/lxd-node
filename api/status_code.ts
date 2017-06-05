export enum StatusCode {
    OperationCreated = 100,
    Started = 101,
    Stopped = 102,
    Running = 103,
    Cancelling = 104,
    Pending = 105,
    Starting = 106,
    Stopping = 107,
    Aborting = 108,
    Freezing = 109,
    Frozen = 110,
    Thawed = 111,
    Error = 112,

    Success = 200,

    Failure = 400,
    Cancelled = 401
}