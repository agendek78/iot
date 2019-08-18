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
        logging: false
    },
    //mqttBroker: 'mqtt://13.93.80.46',
    mqttBroker: 'ws://127.0.0.1:9001',
    // mqttBroker: 'mqtt://127.0.0.1:1883',
    https: {
        key: '/etc/letsencrypt/live/demo.connectyourworker.com/privkey.pem',
        cert: '/etc/letsencrypt/live/demo.connectyourworker.com/fullchain.pem'
    },
    wsParams: {
	port: 3040
    },
};
