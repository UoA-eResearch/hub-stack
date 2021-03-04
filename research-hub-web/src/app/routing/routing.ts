import { Routes } from '@angular/router';
import { LoginSuccessGuard } from '@uoa/auth';
import { HomeComponent } from '@components/home/home.component';


export const appRoutes: Routes = [
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
    component: HomeComponent,
  },
  {
    path: 'search',
    loadChildren: () => import('@app/components/search-page/search-page.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'equipment/:slug',
    loadChildren: () => import('@app/components/equipments/equipments.module').then(m => m.EquipmentModule)
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
    path: 'subhub/:slug',
    loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
  },
  {
    path: 'service/:slug',
    loadChildren: () => import('@app/components/services/services.module').then(m => m.ServiceModule)
  },
  {
    path: 'software/:slug',
    loadChildren: () => import('@app/components/softwares/softwares.module').then(m => m.SoftwaresModule)
  },
  {
    path: '**',
    loadChildren: () => import('@components/error-routing/error-routing.module').then((m) => m.ErrorRoutingModule),
  },
];
