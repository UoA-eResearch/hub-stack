import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPagesModule, ErrorPage, UoaErrorsConfig } from '@uoa/error-pages';
import { AppComponentService } from '@app/app.component.service';
import './error-routing.scss';

@NgModule({
    imports: [
        ErrorPagesModule,
        RouterModule.forChild([{ path: '', component: ErrorPage }])],
    exports: [RouterModule],
    providers: [{ provide: UoaErrorsConfig, useClass: ErrorRoutingModule}]
})
export class ErrorRoutingModule extends UoaErrorsConfig {
    public contactEmail: string = 'reshubproject@auckland.ac.nz';

    constructor(appComponentService: AppComponentService) {
        super();
        this.clientErrorCodes = [400, 401, 403, 404]
        this.serverErrorCodes = [500, 501, 502, 503, 504, 505];

        appComponentService.setTitle('Error');

        this.ErrorPageContent['ErrorCodeDefault'] = {
            title: 'Unexpected Error',
            content: `<p>
            Sorry, we seem to have encountered an unexpected error. To report this error or if you require help, please contact  
            <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>
          </p>`
        };

        this.ErrorPageContent['ErrorCode403'] = {
            title: 'Access Restricted',
            content: `<p>Sorry, You do not have permission to view this page. Please ensure that you are logged in and try again.</p>
            <p>
              If you still do not have access and believe you are seeing this page in error, please contact  
              <a href=mailto:${this.contactEmail} target="_blank">${this.contactEmail}</a>
            </p>`
        };

        this.ErrorPageContent['ErrorCode404'] = {
            title: 'Page Not Found',
            content: `Sorry, it seems you are trying to access a page that doesn't exist. We are in the process of adding content to this website.
            In the mean time, please try <a href=search>searching for content</a>, or <a href=mailto:${this.contactEmail} target="_blank">contact us</a> to request the information you seek. 
            Thank you for your patience. Ngā mihi nui.`
        };     

        this.ErrorPageContent['ErrorCode501'] = {
            title: 'Cannot process request',
            content: `<p>Sorry, we cannot connect you to the system. Try reloading the page, or going back and following the link again.</p>
            <p><a href=mailto:${this.contactEmail} target="_blank">
            Please contact us if you need help or would like to report this issue</a>.</p>`
        };

        this.ErrorPageContent['ErrorCode505'] = {
            title: 'Version Not Supported',
            content: `<p>Sorry, it looks like you are using a browser or connection that is not supported.
            Check your connection settings or use an alternative browser such as Google Chrome, Firefox or Edge.</p>
            <p><a href=mailto:${this.contactEmail} target="_blank">
            Please contact us if you need help or would like to report this issue.</a></p>`
        };
            
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
