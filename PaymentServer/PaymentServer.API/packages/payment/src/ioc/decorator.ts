import { inject, injectable } from "inversify";
import { TYPES } from "./type";

export const Injectable = injectable();
export const IPaymentRepositoryModule = inject(TYPES.IPaymentRepositoryModule);
export const IPaymentEventStoreModule = inject(TYPES.IPaymentEventStoreModule);
export const DbWriteClient = inject(TYPES.DbWriteClient);
export const DbReadClient = inject(TYPES.DbReadClient);
export const IMongoClient = inject(TYPES.IMongoClient);
export const IEventEmitter = inject(TYPES.IEventEmitter);