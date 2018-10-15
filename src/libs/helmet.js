module.exports = app => {

    return (loraMessage) => {
        const rawMessage = Buffer.from(loraMessage.data, 'base64');
        return {
            appEUI: loraMessage.applicationID,
            devEUI: loraMessage.devEUI,
            deviceId: rawMessage.readUInt32LE(0),
            timestamp: rawMessage.readUInt32LE(4),
            devClass: rawMessage[8],
            battery: rawMessage[9],
            events: {
                hit: ((rawMessage[10] & 0x01) != 0),
                fall: ((rawMessage[10] & 0x02) != 0),
                tap: ((rawMessage[10] & 0x04) != 0),
                button: ((rawMessage[10] & 0x08) != 0),
                helmetOn: ((rawMessage[10] & 0x10) != 0),
                active: ((rawMessage[10] & 0x20) != 0),
                repeated: ((rawMessage[10] & 0x40) != 0),
                error: ((rawMessage[10] & 0x80) != 0)
            },
            eventsRaw: rawMessage[10],
            gpsInfo: {
                gpsFix: rawMessage[11] & 0x0F,
                gpsSats: ((rawMessage[11] & 0xF0) >> 4),
                latitude: rawMessage.readInt32LE(12) / 100000.0,
                longitude: rawMessage.readInt32LE(16) / 100000.0,
                height: rawMessage.readInt32LE(28) / 100.0
            },
            env: {
                pressure: rawMessage.readUInt32LE(20) / 100.0,
                temp1: rawMessage.readInt16LE(24) / 100.0,
                temp2: rawMessage.readInt16LE(26) / 100.0
            },
            rxTime: loraMessage.rxInfo[0].time ? new Date(Date.parse(loraMessage.rxInfo[0].time)) : new Date()
        };
    };
};