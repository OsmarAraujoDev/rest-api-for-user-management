const { dbConfig } = require('./env');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.user, 
    dbConfig.password,
    { host: dbConfig.host, dialect: 'mysql', logging: false }
);

module.exports = sequelize;