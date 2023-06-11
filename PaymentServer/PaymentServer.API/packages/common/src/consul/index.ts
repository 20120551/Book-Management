import Consul from "consul";

export * from "./ConsultClient";
export * from "./IConsulClient";

export type ConsulOptions = {
    host: string,
    port: string,
}

export type ConsulServiceOptions = {
    serviceName: string,
    serviceId: string,
    address: string,
    port: number,
    check?: ConsulCheckOptions
}

export type ConsulCheckOptions = {
    http: string,
    interval: string
}

export async function createConsulConnection(
    { host, port }: ConsulOptions,
    { serviceId, serviceName, address, port: servicePort, check }: ConsulServiceOptions) {
    const consul = new Consul({ host, port });
    // register
    await consul.agent.service.register({
        name: serviceName,
        id: serviceId,
        address,
        port: servicePort,
        check
    });
    return consul;
}