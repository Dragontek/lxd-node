export interface ImagesPost extends ImagePut {
    Filename: string
    Source: ImagesPostSource

    CompressionAlgorithm: string

    Aliases: ImageAlias[]
}

export interface ImagesPostSource extends ImageSource {
    Mode: string
    Type: string

    URL: string

    Name: string

    Fingerprint: string
    Secret: string
}

export interface ImagePut {
    AutoUpdate: boolean
    Properties: Map<string, string>
    Public: boolean
}

export interface Image extends ImagePut {
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

/*
function Writeable(img: Image):ImagePut {
    return img.ImagePut
}
*/

export interface ImageAlias {
    Name: string
    Description: string
}

export interface ImageSource {
    Alias: string
    Certificate: string
    Protocol: string
    Server: string
}

export interface ImageAliasesPost extends ImageAliasesEntry {
    ImageAliasEntry
}

export interface ImageAliasesEntryPost {
    Name: string
}

export interface ImageAliasesPut {
    Description: string
    Target: string
}

export interface ImageAliasesEntry extends ImageAliasesPut {
    Name: string
}