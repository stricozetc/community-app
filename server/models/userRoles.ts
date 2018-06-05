import * as Sequeleze from "sequelize";
import { db } from './SequalizeConnect';
import { dbConfig } from './../src/config/dbconfig';


export const UserRoles = db.connect.define(dbConfig.userRolesModel, {
    id: {
        type: Sequeleze.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequeleze.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    roleId: {
        type: Sequeleze.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
    tableName: dbConfig.userRolesTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    classMethods: {
        associate: (models: any) => {
            // skip associating during working with DB

            UserRoles.belongsTo(models.users, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: 'CASCADE'} );
            UserRoles.belongsTo(models.roles, { foreignKey: 'roleId', onDelete: "SET NULL", onUpdate: 'CASCADE'} );
        }
    }
});



