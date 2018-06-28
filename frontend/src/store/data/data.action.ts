import { action } from '../decorators';


export enum DataTypes {
    LoadData = '[data] Load Data',
    DataIsLoaded = '[game] Data Is Loaded',
}

@action()
export class LoadData {
    public readonly type = DataTypes.LoadData;
}

@action() 
export class DataIsLoaded {
    public readonly type = DataTypes.DataIsLoaded;
}


export type DataActions = 
    | LoadData
    | DataIsLoaded;
  

