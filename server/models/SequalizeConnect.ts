import * as Sequelize from "sequelize";
import { dbConfig } from './../src/config/dbconfig';

let connect: any;

let db: any = {};
db.dbConfig = dbConfig;

if (process.env.DATABASE_URL) {
    connect = new Sequelize(process.env.DATABASE_URL);
} else {
    connect = new Sequelize(db.dbConfig.database, db.dbConfig.connection.user, db.dbConfig.connection.password, {
        dialect: 'mysql'
    });
}

db.connect = connect;
db.Sequelize = Sequelize;

export { db };

