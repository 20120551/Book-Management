export type LoggerOptions = {
    env: string;
    level: string;
};
export declare function getLogger({ env, level }: LoggerOptions): import("winston").Logger;
