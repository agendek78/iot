module.exports = (app) =>
{
    const ZoneType = 
    {
        NotMonitored: 0,
        Monitored: 1,
    };

    function checkZone(loraMessage) 
    {
        return {
            isInMonitoredArea : true, //will be handled in the future
            zone: ZoneType.Monitored
        };
    };

    return { checkZone, ZoneType};
};