import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/components/layout/layout.component';
import { AuthGuard, LoginSuccessGuard } from '@uoa/auth';
import { ExternalRedirectGuard } from './external-redirect-guard';


export const appRoutes: Routes = [
  {
    path: 'content/:id',
    loadChildren: () => import('@components/legacy-routing/legacy-routing.module').then((m) => m.LegacyRoutingModule)
  },
  {
    path: 'requestVm',
    loadChildren: () => import('@components/legacy-routing/legacy-routing.module').then(m => m.LegacyRoutingModule)
  },
  {
    path: 'requestStorage',
    loadChildren: () => import('@components/legacy-routing/legacy-routing.module').then(m => m.LegacyRoutingModule)
  },
  /**
   * URL redirects start here
   */
  { //RSM-4221
    path: 'platforms',
    redirectTo: 'subhub/research-platforms',
    pathMatch: 'full'
  },
  { //SCTASK0366060
    path: 'article/share',
    redirectTo: 'subhub/research-platforms',
    pathMatch: 'full'
  },
  { //SCTASK0366067
    path: 'service/media-productions',
    canActivate: [ExternalRedirectGuard],
    component: ExternalRedirectGuard,
    data: {
      externalUrl: 'https://www.auckland.ac.nz/en/intranet/services/buying-payment/approved-suppliers/photographers-videographers-designers.html'
    }
  },
  // SCTASK0368008 start
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs',
    redirectTo: '/subhub/discovery-profiles-research-outputs',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace',
    redirectTo: '/subhub/add-research-discovery-profile-and-researchspace',
    pathMatch: 'full'
  },
  {
    path: '/open-access/open-access-publishing-agreements',
    redirectTo: '/article/open-access-publishing-agreements',
    pathMatch: 'full'
  },
  {
    path: '/metrics/introduction-to-metrics',
    redirectTo: '/article/introduction-to-metrics',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/scopus-ID',
    redirectTo: '/article/scopus-id',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/deposit-research-outputs',
    redirectTo: '/article/deposit-research-outputs',
    pathMatch: 'full'
  },
  {
    path: '/metrics/responsible-metrics',
    redirectTo: '/article/responsible-metrics',
    pathMatch: 'full'
  },
  {
    path: '/open-access/why-should-i-make-my-work-open-access',
    redirectTo: '/article/why-should-i-make-my-work-open-access',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/how-do-i-publish-in-a-journal',
    redirectTo: '/article/how-do-i-publish-in-a-journal',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/orcid',
    redirectTo: '/article/orcid',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-manual-records',
    redirectTo: '/article/research-outputs-manual-records',
    pathMatch: 'full'
  },
  {
    path: '/open-access/open-access-toolkit-for-aotearoa-new-zealand-researchers',
    redirectTo: '/article/open-access-toolkit-for-aotearoa-new-zealand-researchers',
    pathMatch: 'full'
  },
  {
    path: '/publishing-communication-profiles/publishing-guide/open-access/creative-commons',
    redirectTo: '/article/creative-commons',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/what-journal-should-i-publish-in',
    redirectTo: '/article/what-journal-should-i-publish-in',
    pathMatch: 'full'
  },
  {
    path: '/open-access/creative-commons',
    redirectTo: '/article/what-is-open-access',
    pathMatch: 'full'
  },
  {
    path: '/open-access/diamond-open-access',
    redirectTo: '/article/diamond-open-access',
    pathMatch: 'full'
  },
  {
    path: '/open-access/green-open-access',
    redirectTo: '/article/green-open-access',
    pathMatch: 'full'
  },
  {
    path: '/open-access/glossary-of-open-access-terms',
    redirectTo: '/article/glossary-of-open-access-terms',
    pathMatch: 'full'
  },
  {
    path: '/open-access/ethical-concerns-about-open-access-fees-and-apcs',
    redirectTo: '/article/ethical-concerns-about-open-access-fees-and-apcs',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/predatory-publishers',
    redirectTo: '/article/predatory-publishers',
    pathMatch: 'full'
  },
  {
    path: '/metrics/metrics-for-promotions-grants-and-awards',
    redirectTo: '/article/metrics-for-promotions-grants-and-awards',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/top-ranked-journals-list',
    redirectTo: '/article/top-ranked-journals-list',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/how-to-build-and-maintain-your-researcher-profile',
    redirectTo: '/article/how-to-build-and-maintain-your-researcher-profile',
    pathMatch: 'full'
  },
  {
    path: '/open-access/how-do-i-make-my-journal-article-open-access',
    redirectTo: '/article/how-do-i-make-my-journal-article-open-access',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-engagement-tab',
    redirectTo: '/article/update-engagement-tab',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/update-teaching-and-supervision-tab',
    redirectTo: '/article/update-teaching-and-supervision-tab',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-privacy-settings',
    redirectTo: '/article/discovery-privacy-settings',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/edit-your-research-tab',
    redirectTo: '/article/edit-your-research-tab',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/add-research-discovery-profile-and-researchspace/research-outputs-searches',
    redirectTo: '/article/research-outputs-searches',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-update-personal-details',
    redirectTo: '/article/discovery-update-personal-details',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/discovery-profile-uses',
    redirectTo: '/article/discovery-profile-uses',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/introduction-discovery-profile',
    redirectTo: '/article/introduction-discovery-profile',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/discovery-profiles-research-outputs/workshop-discovery-profile',
    redirectTo: '/event/workshop-discovery-profile',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/workshop-orcid',
    redirectTo: '/event/workshop-orcid',
    pathMatch: 'full'
  },
  {
    path: '/open-access/open-access-week-events',
    redirectTo: '/event/open-access-week-events',
    pathMatch: 'full'
  },
  {
    path: '/researcher-profiles-and-ids/raising-your-research-profile',
    redirectTo: '/event/raising-your-research-profile',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/publishing-overview-workshop',
    redirectTo: '/event/publishing-overview-workshop',
    pathMatch: 'full'
  },
  {
    path: '/open-access/workshop-pathways-to-open-access-uoa',
    redirectTo: '/event/workshop-pathways-to-open-access-uoa',
    pathMatch: 'full'
  },
  {
    path: '/the-publishing-process/copyright-advisory',
    redirectTo: '/service/copyright-advisory',
    pathMatch: 'full'
  },
  {
    path: '/open-access/open-access-support-fund-for-high-impact-publications',
    redirectTo: '/funding/open-access-support-fund-for-high-impact-publications',
    pathMatch: 'full'
  },
  // SCTASK0368008 end
  /**
   * URL redirects end here
   */
  {
    path: '',
    canActivate: [LoginSuccessGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'graph',
        canActivate: [AuthGuard],
        loadChildren: () => import('@components/content-graph/content-graph.module').then((m) => m.ContentGraphModule)
      },
      {
        path: 'error/:errorCode',
        loadChildren: () => import('@components/error-routing/error-routing.module').then((m) => m.ErrorRoutingModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('@components/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'search',
        loadChildren: () => import('@components/search-page/search-page.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('@components/categories-page/categories-page.module').then((m) => m.CategoriesPageModule),
      },
      {
        path: 'stage',
        loadChildren: () => import('@components/activities-page/activities-page.module').then((m) => m.ActivitiesPageModule),
      },
      {
        path: 'infrastructure',
        loadChildren: () => import('@components/equipments/equipments.module').then(m => m.EquipmentsModule)
      },
      {
        path: 'casestudy',
        loadChildren: () => import('@components/casestudys/casestudys.module').then(m => m.CasestudysModule)
      },
      {
        path: 'article',
        loadChildren: () => import('@components/articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'process',
        loadChildren: () => import('@components/processes/processes.module').then(m => m.ProcessesModule)
      },
      {
        path: 'event',
        loadChildren: () => import('@components/events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'funding',
        loadChildren: () => import('@components/fundings/fundings.module').then(m => m.FundingsModule)
      },
      {
        path: 'subhub',
        loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
      },
      {
        path: 'service',
        loadChildren: () => import('@components/services/services.module').then(m => m.ServicesModule)
      },
      {
        path: 'software',
        loadChildren: () => import('@components/softwares/softwares.module').then(m => m.SoftwaresModule)
      },
      {
        path: 'capability',
        loadChildren: () => import('@components/capabilitys/capabilitys.module').then(m => m.CapabilitysModule)
      },
      {
        path: 'protected-pages',
        canActivate: [AuthGuard],
        loadChildren: () => import('@components/protected-pages/protected-pages.module').then(m => m.ProtectedPagesModule)
      }
    ]
  },
  /**
   * SubHub routes loader module:
   * Wildcard route that loads a component module that checks if the route is a subhub friendly URL.
   */
  {
    path: '**',
    loadChildren: () => import("@components/subhub-routes-loader/subhub-routes-loader.module").then(m => m.SubHubRoutesLoaderModule)
  }
];
