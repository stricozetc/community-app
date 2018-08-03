export const dbConfig = {
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'password'
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
    gamesTable: 'games'
};
