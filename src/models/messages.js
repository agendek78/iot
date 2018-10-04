module.exports = (sequalize, DataType) =>
{
    const Messages = sequalize.define('Messages', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        appEui: {
            type: DataType.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        devEui: {
            type: DataType.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        devClass: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        lifeTimeStamp: {
            type: DataType.DATE,
            allowNull: false
        },
        serverDateTime: {
            type: DataType.DATE,
            allowNull: false
        },
        active: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        event: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        eventFilter: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        zone: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        battery: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        gpsFix: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0            
        },
        gpsSats: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        gpsHeight: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        helmetOn: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        latitude: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        longitude: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        pressure: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        temperature1: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        temperature2: {
            type: DataType.FLOAT,
            allowNull: false,
            defaultValue: 0.0            
        },
        timeStamp: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    // Messages.associate = (models) =>
    // {
    //     Messages.belongsTo(models.)
    // };

    return Messages;
};