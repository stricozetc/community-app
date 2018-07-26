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
