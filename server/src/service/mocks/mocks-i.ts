import { MocksRepository } from "./mocks";
import { injectable } from "inversify";
import { Game } from './../../../Interfaces/Game';

const games: Game[] = [
  {
    name: 'JS Marathon',
    desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    timeToStart: '16:34:48',
    isStarted: false,
    maxPlayersInRoom: 5
  },
  {
    name: 'CSS Quick Draw',
    desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    timeToStart: '12:16:32',
    isStarted: true,
    maxPlayersInRoom: 20
  },
  {
    name: 'Can I Code',
    desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    timeToStart: '16:34:48',
    isStarted: false,
    maxPlayersInRoom: 8
  },
  {
    name: 'Can I Code',
    desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    timeToStart: '16:34:48',
    isStarted: false,
    maxPlayersInRoom: 8
  }
];

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
}
