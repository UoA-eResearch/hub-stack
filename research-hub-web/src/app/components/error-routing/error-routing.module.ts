import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPagesModule, ErrorPage, UoaErrorsConfig } from '@uoa/error-pages';
import { PageTitleService } from '@services/page-title.service';
import './error-routing.scss';

@NgModule({
    imports: [
        ErrorPagesModule,
        RouterModule.forChild([{ path: '', component: ErrorPage }])],
    exports: [RouterModule],
    providers: [{ provide: UoaErrorsConfig, useClass: ErrorRoutingModule}]
})
export class ErrorRoutingModule extends UoaErrorsConfig {
    constructor(pageTitleService: PageTitleService) {
        super();
        this.serverErrorCodes = [501, 504, 505, 404];

        pageTitleService.title = 'Error';

        this.ErrorPageContent['ErrorCode404'] = {
            title: 'Page Not Found',
            content: `Unfortunately it appears the page you were trying to access doesn't exist.` };

        for (let [key, value] of Object.entries(this.ErrorPageContent)) {
            value.content += `
                <br><br>
                <a href="/">
                <div role="button" class="standard-button">
                    <p>ResearchHub Home</p>
                </div>
                </a>`;
        }
    }
}
