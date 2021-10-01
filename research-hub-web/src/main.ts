import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppModule } from './app/app.module';


Sentry.init({
  // https://docs.sentry.io/product/sentry-basics/dsn-explainer/
  dsn: 'https://eb04735190794f63abc9c1ddd3d73f64@o991241.ingest.sentry.io/5948230',
  // https://docs.sentry.io/platforms/javascript/guides/angular/performance/instrumentation/automatic-instrumentation/#tracingorigins
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: [environment.cerGraphQLUrl, environment.searchUrl],
      routingInstrumentation: Sentry.routingInstrumentation,
    })
  ],
  environment: environment.env,
  tracesSampleRate: environment.sentryTracesSampleRate,
  ignoreErrors: [
    // 'Authentication required to view protected content.'
  ]
});


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
