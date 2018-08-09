import { WinRateDiagramData } from './WinRateDiagram.model';
export class WinRateDiagramService {
  private constructor() {
  }

  public static getGamesResults(gameName: string, gameData: any[]): WinRateDiagramData {
    const gameResults = gameData
      .filter(item => item.game === gameName)
      .map(game => game.result);

    const diagramData: WinRateDiagramData = {
      winsNumber: 0,
      losesNumber: 0
    };

    gameResults.forEach(result => {
      if (result) {
        diagramData.winsNumber++;
      } else {
        diagramData.losesNumber++;
      }
    });

    return diagramData;
  }
}
