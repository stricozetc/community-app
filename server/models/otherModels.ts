
import { Error } from './../errors/errCodes';
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

export interface ErrorsToChangePassword {
  oldPassword?: Error[];
  newPassword?: Error[];
  repeatNewPassword?: Error[];
  [key: string]: Error[];
}