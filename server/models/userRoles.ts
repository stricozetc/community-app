import * as Sequelize from "sequelize";
import { db } from './SequalizeConnect';
import { dbConfig } from './../src/config/dbconfig';


const UserRoles = db.connect.define(dbConfig.userRolesModel, {
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
        },
        primaryKey: true,
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true,
    }
    
}, {
    freezeTableName: true, // If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the model name will be pluralized
    tableName: dbConfig.userRolesTable, //Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    classMethods: {
        associate: (models: any) => {
            // skip associating during working with DB

            UserRoles.belongsTo(models.users, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: 'CASCADE'} );
            UserRoles.belongsTo(models.roles, { foreignKey: 'roleId', onDelete: "CASCADE", onUpdate: 'CASCADE'} );
        }
    }

});

UserRoles.removeAttribute('id');

export { UserRoles };


