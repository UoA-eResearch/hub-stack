import { Routes } from '@angular/router';
import { LoginSuccessGuard } from '@uoa/auth';


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
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'error/:errorCode',
    loadChildren: () => import('@components/error-routing/error-routing.module').then((m) => m.ErrorRoutingModule),
  },
  {
    path: 'home',
    canActivate: [LoginSuccessGuard],
    loadChildren: () => import('@components/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'search',
    loadChildren: () => import('@app/components/search-page/search-page.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('@app/components/categories-page/categories-page.module').then((m) => m.CategoriesPageModule),
  },
  {
    path: 'activities',
    loadChildren: () => import('@app/components/activities-page/activities-page.module').then((m) => m.ActivitiesPageModule),
  },
  {
    path: 'equipment',
    loadChildren: () => import('@app/components/equipments/equipments.module').then(m => m.EquipmentsModule)
  },
  {
    path: 'equipment/:slug',
    loadChildren: () => import('@app/components/equipments/equipments.module').then(m => m.EquipmentsModule)
  },
  {
    path: 'casestudies',
    loadChildren: () => import('@app/components/casestudys/casestudys.module').then(m => m.CaseStudyModule)
  },
  {
    path: 'casestudy/:slug',
    loadChildren: () => import('@app/components/casestudys/casestudys.module').then(m => m.CaseStudyModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('@components/articles/articles.module').then(m => m.ArticlesModule)
  },
  {
    path: 'article/:slug',
    loadChildren: () => import('@components/articles/articles.module').then(m => m.ArticlesModule)
  },
  {
    path: 'event/:slug',
    loadChildren: () => import('@app/components/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'events',
    loadChildren: () => import('@app/components/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'funding/:slug',
    loadChildren: () => import('@app/components/fundings/fundings.module').then(m => m.FundingsModule)
  },
  {
    path: 'funding',
    loadChildren: () => import('@app/components/fundings/fundings.module').then(m => m.FundingsModule)
  },
  {
    path: 'subhub/:slug',
    loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
  },
  {
    path: 'subhubs',
    loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
  },
  {
    path: 'services',
    loadChildren: () => import('@app/components/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'service/:slug',
    loadChildren: () => import('@app/components/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'software/:slug',
    loadChildren: () => import('@app/components/softwares/softwares.module').then(m => m.SoftwaresModule)
  },
  {
    path: 'software',
    loadChildren: () => import('@app/components/softwares/softwares.module').then(m => m.SoftwaresModule)
  },
  /**
   * SubHub routes loader module:
   * Wildcard route that loads a component module that checks if the route is a subhub friendly URL.
   */
  {
    path: '**',
    loadChildren: () =>  import("@app/components/subhub-routes-loader/subhub-routes-loader.module").then(m => m.SubHubRoutesLoaderModule)
  }
];
