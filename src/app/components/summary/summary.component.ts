import { Component, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';

import { IAppState } from 'app/app.store';
import { LibraryActions } from 'app/app.actions';

@Component({
  selector: 'sc-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnDestroy {
  subscriptions: any = {};
  totalGames: number = 0;
  totalPlayTime: number = 0;
  overallPercent: number = 0;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: LibraryActions) {
    this.subscriptions.totalGames = ngRedux.select<number>(x => x.totalGames).subscribe(x => this.totalGames = x);
    this.subscriptions.totalPlayTime = ngRedux.select<number>(x => x.totalPlaytime).subscribe(x => this.totalPlayTime = x);
    this.subscriptions.overallPercent = ngRedux.select<number>(x => x.overallPercent).subscribe(x => this.overallPercent = x);
  }

  ngOnDestroy() {
    this.subscriptions.totalGames.unsubscribe();
    this.subscriptions.totalPlayTime.unsubscribe();
    this.subscriptions.overallPercent.unsubscribe();
  }
}
