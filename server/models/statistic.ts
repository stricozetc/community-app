import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';
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
    Init,
    Win,
    Lose,
    Draw,
}

export enum ParticipationStatus {
    Init,
    Leave,
    play,
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

}, {
        // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
        // otherwise, the model name will be pluralized
        freezeTableName: true,
        // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        tableName: dbConfig.statisticTable,

        classMethods: {
            associate: (models: any) => {
                // skip associating during working with DB

                StatisticModel.belongsTo(models.users, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
                StatisticModel.belongsTo(models.appTokens, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
            }
        },
    });
