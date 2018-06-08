import * as Sequelize from "sequelize";
import { db } from './SequalizeConnect';
import { dbConfig } from './../src/config/dbconfig';

import { SequelizeStaticAndInstance } from "sequelize";


export const User: SequelizeStaticAndInstance['Model'] = db.connect.define(dbConfig.usersModel, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR(60),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
    tableName: dbConfig.usersTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    classMethods: {
        associate: (models: any) => {
            // skip associating during working with DB

            User.belongsToMany(
                models.roles,
                {
                    through: {
                        model: models.userRoles,
                    }
                }
            );
            User.hasMany(
                models.userRoles
            );
        }
    }
}
);


