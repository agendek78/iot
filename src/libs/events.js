module.exports = (app) =>
{
    const EventType =
    {
        None: 0,
        Hit: 1,
        Fall: 2,
        Tap: 4,
        Button: 8,
        HelmetOff: 16,
        Custom1: 32,
        Custom2: 64,
        Error: 128,
        All: 255
    };

    let EventFilter = EventType.All;

    function IsSpecifiedEventType(helmetData)
    {
        return ((helmetData.eventsRaw & EventFilter) != 0);
    };

    function IsHelmetOffEvent(helmetData)
    {
        return false;
    };

    return {
        EventType, 
        EventFilter,
        IsSpecifiedEventType,
        IsHelmetOffEvent
    };
};