import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';

import { HeaderService } from './header.service';
import { ResearchHubApiService } from '../../services/research-hub-api.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const mockHeaderService = {
    'title': 'Welcome to the ResearchHub',
    'description': 'The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research.',
    'imageUrl': 'page-elements/20151005_Science Detail_001_1680x220_BW.jpg',
    'isVisible': true
};

describe('Header Component', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let spy: any;
    let headerService: HeaderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                CommonModule,
                MaterialModule,
                SharedModule,
                BrowserAnimationsModule,
                MatDialogModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                HeaderService,
                ResearchHubApiService,
                HttpClientModule,
                HttpClient,
                HttpHandler,
                // MatDialogRef,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}
                },
                {
                    provide: MatDialogRef,
                    useValue: {}
                },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        headerService = new HeaderService();
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        // spy = spyOn(headerService.batchParamsChange, ).and.returnValue(mockHeaderService);

        fixture.detectChanges();
    });

    //   afterEach(() => {
    //   });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should contain a title', () => {
        console.log(JSON.stringify(component));
        expect(component.title).toBeTruthy();
    });

    xit('Should contain a description', () => {
        expect(component.description).toBeTruthy();
    });

    it('Should return empty object if no image url is given', () => {
        let imageUrl;
        expect(component.getBackgroundStyle(imageUrl)).toEqual({});
    });

    it('Should return an object with style information if an image url is given.', () => {
        const imageUrl = 'example';
        const expectedStyle = {
            'margin-bottom': '6em'
        }
        expect(component.getInfoStyle(imageUrl)).toEqual(expectedStyle);
    });

    it('Should return an empty object for styling if a url is given', () => {
        let imageUrl;
        expect(component.getInfoStyle(imageUrl)).toEqual({});
    });

});
