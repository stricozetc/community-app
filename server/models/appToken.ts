import * as Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from './../src/config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';



export interface TokenFromDb {
    token: string;
    appName: string;
    createdAt: Date;
    updatedAt: Date;
}
  

export const AppTokenModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.appTokensModel, {
    token: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        autoIncrement: false
    },
    appName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    createdAt: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    updatedAt: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},                                                                                  {
    // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
    // otherwise, the model name will be pluralized
    freezeTableName: true,
    // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    tableName: dbConfig.appTokensTable
});
