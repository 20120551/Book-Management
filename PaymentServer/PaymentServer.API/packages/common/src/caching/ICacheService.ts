export interface ICacheService {
    keys(key: string): Promise<string[]>;
    set<TCache>(key: string, data: TCache, ttl: number): Promise<void>;
    get<TCache>(key: string, ctor: new (...args: any) => TCache): Promise<TCache | null>;
    remove(key: string): Promise<boolean>;
}