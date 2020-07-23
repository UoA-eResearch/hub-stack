
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { SharedModule } from './components/shared/app.shared.module';
import { ServicesModule } from './services/services.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './components/header/header.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { AppComponentService } from './app.component.service';
import { SearchFiltersService } from './components/search-results/search-filters/search-filters.service';

import { AuthModule, CognitoConfigService, StorageService, LoginService } from '@uoa/auth';
import { AppAuthConfigService } from './services/app-auth-config.service';
import { ErrorPagesModule } from '@uoa/error-pages';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, Router } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeModule } from './components/home/home.module';

import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import { environment } from '../environments/environment';
import { AppStorageService } from './services/app-storage.service';

import { onError, ErrorLink } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

/**
 * Generated from Fragment matcher graphql-code-generator plugi
 * For more information see:
 * - https://graphql-code-generator.com/docs/plugins/fragment-matcher
 * - https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
 */
import result from './graphql/possible-types';
import { CerApiService } from './services/cer-api.service';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: result.__schema
  }
});
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule,
    StorageServiceModule,
    RoutingModule,
    ErrorPagesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    HomeModule,
    HomeModule,
    ApolloModule,
    HttpLinkModule,
    ErrorPagesModule
  ],
  entryComponents: [],
  providers: [
    HeaderService,
    SearchBarService,
    AppComponentService,
    SearchFiltersService,
    { provide: CognitoConfigService, useClass: AppAuthConfigService },
    { provide: StorageService, useClass: AppStorageService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private loginService: LoginService, private router: Router) {

    /**
     * Creates global Apollo client and error handler.
     */
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`),
        );
      }
      if (networkError) {
        console.error('Network error detected');
        console.log(`[Network error]: ${JSON.stringify(networkError, null, 2)}`);

        // Check for SSO protected error
        if (networkError['error']['errors'][0]['extensions']['code'] === 'UNAUTHENTICATED') {
          console.log('SSO Authentication Error Detected at route:', this.router.url);
          this.loginService.doLogin(this.router.url);
        }
      }
    });


    apollo.create({
      link: ApolloLink.from([errorLink, httpLink.create({ uri: environment.cerGraphQLUrl })]),
      cache: new InMemoryCache({ fragmentMatcher }),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    }, 'default');
  }
}
