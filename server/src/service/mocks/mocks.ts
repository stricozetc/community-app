import { QuestInfo } from '../../typing/quest-info';

export abstract class MocksRepository {
    public abstract getGames(): Promise<QuestInfo[]>;

    public abstract getBestUsers(): Promise<any[]>;

    public abstract getMostPopularGames(): Promise<any[]>;

    public abstract getRecentGames(): Promise<any[]>;
}
