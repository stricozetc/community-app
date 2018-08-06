import * as Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from './../src/config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface MyGameInterface {
    id?: number;
    userId: number;
    appName: string;
    desc: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
    createdAt?: string;
    updatedAt?: string;
}

export const GamesModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.gamesModel, {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    appName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    desc: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    maxRoomPlayer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    maxRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    requestUrl: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    maxWaitingTime: {
        type: Sequelize.INTEGER,
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
    tableName: dbConfig.gamesTable
});


