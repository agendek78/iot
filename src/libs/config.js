module.exports = {
    database: 'iotbackend',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'backend-db.sqlite',
        define: {
            underscore: true
        },
        operatorsAliases: false
    },
    mqttBroker: 'mqtt://13.93.80.46',
    https: {
        key: '/etc/letsencrypt/live/demo.connectyourworker.com/privkey.pem',
        cert: '/etc/letsencrypt/live/demo.connectyourworker.com/fullchain.pem'
    }
};