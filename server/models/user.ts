import * as Sequeleze from "sequelize";
import { db } from './SequalizeConnect';
import { dbConfig } from './../src/config/dbconfig';


export const User = db.connect.define(dbConfig.usersModel, {
    id: {
        type: Sequeleze.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    },
    isActive: {
        type: Sequeleze.BOOLEAN,
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


