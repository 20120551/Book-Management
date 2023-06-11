export interface ICacheService {
    set<TCache>(key: string, data: TCache, ttl: number): Promise<void>;
    get<TCache>(key: string): Promise<TCache | null>;
    remove(key: string): Promise<boolean>;
}
