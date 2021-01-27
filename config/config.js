require('dotenv').config({ silent: env === 'production'})
/*
const devConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  migrationStorageTableName: 'migrations'
};

module.exports = {
  development: devConfig,
  production: devConfig
};
*/