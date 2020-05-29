import { Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './routing.can-activate-via-auth-guard';
import { AuthGuard, LoginSuccessGuard } from 'uoa-auth-angular';


export const appRoutes: Routes = [
  { path: 'home', loadChildren: () => import('app/components/home/home.module').then(m => m.HomeModule), canActivate: [LoginSuccessGuard] },
  { path: 'search', loadChildren: () => import('app/components/search-results/search-results.module').then(m => m.SearchResultsModule) },

  { path: 'feedback', loadChildren: () => import('app/components/feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'userStudy', loadChildren: () => import('app/components/user-study/user-study.module').then(m => m.UserStudyModule) },
  { path: 'about', loadChildren: () => import('app/components/about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('app/components/contact/contact.module').then(m => m.ContactModule) },

  { path: 'orgUnit/:orgUnitId', loadChildren: () => import('app/components/org-unit-details/org-unit-details.module').then(m => m.OrgUnitDetailsModule) },
  { path: 'person/:personId', loadChildren: () => import('app/components/person-details/person-details.module').then(m => m.PersonDetailsModule) },

  /**
   * Custom Route Redirects:
   * Define routes here where you would rather display a custom URL than the standard content/id
   * Note: This is the redirect rule for the content page, a separate route also needs to be defined below to handle this redirect.
   */
  {
    path: 'content/73',
    redirectTo: '/researchimpact',
    pathMatch: 'full'
  },

  { path: 'content/:contentId', loadChildren: () => import('app/components/content-details/content-details.module').then(m => m.ContentDetailsModule) },
  { path: 'guideCategory/:guideCategoryId', loadChildren: () => import('app/components/guide-category/guide-category.module').then(m => m.GuideCategoryModule) },

  { path: 'requestVm', loadChildren: () => import('app/components/request-vm/request-vm.module').then(m => m.RequestVmModule), canActivate: [CanActivateViaAuthGuard] },
  // { path: 'requestStorage', loadChildren: 'app/components/request-storage/request-storage.module#RequestStorageModule', canActivate: [CanActivateViaAuthGuard] },
  { path: 'requestStorage', loadChildren: () => import('app/components/request-storage/request-storage.module').then(m => m.RequestStorageModule), canActivate: [AuthGuard] },

  /**
   * Custom Route Handlers:
   * TODO: More generalizable solution (rather than hard-coding ID)
   * Note: This is the route handler, a separate redirect route also needs to be defined above if you don't want this page to be accessible
   * by its content/id route.
   */
  {
    path: 'researchimpact',
    loadChildren: () => import('app/components/content-details/content-details.module').then(m => m.ContentDetailsModule),
    data: { contentId: 73 }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
