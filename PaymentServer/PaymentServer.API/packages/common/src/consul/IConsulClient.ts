export type ConsulServiceAuthentication = {
    authenticated: boolean,
    userId: string,
    roles: string[],
    operators: string[]
}
export type ConsulClientOptions = {
    protocal: string,
    endPoint: string
    user?: ConsulServiceAuthentication
}

export type ConsulServiceDetail = {
    address: string,
    port: number,
    serviceId: string
}

export type ConsulServiceResponse = {
    [x: string]: ConsulServiceDetail[]
}

export interface IConsulClient {
    get<TResult>(
        name: string,
        options: ConsulClientOptions,
        ctor: new (...args: any) => TResult): Promise<TResult>;
}