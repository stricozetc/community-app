

import * as Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from './../src/config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface Statistic {
    userToken: string;
    playedTime: number;
    scores: number;
    resultStatus: ResultStatus;
    participationStatus: ParticipationStatus;
    createdAt: Date;
    updatedAt: Date;
}


export enum ResultStatus {
    INIT,
    WIN,
    LOSE,

    DEAD_HEAT
}

export enum ParticipationStatus {
    INIT,
    LEAVE,
    PLAY
}

export const StatisticModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.statisticModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    appToken: {
        type: Sequelize.STRING(50),
    },
    userToken: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    playedTime: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    scores: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    resultStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    participationStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    }

},                                                                                   {
    // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
    freezeTableName: true,
    // Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    tableName: dbConfig.statisticTable,

    classMethods: {
        associate: (models: any) => {
            // skip associating during working with DB

            StatisticModel.belongsTo(models.users, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
            StatisticModel.belongsTo(models.appTokens, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
        }
    },
});
