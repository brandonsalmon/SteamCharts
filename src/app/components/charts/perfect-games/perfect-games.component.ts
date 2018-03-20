import { Component, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/app.store';

@Component({
  selector: 'sc-perfect-games',
  templateUrl: './perfect-games.component.html',
  styleUrls: ['./perfect-games.component.css']
})
export class PerfectGamesComponent implements OnDestroy {
  subscriptions: any = {};
  perfectGames: any[];

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.subscriptions.perfectGames = ngRedux.select<any[]>(x => x.perfectGames, (x, y) => false).subscribe(x => this.perfectGames = Object.values(x))
  }

  ngOnDestroy() {
    this.subscriptions.perfectGames.unsubscribe();
  }
}
