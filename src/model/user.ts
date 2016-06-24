/// <reference path="../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

var seq = new Sequelize('');

export default (sequelize, dataTypes) => {
    return sequelize.define('user', {
        google_id: dataTypes.STRING,
        token: dataTypes.STRING,
        name: dataTypes.STRING
    })
};
