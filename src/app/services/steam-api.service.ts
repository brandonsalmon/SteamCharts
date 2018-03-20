import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';

import { IAppState } from 'app/app.store';
import { SocketIoService } from './socket-io.service';
import { LibraryActions } from 'app/app.actions';

@Injectable()
export class SteamApiService {
    subscriptions: any = {};

    constructor(
        private socketIo: SocketIoService,
        private ngRedux: NgRedux<IAppState>,
        private actions: LibraryActions) {
        this.socketIo.on('gameUpdate', x => this.gameUpdate(x));
        this.subscriptions.totalGames = ngRedux.select<string>(x => x.steamId).subscribe(x => this.linkAccount(x));
    }

    gameUpdate(game: any) {
        this.ngRedux.dispatch(this.actions.updateGame(game));
    }

    linkAccount(steamId: string) {
        if (!!steamId) {
            this.socketIo.emit('link account', steamId);
        }
    }
}