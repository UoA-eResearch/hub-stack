
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthModule, CognitoConfigService, LoginService, StorageService } from '@uoa/auth';
import { BypassErrorService, ErrorPagesModule } from '@uoa/error-pages';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './components/layout/layout.module';
import { SharedModule } from './components/shared/app.shared.module';
import * as Sentry from "@sentry/angular";
/**
 * Generated from Fragment matcher graphql-code-generator plugin
 * For more information see:
 * - https://graphql-code-generator.com/docs/plugins/fragment-matcher
 * - https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
 */
import result from './graphql/possible-types';
import { RoutingModule } from './routing/routing.module';
import { AppAuthConfigService } from './services/app-auth-config.service';
import { AppStorageService } from './services/app-storage.service';
import { CerGraphqlService } from './services/cer-graphql.service';
import { PageTitleService } from './services/page-title.service';
import { ServiceWorkerModule } from '@angular/service-worker';


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
    SharedModule,
    RoutingModule,
    ErrorPagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ErrorPagesModule,
    AppLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    CerGraphqlService,
    PageTitleService,
    { provide: CognitoConfigService, useClass: AppAuthConfigService },
    { provide: StorageService, useClass: AppStorageService },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
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
    // We also bypass 504 (gateway timeout) errors so that the service worker can attempt
    // to serve cached files if there is a problem with the network connection.
    this._bypass.bypassError(environment.cerGraphQLUrl, [400, 500, 504]);

    // The error link handler. Redirects to SSO login on UNAUTHENTICATED errors
    const error = onError(({ response, networkError, graphQLErrors }) => {
      const hasErrors = networkError || graphQLErrors;
      if (networkError) {
        if (
          // When the server picks up an authentication error before the graphql resolver stage,
          // the error will be returned as a networkError but in a similar format as a graphQLError
          // which is why we currently have to handle the error as follows:
          networkError['error'] &&
          networkError['error']['errors'] &&
          networkError['error']['errors'][0] &&
          networkError['error']['errors'][0]['extensions']['code'] === 'UNAUTHENTICATED') {
          this.loginService.doLogin(this.router.url).then((result) => {
            // Workaround fix for blank page load issue
            // when auth library returns a token instead of navigating to target url
            if (result) {
              location.reload();
            }            
          });
          return;
      } else {
          console.error("API returned networkError", networkError);
          return;
        }
      }
      if (graphQLErrors) {
        console.log("API returned graphQLErrors", graphQLErrors);
        if (graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED") {
          this.loginService.doLogin(this.router.url).then((result) => {
            // Workaround fix for blank page load issue
            // when auth library returns a token instead of navigating to target url
            if (result) {
              location.reload();
            }
          });
          return;
        }

        if (graphQLErrors[0]?.extensions?.code === "INTERNAL_SERVER_ERROR" &&
            !(
              graphQLErrors[0].message.includes('Did not fetch typename for object, unable to resolve interface.') ||
              graphQLErrors[0].message.includes('Cannot return null for non-nullable field Asset.sys.')
            )
        ) {
          // Something bad happened. Return the response with errors, unless it is a typename or non-nullable field error.
          // Typename and non-nullable field errors can be caused by references/links to draft entries, and in this case we still want
          // to load the page with partial data (see below).
          return;
        }
      }

      if (hasErrors) {
        // If there is any data, disregard any errors.
        // This will mean the page will render as usual.
        if (response?.data) {
          console.log("Ignoring errors as there is partial data to render.");
          response.errors = undefined;
        }
      }
    });



    // Join the primary link and the error handler link
    // const link = error.concat(http);
    // Create the default (global) Apollo client
    apollo.create({
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
