import 'hammerjs';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {RoutingModule} from './routing/routing.module';
import {SharedModule} from './components/shared/app.shared.module';
import {ServicesModule} from './services/services.module';
import {HeaderComponent} from './components/header/header.component';
import {HeaderService} from './components/header/header.service';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {SearchBarService} from './components/search-bar/search-bar.service';
import {AppComponentService} from './app.component.service';
import {SearchFiltersService} from './components/search-results/search-filters/search-filters.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule,
    RoutingModule,
  ],
  entryComponents: [],
  providers: [HeaderService, SearchBarService, AppComponentService,SearchFiltersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
