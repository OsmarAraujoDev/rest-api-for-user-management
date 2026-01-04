const { serverConfig } = require('./config/env');
const sequelize = require('./config/database');
const app = require('./app');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.listen(serverConfig.port, () => {
    console.log(`Listening on ${serverConfig.hostname}:${serverConfig.port}`);
});