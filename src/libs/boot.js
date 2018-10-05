const mqtt = require('mqtt');

module.exports = app => 
{
    const port = app.get('port');

    app.mqttClinet = mqtt.connect('mqtt://13.93.80.46');

    app.db.sequelize.sync().done(() => {
        app.listen(port, () => 
        {
            console.log(`REST API on port ${port}`);
        });

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
                status: 0
            };

            console.log(record);
            Messages.create(record);
            //.catch( err => console.lo)
        });
    });    
}