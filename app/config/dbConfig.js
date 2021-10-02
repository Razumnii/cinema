require('dotenv').config()

module.exports = {
  production: {
    database: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false,
      define: {
        createdAt: 'ts_create',
        updatedAt: 'ts_update',
        freezeTableName: true,
      },
    },
  },
  development: {
    database: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false,
      define: {
        createdAt: 'ts_create',
        updatedAt: 'ts_update',
        freezeTableName: true,
      },
    },
  },
};