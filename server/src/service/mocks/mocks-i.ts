import { MocksRepository } from "./mocks";
import { injectable } from "inversify";
import { games } from './mock-data';
import { bestUsers } from './mock-data';
import { recentGames } from './mock-data';
import { mostPopularGames } from './mock-data';
import { Game } from './../../../Interfaces/Game';


@injectable()
export class MocksRepositoryImplementation implements MocksRepository {
  public getGames(): Promise<Game[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(games);
      }, randomTime);
    });
  }

  public getBestUsers(): Promise<Game[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(bestUsers);
      }, randomTime);
    });
  }

  public getMostPopularGames(): Promise<any[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(mostPopularGames);
      }, randomTime);
    });
  }

  public getRecentGames(): Promise<Game[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(recentGames);
      }, randomTime);
    });
  }
}
