
import { Game } from './../../../../frontend/src/components/GameCard/GameCard.model';

export abstract class MocksRepository {
  public abstract getGames(): Promise<Game[]>;
}
