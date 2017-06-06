export type CertificatesPost = {
    CertificatePut
    Certificate: string
    Password: string
}

export type CertificatePut = {
    Name: string
    Type: string
}

export type Certificate = {
    CertificatePut
    Certificate: string
    FingerPrint: string
}

export function Writeable(cert: Certificate):CertificatePut {
    return cert.CertificatePut
}

