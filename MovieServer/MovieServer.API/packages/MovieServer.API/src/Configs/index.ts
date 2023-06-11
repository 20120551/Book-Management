import { DbReadType, DbWriteType, RedisType } from "@movie/infrastructure"

export const env = {
    PORT: process.env.PORT,
    AMQP_URL: process.env.AMQP_URL
}

export const dbReadSideConfig: DbReadType = {
    database: process.env.READ_DB_NAME || "",
    host: process.env.READ_DB_HOST || "",
    username: process.env.READ_DB_USERNAME || "",
    password: process.env.READ_DB_PASSWORD || "",
    port: parseInt(process.env.READ_DB_PORT || "27017"),
}

export const dbWriteSideConfig: DbWriteType = {
    database: process.env.WRITE_DB_NAME || "",
    host: process.env.WRITE_DB_HOST || "",
    username: process.env.WRITE_DB_USERNAME || "",
    password: process.env.WRITE_DB_PASSWORD || "",
    port: parseInt(process.env.WRITE_DB_PORT || "1433"),
}

export const redisConfig: RedisType = {
    host: process.env.REDIS_HOST || "",
    port: parseInt(process.env.REDIS_PORT || "6379")
}