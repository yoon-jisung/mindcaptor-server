
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,//'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'mindcaptorData',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'mindcaptorData',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'midcaptorData',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
};