import { MocksRepository } from './mocks';
import { injectable } from 'inversify';
import { bestUsers } from './mock-data';
import { recentGames } from './mock-data';
import { mostPopularGames } from './mock-data';
import { QuestInfo } from '../../typing/quest-info';

@injectable()
export class MocksRepositoryImplementation implements MocksRepository {
    private questsInfo: QuestInfo[] = require('../../config/quests.json').quests;

    public getGames(): Promise<QuestInfo[]> {
        let randomTime = Math.random() * (5000 - 2000) + 2000;

        return new Promise<QuestInfo[]>((resolve, _reject) => {
            setTimeout(() => {
                resolve(this.questsInfo);
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

        return new Promise<QuestInfo[]>((resolve, _reject) => {
            setTimeout(() => {
                resolve(mostPopularGames);
            }, randomTime);
        });
    }

    public getRecentGames(): Promise<QuestInfo[]> {
        let randomTime = Math.random() * (5000 - 2000) + 2000;

        return new Promise<QuestInfo[]>((resolve, _reject) => {
            setTimeout(() => {
                resolve(recentGames);
            }, randomTime);
        });
    }
}
