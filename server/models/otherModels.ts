import {
  SequelizeStaticAndInstance,
  Model
} from 'sequelize';

export interface RecentGameFromServer {
  game: string;
  playedTime: number;
  scores: number;
  result: boolean;
}

export interface PopularGamesFromServer {
  name: string;
  playedTime: number;
  playedInWeek: number;
}

export interface BestUsersFromServer {
  userToken: string;
  name: number;
  playedTime: number;
  scores: number;
}

export interface FieldsToChangePassword {
  userId: number;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface Leaders {
  userToken: string;
  name: number;
  scores: number;
}

export interface ModelsDbInterface {
  appTokens: Model<SequelizeStaticAndInstance['Model'], {}>;
  games: Model<SequelizeStaticAndInstance['Model'], {}>;
  roles: Model<SequelizeStaticAndInstance['Model'], {}>;
  statistic: Model<SequelizeStaticAndInstance['Model'], {}>;
  userRoles: Model<SequelizeStaticAndInstance['Model'], {}>;
  users: Model<SequelizeStaticAndInstance['Model'], {}>;
}

export interface DbConfig {
  connection: {
    host: string;
    user: string;
    password: string;
  };
  defaultUser: {
    userName: string;
    userPassword: string;
    userRole: string;
  };
  defaultAdmin: {
    userName: string;
    userPassword: string;
    userRole: string;
  };
  dialect: string;
  database: string;
  usersModel: string;
  usersTable: string;
  rolesModel: string;
  rolesTable: string;
  appTokensModel: string;
  appTokensTable: string;
  userRolesModel: string;
  userRolesTable: string;
  statisticModel: string;
  statisticTable: string;
  gamesModel: string;
  gamesTable: string;
  eventModel: string;
  eventTable: string;
}
