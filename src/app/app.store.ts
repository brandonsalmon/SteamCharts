import { IAction, LibraryActions } from './app.actions';

export interface IAppState {
    steamId: string;
    games: any;
    perfectGames: any;
    totalGames: number;
    totalPerfectGames: number;
    totalPlaytime: number;
    overallPercent: number;
}

export const INITIAL_STATE: IAppState = {
    steamId: '',
    games: {},
    perfectGames: {},
    totalGames: 0,
    totalPerfectGames: 0,
    totalPlaytime: 0,
    overallPercent: 0
};

let actions: any = {};

actions[LibraryActions.UPDATEGAME] = function (lastState: IAppState, game: any): IAppState {
    lastState.games['app' + game.appid] = game;

    if (game.percent == 100) {
        lastState.perfectGames['app' + game.appid] = game;
    } else {
        delete lastState.perfectGames['app' + game.appid];
    }

    let keys = Object.keys(lastState.games);
    let totalPlaytime = keys.reduce((prev, current) => prev + lastState.games[current].playtime, 0);
    let startedGames = keys.filter(key => lastState.games[key].percent > 0)
    let overallPercent = startedGames.reduce((prev, current) => prev + lastState.games[current].percent, 0) / startedGames.length;

    return {
        steamId: lastState.steamId,
        games: lastState.games,
        perfectGames: lastState.perfectGames,
        totalGames: keys.length,
        totalPerfectGames: 0,
        totalPlaytime: totalPlaytime,
        overallPercent: overallPercent
    };
}

actions[LibraryActions.LINKACCOUNT] = function (lastState: IAppState, steamId: string): IAppState {
    return {
        steamId: steamId,
        games: {},
        perfectGames: {},
        totalGames: 0,
        totalPerfectGames: 0,
        totalPlaytime: 0,
        overallPercent: 0
    };
}

export function rootReducer(lastState: IAppState, action: IAction): IAppState {
    if (!!actions[action.type]) {
        return actions[action.type](lastState, action.payload);
    }

    return lastState;
}