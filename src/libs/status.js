module.exports = (app) => {
    const StatusType = {
        NotDefinied: 0,
        Alarm: 1, //Red
        Warrning: 2, //Yellow
        Ok: 3, //Green
        NoFix: 4, //Blue
        ActiveNotMonitored: 5, //Gray
        NotActiveNotMonitored: 6, //Black
        HelmetError: 7, //Yellow
        AlarmWithHelmetOff: 8, //Yellow
    };


    function getStatus(zoneInfo, helmetData) {
        if (zoneInfo.isInMonitoredArea && app.libs.events.IsSpecifiedEventType(helmetData)) {
            if (helmetData.events.error) {
                return StatusType.HelmetError;
            }

            if (!helmetData.events.helmetOn && app.libs.events.IsHelmetOffEvent(helmetData)) {
                return StatusType.Alarm;
            }

            // if (!helmetData.events.helmetOn && helmetData.eventsRaw != app.libs.events.EventType.None) {
            //     return StatusType.AlarmWithHelmetOff;
            // }

            if (helmetData.events.hit ||
                helmetData.events.fall ||
                helmetData.events.tap ||
                helmetData.events.button) {
                return StatusType.Alarm;
            }

            //if (!helmetData.events.helmetOn || !helmetData.events.active) {
            //    return StatusType.Warrning;
            //}

            if (helmetData.gpsInfo.gpsFix == 0) {
                return StatusType.NoFix;
            }

            return StatusType.Ok;
        }

        if (helmetData.events.active) {
            return StatusType.ActiveNotMonitored;
        }

        return StatusType.NotActiveNotMonitored;
    };

    return {
        getStatus,
        StatusType
    };
};
