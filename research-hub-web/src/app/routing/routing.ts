import { Routes } from '@angular/router';
import { AuthGuard, LoginSuccessGuard } from '@uoa/auth';
import { HomeComponent } from '../components/home/home.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'error/:errorCode',
    loadChildren: () => import('../components/error-routing/error-routing.module').then((m) => m.ErrorRoutingModule),
  },
  {
    path: 'home',
    canActivate: [LoginSuccessGuard],
    component: HomeComponent,
    // loadChildren: () => import('../components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'search',
    loadChildren: () => import('../components/search-results/search-results.module').then(m => m.SearchResultsModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('../components/feedback/feedback.module').then(m => m.FeedbackModule), canActivate: [AuthGuard]
  },
  {
    path: 'userStudy',
    loadChildren: () => import('../components/user-study/user-study.module').then(m => m.UserStudyModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('../components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'orgUnit/:orgUnitId',
    loadChildren: () => import('../components/org-unit-details/org-unit-details.module').then(m => m.OrgUnitDetailsModule)
  },
  {
    path: 'person/:personId',
    loadChildren: () => import('../components/person-details/person-details.module').then(m => m.PersonDetailsModule)
  },
  // GraphQL routes
  {
    path: 'equipment',
    loadChildren: () => import('../components/equipment/equipment.module').then(m => m.EquipmentModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('../components/articles/articles.module').then(m => m.ArticlesModule)
  },
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

  {
    path: 'content/:contentId',
    loadChildren: () => import('../components/content-details/content-details.module').then(m => m.ContentDetailsModule)
  },
  {
    path: 'guideCategory/:guideCategoryId',
    loadChildren: () => import('../components/guide-category/guide-category.module').then(m => m.GuideCategoryModule)
  },

  /**
   * Custom Route Handlers:
   * TODO: More generalizable solution (rather than hard-coding ID)
   * Note: This is the route handler, a separate redirect route also needs to be defined above if you don't want this page to be accessible
   * by its content/id route.
   */
  {
    path: 'researchimpact',
    loadChildren: () => import('../components/content-details/content-details.module').then(m => m.ContentDetailsModule),
    data: { contentId: 73 }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
