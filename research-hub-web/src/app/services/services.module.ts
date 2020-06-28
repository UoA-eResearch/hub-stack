import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AnalyticsService} from './analytics.service';
import {ResearchHubApiService} from './research-hub-api.service';
import {OptionsService} from './options.service';
import {AuthService} from './auth.service';
import {LayoutService} from './layout.service';
import {CerApiService} from './cer-api.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AnalyticsService,
    CerApiService,
    ResearchHubApiService,
    OptionsService,
    AuthService,
    LayoutService
  ],
  exports: []
})
export class ServicesModule {
}
