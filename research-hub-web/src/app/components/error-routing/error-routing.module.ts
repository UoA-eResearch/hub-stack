import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPagesModule, ErrorPage, UoaErrorsConfig } from '@uoa/error-pages';
import { PageTitleService } from '@services/page-title.service';

@NgModule({
    imports: [
        ErrorPagesModule,
        RouterModule.forChild([{ path: '', component: ErrorPage }])],
    exports: [RouterModule],
    providers: [{ provide: UoaErrorsConfig, useClass: ErrorRoutingModule}]
})
export class ErrorRoutingModule extends UoaErrorsConfig {

    public contactEmail: string = 'reshubproject@auckland.ac.nz';

    constructor(pageTitleService: PageTitleService) {
        super();
        this.clientErrorCodes = [400, 401, 403, 404]
        this.serverErrorCodes = [500, 501, 502, 503, 504, 505];

        pageTitleService.title = 'Error';

        this.ErrorPageContent['ErrorCodeDefault'] = {
            title: 'Unexpected Error',
            content: `<p>
            Sorry, we seem to have encountered an unexpected error. To report this error or if you require help, please contact
            <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>.
          </p>`
        };

        this.ErrorPageContent['ErrorCode403'] = {
            title: 'Access Restricted',
            content: `<p>Sorry, You do not have permission to view this page. Please ensure that you are logged in and try again.</p>
            <p>
              If you still do not have access and believe you are seeing this page in error, please contact
              <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>.
            </p>`
        };

        this.ErrorPageContent['ErrorCode404'] = {
            title: 'Page Not Found',
            content: `<p>Sorry, it seems you are trying to access a page that doesn't exist.</p>
            <p>We are in the process of adding content to this website.
            In the mean time, please try using the <a href=search>search</a> tool in the top menu to find content, or contact <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a> to request the information you seek.
            Thank you for your patience. Ngā mihi nui.</p>`
        };

        this.ErrorPageContent['ErrorCode500'] = {
            title: 'Internal Server Error',
            content: `<p>Sorry, we ran into an error. Please try going back and reloading the page.</p>
            <p> To report this error or if you require help, please contact
            <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>.</p>`
        };

        this.ErrorPageContent['ErrorCode501'] = {
            title: 'Cannot process request',
            content: `<p>Sorry, we cannot connect you to the system. Please try going back and reloading the page.</p>
            <p> To report this error or if you require help, please contact
            <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>.</p>`
        };

        this.ErrorPageContent['ErrorCode505'] = {
            title: 'Version Not Supported',
            content: `<p>Sorry, it looks like you are using a browser or connection that is not supported.
            Check your connection settings or use an alternative browser such as Google Chrome, Firefox or Edge.</p>
            <p>If you require help, please contact
            <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>.</p>`
        };

        for (let [key, value] of Object.entries(this.ErrorPageContent)) {
            value.content += `
                <br><br>
                <a href="/">
                    <div role="button">
                        <span>ResearchHub Home</span>
                    </div>
                </a>`;
        }
    }
}
