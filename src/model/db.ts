/// <reference path="../../typings/index.d.ts" />
import * as Sequelize from 'sequelize';
import { init as initUser } from "./gen/user_models";
import config = require('config');

var sequelize = new Sequelize(config.get<string>("server.db"), {
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
});

initUser(sequelize);

sequelize.sync();

export { User } from "./gen/user_models";
