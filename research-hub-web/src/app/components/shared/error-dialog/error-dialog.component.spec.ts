
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../components/shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from './error-dialog.component';

// import { ResearchHubApiService } from "../../services/research-hub-api.service";
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

xdescribe('Header Component', () => {
    let component: ErrorDialogComponent;
    let fixture: ComponentFixture<ErrorDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorDialogComponent],
            imports: [
                CommonModule,
                SharedModule,
                BrowserAnimationsModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                HttpClientModule,
                HttpClient,
                HttpHandler
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
