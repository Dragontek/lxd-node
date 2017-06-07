import { request } from 'request'

export function tlsHTTPClient(tlsClientCert: string, tlsClientKey: string, tlsCA: string, tlsServerCert: string):request {
    return request.defaults({
        agentOptions: {
            cert: tlsClientCert,
            key: tlsClientKey,
            ca: tlsCA
        }
    })
}