import { MocksRepository } from './mocks';
import { injectable } from 'inversify';
import { bestUsers } from './mock-data';
import { recentGames } from './mock-data';
import { mostPopularGames } from './mock-data';
import { Game } from '../../typing/game';

@injectable()
export class MocksRepositoryImplementation implements MocksRepository {
  private games: Game[] = require('../../config/games.json').games;

  public getGames(): Promise<Game[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve(this.games);
      }, randomTime);
    });
  }

  public getBestUsers(): Promise<any[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<any[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve(bestUsers);
      }, randomTime);
    });
  }

  public getMostPopularGames(): Promise<any[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve(mostPopularGames);
      }, randomTime);
    });
  }

  public getRecentGames(): Promise<Game[]> {
    let randomTime = Math.random() * (5000 - 2000) + 2000;

    return new Promise<Game[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve(recentGames);
      }, randomTime);
    });
  }
}
