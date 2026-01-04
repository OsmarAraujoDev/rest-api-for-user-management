require('dotenv').config();

const config = {
    development: {
        serverConfig: {
            port: process.env.PORT,
            hostname: process.env.HOSTNAME
        },
        dbConfig: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];