
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { SharedModule } from './components/shared/app.shared.module';
import { ServicesModule } from './services/services.module';
import { SearchBarService } from './components/search-bar/search-bar.service';
import { AppComponentService } from './app.component.service';

import { AuthModule, CognitoConfigService, StorageService, LoginService } from '@uoa/auth';
import { AppAuthConfigService } from './services/app-auth-config.service';
import { ErrorPagesModule, BypassErrorService } from '@uoa/error-pages';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeModule } from './components/home/home.module';

import { Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { environment } from '@environments/environment';
import { AppStorageService } from './services/app-storage.service';


/**
 * Dynamic Routing
 */
import { APP_INITIALIZER } from '@angular/core';
import { CerGraphqlService } from './services/cer-graphql.service';


/**
 * Generated from Fragment matcher graphql-code-generator plugi
 * For more information see:
 * - https://graphql-code-generator.com/docs/plugins/fragment-matcher
 * - https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
 */
import result from './graphql/possible-types';
import { AppLayoutModule } from './components/layout/layout.module';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: result.__schema
  }
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule,
    StorageServiceModule,
    RoutingModule,
    ErrorPagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    HomeModule,
    HttpLinkModule,
    ErrorPagesModule,
    AppLayoutModule
  ],
  providers: [
    CerGraphqlService,
    SearchBarService,
    AppComponentService,
    { provide: CognitoConfigService, useClass: AppAuthConfigService },
    { provide: StorageService, useClass: AppStorageService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(httpLink: HttpLink, apollo: Apollo, public loginService: LoginService, public router: Router, private _bypass: BypassErrorService) {

    // The httpLink between Apollo and the GraphQL server
    const http = httpLink.create({ uri: environment.cerGraphQLUrl });
      // @uoa/error-pages automatically shows an error page when it
      // sees an error in fetch requests through an http interceptor.
      // Because some authentication errors from cer-graphql
      // are returned with a 400 status code, we want error-pages to ignore those
      // errors so they can be handled by our onError handler.
      this._bypass.bypassError(environment.cerGraphQLUrl, [400, 500]);


    // The error link handler. Redirects to SSO login on UNAUTHENTICATED errors
    const error = onError(({ response, networkError, graphQLErrors }) => {
      const hasErrors = networkError || graphQLErrors;
      if (networkError) {
        console.log("API returned networkError", networkError);
        if (networkError['error']['errors'][0]['extensions']['code'] === 'UNAUTHENTICATED') {
          this.loginService.doLogin(this.router.url);
          return;
        }
      }
      if (graphQLErrors) {
        console.log("API returned graphQLErrors", graphQLErrors);
        if (graphQLErrors[0].extensions.code === "UNAUTHENTICATED") {
          this.loginService.doLogin(this.router.url);
          return;
        }
      }

      if (hasErrors) {
        // If there is any data, disregard any errors.
        // This will mean the page will render as usual.
        if (response.data) {
          console.log("Ignoring errors as there is partial data to render.");
          response.errors = null;
        }
      }
    });



    // Join the primary link and the error handler link
    // const link = error.concat(http);
    // Create the default (global) Apollo client
    const client = apollo.create({
      cache: new InMemoryCache({ fragmentMatcher }) as InMemoryCache,
      link: error.concat(http),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    } as any, 'default');
  }
}
