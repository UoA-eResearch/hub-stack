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
    path: 'equipment',
    loadChildren: () => import('@app/components/equipments/equipments.module').then(m => m.EquipmentModule)
  },
  {
    path: 'equipment/:slug',
    loadChildren: () => import('@app/components/equipments/equipments.module').then(m => m.EquipmentModule)
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
    path: 'events',
    loadChildren: () => import('@app/components/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'event/:slug',
    loadChildren: () => import('@app/components/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'subhubs',
    loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
  },
  {
    path: 'subhub/:slug',
    loadChildren: () => import('@components/subhubs/subhubs.module').then(m => m.SubhubsModule)
  },
  {
    path: 'services',
    loadChildren: () => import('@app/components/services/services.module').then(m => m.ServiceModule)
  },
  {
    path: 'service/:slug',
    loadChildren: () => import('@app/components/services/services.module').then(m => m.ServiceModule)
  },
  {
    path: 'software',
    loadChildren: () => import('@app/components/softwares/softwares.module').then(m => m.SoftwaresModule)
  },
  {
    path: 'software/:slug',
    loadChildren: () => import('@app/components/softwares/softwares.module').then(m => m.SoftwaresModule)
  },
];
