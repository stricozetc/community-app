import { ActionsObservable, ofType } from 'redux-observable';
import { from, of} from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { HttpWrapper } from 'services';
import { MyGameModel } from './interfaces';

import {
    AddGame,
    AddGameCompleted,
    AddGameFailed,
    DeleteGame,
    DeleteGameCompleted,
    DeleteGameFailed,
    EditGame,
    InitMyGames,
    LoadMyGamesCompleted,
    LoadMyGamesFailed,
    MyGamesActionTypes
} from './my-games.action';

export const deleteGame$ = (action$: ActionsObservable<DeleteGame>) =>
    action$.pipe(
        ofType(MyGamesActionTypes.DeleteGame),
        switchMap(action =>
            from(HttpWrapper.post('api/v1/my-games/delete-game', action.payload)).pipe(
                map((res: any) => {

                    const games: MyGameModel[] = res.data;

                    return new DeleteGameCompleted(games);
                }),
                catchError(error => of(new DeleteGameFailed(error)))
            )
        )
    );

export const editGame$ = (action$: ActionsObservable<EditGame>) =>
    action$.pipe(
        ofType(MyGamesActionTypes.EditGame),
        switchMap(action =>
            from(HttpWrapper.post('api/v1/my-games/edit-game', action.payload)).pipe(
                map((res: any) => {
                    
                })
            )
        )
    );

export const addGame$ = (action$: ActionsObservable<AddGame>) =>
    action$.pipe(
        ofType(MyGamesActionTypes.AddGame),
        switchMap(action => {
            return from(HttpWrapper.post('api/v1/my-games/add-game', action.payload)).pipe(
                map((res: any) => {
                    const game: MyGameModel = res.data;

                    return new AddGameCompleted(game);
                }),
                catchError(error => of(new AddGameFailed(error)))
            )
            }
        )
    );

export const initMyGames$ = (action$: ActionsObservable<InitMyGames>) =>
    action$.pipe(
        ofType(MyGamesActionTypes.InitMyGames),
        switchMap(action =>
            from(HttpWrapper.get(`api/v1/my-games/get-games?userId=${action.payload}`)).pipe(
                map((res: any) => {
                    const games: MyGameModel[] = res.data;

                    return new LoadMyGamesCompleted(games);
                }),
                catchError(error => of(new LoadMyGamesFailed(error)))
            )
        )
    );

export const MyGamesEffects = [
    deleteGame$,
    editGame$,
    addGame$,
    initMyGames$
]