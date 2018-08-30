import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';

import { SequelizeStaticAndInstance } from 'sequelize';

export const RoleModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.rolesModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
        // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
        // otherwise, the model name will be pluralized
        freezeTableName: true,
        // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        tableName: dbConfig.rolesTable
    });

export enum Roles {
    Admin = 'admin',
    User = 'user'
}
