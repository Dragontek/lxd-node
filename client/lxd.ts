
import * as api from '../api'
//import * as http from 'http'
//import * as https from 'https'
//import * as restler from 'restler'
//import * as tp from '../Promisify'
import * as fmt from 'sprintf-js'
import * as request from 'request'

import { ConnectionInfo, Server, ContainerServer, ImageServer } from './interfaces'

export class ProtocolLXD {
    server: api.Server

    eventListeners: EventListener[]
    eventListneresLock: any

    http: request.Request
    httpCertificate: string
    httpHost: string
    httpProtocol: string
    httpUserAgent: string
    
    constructor(url: string, certificate: string, key: string) {

    }

    GetConnectionInfo():ConnectionInfo { 
        let info: ConnectionInfo
        info.Certificate = this.httpCertificate
        info.Protocol = "lxd"
        
        let urls: string[]
        if(this.server.Environment.Addresses.length > 0) {
            if(this.httpProtocol === "https") {
                urls.push(this.httpHost)
            }

            for(let addr in this.server.Environment.Addresses) {
                let url = fmt.sprintf("https://%s", addr)

                if(urls.indexOf(url) > -1) {
                    urls.push(url)
                }
            }
        }

        info.Addresses = urls

        return info
    }


    // Internal functions
    rawQuery(method: string, url: string, data: any, ETag: string):Promise<api.Response> {
        let req = {}
        
        if(data != null) {
            req.headers.set("Content-Type", "application/json")
        }

        if(this.httpUserAgent != "") {
            req.headers.set("User-Agent", this.httpUserAgent)
        }

        if(ETag != "") {
            req.headers.set("If-Match", ETag)
        }

        let response: api.Response
        
        
        /*
        return new Promise((resolve, reject) => {
            this.https(req).request(req, (res) => {
                let etag:string = res.headers.get("ETag")
                
                const body = []
                res.on('data', (d) => {
                    body.push(d)
                })

                res.on('end', () => {
                    response = JSON.parse(body.join(''))
                    if(response.StatusCode != 200)
                    {
                        reject(fmt.sprintf("Failed to fetch %s: %s", url, response.Status))
                    }
                    
                    if(response.Type === api.ErrorResponse)
                    {
                        reject(response.Error)
                    }

                    resolve(response)
                })
            }).on('error', (e) => {
                reject(e)
            });
        });
        */
    }

    query(method: string, path: string, data: any, ETag: string):Promise<api.Response> {
        let url:string = fmt.sprintf("%s/1.0%s", this.httpHost, path)
        return this.rawQuery(method, url, data, ETag)
    }

}
