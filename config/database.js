const { dbConfig } = require('./env');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.name, 
    dbConfig.user, 
    dbConfig.password,
    { host: dbConfig.host, dialect: 'mysql' }
);

module.exports = sequelize;