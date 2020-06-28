import {Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from './routing.can-activate-via-auth-guard';


export const appRoutes: Routes = [
  {path: 'home',  loadChildren: 'app/components/home/home.module#HomeModule'},
  {path: 'search', loadChildren: 'app/components/search-results/search-results.module#SearchResultsModule'},

  {path: 'feedback', loadChildren: 'app/components/feedback/feedback.module#FeedbackModule'},
  {path: 'userStudy', loadChildren: 'app/components/user-study/user-study.module#UserStudyModule'},
  {path: 'about', loadChildren: 'app/components/about/about.module#AboutModule'},
  {path: 'contact', loadChildren: 'app/components/contact/contact.module#ContactModule'},

  {path: 'orgUnit/:orgUnitId', loadChildren: 'app/components/org-unit-details/org-unit-details.module#OrgUnitDetailsModule'},
  {path: 'person/:personId', loadChildren: 'app/components/person-details/person-details.module#PersonDetailsModule'},

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

  {path: 'content/:contentId',  loadChildren: 'app/components/content-details/content-details.module#ContentDetailsModule'},
  {path: 'guideCategory/:guideCategoryId', loadChildren: 'app/components/guide-category/guide-category.module#GuideCategoryModule'},

  {path: 'requestVm', loadChildren: 'app/components/request-vm/request-vm.module#RequestVmModule', canActivate: [CanActivateViaAuthGuard]},
  {path: 'requestStorage', loadChildren: 'app/components/request-storage/request-storage.module#RequestStorageModule', canActivate: [CanActivateViaAuthGuard]},

  /**
   * Custom Route Handlers:
   * TODO: More generalizable solution (rather than hard-coding ID)
   * Note: This is the route handler, a separate redirect route also needs to be defined above if you don't want this page to be accessible
   * by its content/id route.
   */
  {
    path: 'researchimpact',
    loadChildren: 'app/components/content-details/content-details.module#ContentDetailsModule',
    data: { contentId: 73 }
  },

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
