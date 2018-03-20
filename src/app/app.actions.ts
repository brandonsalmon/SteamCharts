import { Injectable } from '@angular/core';
import { Action } from 'redux';

export interface IAction extends Action {
    payload?: any;
}

@Injectable()
export class LibraryActions {
    static UPDATEGAME = 'UPDATEGAME';
    static LINKACCOUNT = 'LINKACCOUNT';

    updateGame(game: any): IAction {
        return { type: LibraryActions.UPDATEGAME, payload: game };
    }

    linkAccount(steamId: string): IAction {
        return { type: LibraryActions.LINKACCOUNT, payload: steamId };
    }
}