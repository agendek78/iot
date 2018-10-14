const mqtt = require('mqtt');
const https = require("https");
const fs = require("fs");

module.exports = app => 
{
    const config = app.libs.config;

    app.mqttClinet = mqtt.connect(config.mqttBroker);

    function createRestServers(app)
    {
        const port = app.get('port');
       
        app.listen(port, () => 
        {
            console.log(`REST API on port ${port}`);
        });

        try
        {
            const options = {
                key: fs.readFileSync(config.https.key),
                cert: fs.readFileSync(config.https.cert)
            };

            https.createServer(options, app).listen(port + 30);
        }
        catch (err)
        {
            console.log(`Unable to setup HTTPS server! Error ${err.message}`);
        }
    }    

    app.db.sequelize.sync().done(() => 
    {
        createRestServers(app);

        app.mqttClinet.on('connect', () => {
            console.log('Connected to MQTT broker!');
            app.mqttClinet.subscribe('application/#');
        });

        app.mqttClinet.on('message', (topic, message) => {
            console.log(`Message from ${topic}, len ${message.length}`);
            const json = JSON.parse(message.toString()); 
            console.log(json);
            //console.log(Buffer.from(json.data, 'base64'));
            const helmetData = app.libs.helmet(json);
            const zoneInfo = app.libs.zone.checkZone(json);

            const Messages = app.db.models.Messages;
            const record = {
                appEui: helmetData.appEUI,
                devEui: helmetData.devEUI,
                deviceId: helmetData.deviceId,
                devClass: helmetData.devClass,
                serverDateTime: helmetData.rxTime,
                active: helmetData.events.active,
                event: helmetData.eventsRaw,
                battery: helmetData.battery,
                gpsFix: helmetData.gpsInfo.gpsFix,
                gpsSats: helmetData.gpsInfo.gpsSats,
                gpsHeight: helmetData.gpsInfo.height,
                helmetOn: helmetData.events.helmetOn,
                latitude: helmetData.gpsInfo.latitude,
                longitude: helmetData.gpsInfo.longitude,
                pressure: helmetData.env.pressure,
                temperature1: helmetData.env.temp1,
                temperature2: helmetData.env.temp2,
                timeStamp: helmetData.timestamp,
                zone: zoneInfo.zone,
                status: app.libs.status.getStatus(zoneInfo, helmetData)
            };

            console.log(record);
            Messages.create(record);
            //.catch( err => console.lo)
        });
    });    
}
