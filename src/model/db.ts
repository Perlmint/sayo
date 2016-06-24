/// <reference path="../../typings/index.d.ts" />

import fs = require("fs");
import path = require('path');
import * as Sequelize from 'sequelize';

var sequelize = new Sequelize('sqlite:///db', {
});
var db        = {
    sequelize: null,
    Sequelize: null
};

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "db.js" && file !== "db.ts");
    })
    .forEach((file) => {
        //var model = sequelize.import(path.join(__dirname, file));
        //db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    /*if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }*/
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
