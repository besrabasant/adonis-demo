import env from '#start/env'
import defineCustomConfig from '../utils/define_custom_config.js'
import { CustomDatabaseConfig } from '../types/database.js'

const dbConfig = defineCustomConfig<CustomDatabaseConfig>({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    mongodb: {},
  },
})

export default dbConfig
