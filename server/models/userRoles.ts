import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';

export const UserRoles = db.connect.define(dbConfig.userRolesModel, {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
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
        // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
        // otherwise, the model name will be pluralized
        freezeTableName: true,
        // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
        tableName: dbConfig.userRolesTable,
        classMethods: {
            associate: (models: any) => {
                // skip associating during working with DB
                UserRoles.belongsTo(models.users, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
                UserRoles.belongsTo(models.roles, { foreignKey: 'roleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
            }
        },

    });
