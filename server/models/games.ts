import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface Game {
    id?: number;
    userId: number;
    appName: string;
    description: string;
    maxRoomPlayer: number;
    maxRooms: number;
    requestUrl: string;
    maxWaitingTime: number;
    createdAt?: string;
    updatedAt?: string;
    redirectUrl: string;
    registrationEventName?: string;
    leaveEventName?: string;
    updateRoomsInfoEventName?: string;
    notifyCountdown?: string;
    approve: boolean;
    appToken?: string;
}

export const GamesModel: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.gamesModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    description: {
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
    },
    redirectUrl: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    registrationEventName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    leaveEventName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    updateRoomsInfoEventName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    notifyCountdown: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    approve: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    appToken: {
        type: Sequelize.STRING(50),
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
        tableName: dbConfig.gamesTable
    });
