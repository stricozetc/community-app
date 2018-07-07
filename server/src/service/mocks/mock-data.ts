import { Game } from './../../../Interfaces/Game';
export const games: Game[] = [
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
  }
];

export const bestUsers: any[] = [
  {
    name: 'Username1',
    playedTime: 30,
    Score: 200
  },
  {
    name: 'Username2',
    playedTime: 30,
    Score: 200
  },
  {
    name: 'Username3',
    playedTime: 30,
    Score: 200
  },
  {
    name: 'Username3',
    playedTime: 30,
    Score: 200
  },
];

export const mostPopularGames: any[] = [
  {
    name: 'Js Marathon',
    playedInWeek: 200,
    playerAll: 300
  },
  {
    name: 'Can I Dode',
    playedInWeek: 200,
    playerAll: 300
  },
  {
    name: 'Css Quick Draw',
    playedInWeek: 200,
    playerAll: 300
  },
  {
    name: 'Can I code',
    playedInWeek: 200,
    playerAll: 300
  },
];

export const recentGames: any[] = [
  {
    game: 'Js Marathon',
    score: 200,
    result: true
  },
  {
    game: 'Can I dode',
    score: 200,
    result: false
  },
  {
    game: 'CSS quick draw',
    score: 200,
    result: true
  },
  {
    game: 'Can I Code',
    score: 200,
    result: false
  },
];
