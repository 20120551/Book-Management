import { DbType } from "@Infrastructure/Write/Repositories"
import { RedisType } from "@Infrastructure/Shared/Repositories"

export const env = {
    PORT: process.env.PORT,
    AMQP_URL: process.env.AMQP_URL
}

export const dbConfig: DbType = {
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT || "27017"),
}

export const redisConfig: RedisType = {
    host: process.env.REDIS_HOST || "",
    port: parseInt(process.env.REDIS_PORT || "6379")
}