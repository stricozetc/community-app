import * as Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from './../src/config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface Statistic {
    userId: number;
    playedTime: number;
    scores: number;
    isWin: boolean;
    createdAt: Date;
    updatedAt: Date;
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
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    playedTime: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    scores: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    isWin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

},                                                                                   {
    // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
    // otherwise, the model name will be pluralized
    freezeTableName: true,
    // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    tableName: dbConfig.statisticTable,

    classMethods: {
        associate: (models: any) => {
            // skip associating during working with DB
            StatisticModel.belongsTo(models.users, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
            StatisticModel.belongsTo(models.appTokens, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
        }
    },
});
