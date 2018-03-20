import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LibraryActions } from './app.actions';
import { IAppState, rootReducer, INITIAL_STATE } from './app.store';
import { LookupAccountComponent } from './components/lookup-account/lookup-account.component';
import { OverviewChartComponent } from './components/charts/overview-chart/overview-chart.component';
import { SteamApiService } from './services/steam-api.service';
import { SocketIoService } from './services/socket-io.service';
import { CompletionChartComponent } from './components/charts/completion-chart/completion-chart.component';
import { PerfectGamesComponent } from './components/charts/perfect-games/perfect-games.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    SummaryComponent,
    LookupAccountComponent,
    OverviewChartComponent,
    CompletionChartComponent,
    PerfectGamesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgReduxModule
  ],
  providers: [
    LibraryActions,
    SocketIoService,
    SteamApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    steamApi: SteamApiService) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
