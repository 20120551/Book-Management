export default interface ICacheService {
    Get<TSet>(key: string): Promise<TSet | null>;
    Set<TSet>(key: string, data: TSet, ttl: number): Promise<any>;
    Remove(key: string): Promise<any>;
}
//# sourceMappingURL=ICacheService.d.ts.map