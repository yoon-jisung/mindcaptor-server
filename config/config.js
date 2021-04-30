const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.LOCAL_USERNAME,
        password: process.env.LOCAL_PASSWORD,
        database: process.env.LOCAL_DB_NAME,
        host: process.env.LOCAL_HOST,
        dialect: 'mysql',
        logging: false,
    },
    test: {
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.RDS_HOST,
        port: process.env.RDS_PORT,
        dialect: 'mysql',
    },
    production: {
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.PRODUCTION_DB_NAME,
        host: process.env.RDS_HOST,
        port: process.env.RDS_PORT,
        dialect: 'mysql',
    },
};
