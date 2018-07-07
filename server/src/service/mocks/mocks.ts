
import { Game } from './../../../Interfaces/Game';

export abstract class MocksRepository {
  public abstract getGames(): Promise<Game[]>;
  public abstract getBestUsers(): Promise<any[]>;
  public abstract getMostPopularGames(): Promise<any[]>;
  public abstract getRecentGames(): Promise<any[]>;
}
