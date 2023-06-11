import axios from "axios";
import { Consul } from "consul";
import { IConsul, Injectable } from "../ioc";
import { ConsulClientOptions, ConsulServiceResponse, IConsulClient } from "./IConsulClient";
import { plainToInstance } from "class-transformer";

@Injectable
export class ConsultClient implements IConsulClient {
    constructor(
        @IConsul private readonly _consul: Consul
    ) {
    }
    async get<TResult>(
        name: string,
        options: ConsulClientOptions,
        ctor: new (...args: any) => TResult): Promise<TResult> {
        const services = await this._consul.catalog.service.list<ConsulServiceResponse>();

        const serviceGroup = services[name]; // array
        if (serviceGroup === undefined || serviceGroup.length === 0) {
            throw new Error();
        }

        // random any service on 
        const random = Math.floor(Math.random() * serviceGroup.length);

        const service = serviceGroup[random];

        // create url
        const { address, port } = service;
        let { protocal, endPoint, user } = options;
        if (!protocal.includes("://")) {
            protocal += "://";
        }
        if (endPoint[0] !== "/") {
            endPoint = "/" + endPoint;
        }

        const url = protocal + address + ":" + port + endPoint;
        const orderResponse = await axios.get(url,
            {
                headers: {
                    "X-AUTHENTICATED": user?.authenticated,
                    "X-USER-ID": user?.userId,
                    "X-ROLES-NAME": user?.roles,
                    "X-OPERATORS-METHOD": user?.operators
                }
            });

        // success
        if (orderResponse.status >= 400) {
            throw new Error();
        }

        const response = plainToInstance(ctor, orderResponse.data);
        return response;
    }

}