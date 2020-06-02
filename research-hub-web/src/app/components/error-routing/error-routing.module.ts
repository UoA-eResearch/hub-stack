import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorPagesModule, ErrorPage } from 'uoa-error-pages-angular';

@NgModule({
    imports: [ErrorPagesModule, RouterModule.forChild([{ path: '', component: ErrorPage }])],
    exports: [RouterModule],
})
export class ErrorRoutingModule { }
