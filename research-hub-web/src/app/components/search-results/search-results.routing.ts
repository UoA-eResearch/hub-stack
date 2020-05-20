import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultsComponent} from './search-results.component';
import {FilterSidenavComponent} from './filter-sidenav/filter-sidenav.component';

const routes: Routes = [
  {path: '', component: SearchResultsComponent},
  {path: '', component: FilterSidenavComponent, outlet: 'contentSidenav'}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
