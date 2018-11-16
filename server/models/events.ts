import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  place: string;
  address: string;
  locationX: string;
  locationY: string;
  begginingInTime: string;
  begginingDate: string;
}

export const EventModel: SequelizeStaticAndInstance['Model'] = db.connect.define(
  dbConfig.eventModel,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
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
    city: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    place: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    begginingInTime: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    begginingDate: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
    // otherwise, the model name will be pluralized
    freezeTableName: true,
    // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    tableName: dbConfig.eventTable
  }
);
