import ICacheService from "./ICacheService";
import { CacheClient } from "@Infrastructure/Shared/Repositories";
export default class CacheService implements ICacheService {
    private readonly _cache;
    constructor(cache: CacheClient);
    Get<TSet>(key: string): Promise<TSet | null>;
    Set<TSet>(key: string, data: TSet, ttl: number): Promise<any>;
    Remove(key: string): Promise<any>;
}
//# sourceMappingURL=CacheService.d.ts.map