import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from './../src/config/dbconfig';

import { SequelizeStaticAndInstance } from 'sequelize';

export const BestUsersModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.bestUsersModel, {

    name: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    scores: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    userToken: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});
