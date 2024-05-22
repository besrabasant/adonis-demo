import { ConnectionConfig, DatabaseConfig } from '@adonisjs/lucid/types/database'

export type MongoDBConfig = {
  // host: string
  // port: number
  // database: string
  // user?: string
  // password?: string
  // options?: Record<string, any>
}

export type CustomConnectionConfig = ConnectionConfig | MongoDBConfig

export interface CustomDatabaseConfig extends Omit<DatabaseConfig, 'connections'> {
  connections: {
    [key: string]: CustomConnectionConfig
  }
}
