import * as Sequeleze from "sequelize";
import { db } from './SequalizeConnect';
import { dbConfig } from './../src/config/dbconfig';


export const RoleModel = db.connect.define(dbConfig.rolesModel, {
    id: {
        type: Sequeleze.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequeleze.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
    tableName: dbConfig.rolesTable //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
});

export enum Roles {
    admin = "admin",
    user = "user"
}



