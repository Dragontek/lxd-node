export type ImagesPost = {
    ImagePut

    Filename: string
    Source: ImagesPostSource

    CompressionAlgorithm: string

    Aliases: ImageAlias[]
}

export type ImagesPostSource = {
    ImageSource

    Mode: string
    Type: string

    URL: string

    Name: string

    Fingerprint: string
    Secret: string
}

export type ImagePut = {
    AutoUpdate: boolean
    Properties: Map<string, string>
    Public: boolean
}

export type Image = {
    ImagePut

    Aliases: ImageAlias[]
    Architecture: string
    Cached: boolean
    Filename: string
    Fingerprint: string
    Size: number
    UpdateSource: ImageSource

    CreatedAt: Date
    ExpiresAt: Date
    LastUsedAt: Date
    UploadedAt: Date
}

function Writeable(img: Image):ImagePut {
    return img.ImagePut
}

export type ImageAlias = {
    Name: string
    Description: string
}

export type ImageSource = {
    Alias: string
    Certificate: string
    Protocol: string
    Server: string
}

export type ImageAliasesPost = {
    ImageAliasesEntry
}

export type ImageAliasesEntryPost = {
    Name: string
}

export type ImageAliasesPut = {
    Description: string
    Target: string
}

export type ImageAliasesEntry = {
    ImageAliasesPut
    Name: string
}