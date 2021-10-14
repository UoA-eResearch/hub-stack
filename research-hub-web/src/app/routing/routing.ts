import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/components/layout/layout.component';
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
    canActivate: [LoginSuccessGuard],
    component: LayoutComponent,
    children: [
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
        path: 'activities',
        loadChildren: () => import('@components/activities-page/activities-page.module').then((m) => m.ActivitiesPageModule),
      },
      {
        path: 'equipment',
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
        path: 'event',
        loadChildren: () => import('@components/events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'funding',
        loadChildren: () => import('@components/fundings/fundings.module').then(m => m.FundingsModule)
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
        path: 'service',
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
    ]
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
