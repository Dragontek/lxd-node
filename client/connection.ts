import { ProtocolLXD } from './lxd'
import { tlsHTTPClient } from './util'
import { request } from 'request'

export type ConnectionArgs = {
    TLSServerCert: string
    TLSClientCert: string
    TLSClientKey: string
    TLSCA: string
    UserAgent: string

}

export function ConnectLXD(url: string, args: ConnectionArgs) {
    let server = {
        httpCertificate: args.TLSServerCert,
        httpHost: url,
        httpProtocol: "https",
        httpUserAgent: args.UserAgent
    } as ProtocolLXD

    //var client = tlsHTTPClient(args.TLSClientCert, args.TLSClientKey, args.TLSCA, args.TLSServerCert);

    this.https = tlsHTTPClient(args.TLSClientCert, args.TLSClientKey, args.TLSCA, args.TLSServerCert);
}

