const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let db = null;

module.exports = app => 
{
    const config = app.libs.config;

    console.log(config);

    if (!db)
    {
        const sequalize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params);

        db  = {
            sequalize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(filename => {
            const modelDir = path.join(dir, filename);
            const model = sequalize.import(modelDir);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach( key => {
            db.model[key].associate(db.models);
        });
    }

    return db;
};