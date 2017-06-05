export interface CertificatesPost extends CertificatePut {
    Certificate: string
    Password: string
}

export interface CertificatePut {
    Name: string
    Type: string
}

export interface Certificate extends CertificatePut {
    Certificate: string
    FingerPrint: string
}

/*
function Writeable(cert: Certificate):CertificatePut {
    return cert.CertificatePut
}
*/