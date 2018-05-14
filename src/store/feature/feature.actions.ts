import { Action } from 'store/decorators';

export enum FeatureActionTypes {
  ADD_ITEM = '[feature] ADD_ITEM',
}

@Action()
export class AddItemAction {
  public readonly type = FeatureActionTypes.ADD_ITEM;

  constructor(public payload: string) { }
}

export type ApplicationActions =
  | AddItemAction;
