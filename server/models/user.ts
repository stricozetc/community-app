import * as Sequeleze from "sequelize";
import { db } from './index';
import { dbConfig } from './../src/config/dbconfig';


export const User = db.connect.define(dbConfig.usersModel, {
    name: {
        type: Sequeleze.TEXT,
        allowNull: false
    },
    password: {
        type: Sequeleze.TEXT,
        allowNull: false
    },
    email: {
        type: Sequeleze.TEXT,
        allowNull: false
    }
});


