import configFile from '../../../frontend/src/config.json';

export const dbConfig = {
    connection: {
        host: configFile.dbConfig.host,
        user: configFile.dbConfig.user,
        password: configFile.dbConfig.password
    },
    defaultUser: {
        userName: 'test',
        userPassword: 'test',
        userRole: 'user'
    },
    defaultAdmin: {
        userName: 'admin',
        userPassword: 'admin',
        userRole: 'admin'
    },
    dialect: configFile.dbConfig.dialect,
    database: 'community-app',
    usersModel: 'users',
    usersTable: 'users',
    rolesModel: 'roles',
    rolesTable: 'roles',
    appTokensModel: 'appTokens',
    appTokensTable: 'app_tokens',
    userRolesModel: 'userRoles',
    userRolesTable: 'user_roles',
    statisticModel: 'statistic',
    statisticTable: 'statistic',
    gamesModel: 'games',
    gamesTable: 'games',
    eventTable: 'events',
    eventModel: 'events',
};
