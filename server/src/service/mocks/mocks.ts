
import { Game } from './../../../Interfaces/Game';

export abstract class MocksRepository {
  public abstract getGames(): Promise<Game[]>;
}
