/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
export declare const MovieSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    collection: string;
}>, {
    Actors: {
        Id?: number | undefined;
        Name?: string | undefined;
        Role?: string | undefined;
    }[];
    Id?: string | undefined;
    Name?: string | undefined;
    Status?: string | undefined;
    Slot?: string | undefined;
    Price?: string | undefined;
    Localization?: {
        District?: string | undefined;
        City?: string | undefined;
    } | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    Actors: {
        Id?: number | undefined;
        Name?: string | undefined;
        Role?: string | undefined;
    }[];
    Id?: string | undefined;
    Name?: string | undefined;
    Status?: string | undefined;
    Slot?: string | undefined;
    Price?: string | undefined;
    Localization?: {
        District?: string | undefined;
        City?: string | undefined;
    } | undefined;
}>> & Omit<import("mongoose").FlatRecord<{
    Actors: {
        Id?: number | undefined;
        Name?: string | undefined;
        Role?: string | undefined;
    }[];
    Id?: string | undefined;
    Name?: string | undefined;
    Status?: string | undefined;
    Slot?: string | undefined;
    Price?: string | undefined;
    Localization?: {
        District?: string | undefined;
        City?: string | undefined;
    } | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
//# sourceMappingURL=MovieSchema.d.ts.map