module.exports = (sequalize, DataType) => {
    const Messages = sequalize.define('Messages', {
        appEui: {
            type: DataType.CHAR(16),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        devEui: {
            type: DataType.CHAR(16),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        deviceId: {
            type: DataType.STRING,
        },
        devClass: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        serverDateTime: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
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
        zone: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataType.TINYINT,
            allowNull: false
        },
        battery: {
            type: DataType.TINYINT,
            allowNull: false
        },
        gpsFix: {
            type: DataType.TINYINT,
            allowNull: false
        },
        gpsSats: {
            type: DataType.TINYINT,
            allowNull: false
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
        },
        eventFilter: {
            type: DataType.TINYINT,
            allowNull: false,
            defaultValue: 255
        },
        handled: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }        
    }, {
        timestamps: false,
        indexes: [{
            name: 'search_by_dev_app',
            method: 'BTREE',
            fields: ['appEui', 'devEui']
        }]
    });

    // Messages.associate = (models) =>
    // {
    //     Messages.belongsTo(models.)
    // };

    return Messages;
};