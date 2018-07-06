import { action } from '../decorators';
import { QuestInfo } from "models";

export enum QuestsTypes {
  InitQuests = '[quests] Init Quests',
  QuestsInited = '[quests] Quests Inited',
}

@action()
export class InitQuests {
  public readonly type = QuestsTypes.InitQuests;
}

@action()
export class QuestsInited {
  public readonly type = QuestsTypes.QuestsInited;

  public constructor(public payload: QuestInfo[]) {
  }
}

export type QuestsActions =
  | QuestsInited
  | InitQuests ;
  

