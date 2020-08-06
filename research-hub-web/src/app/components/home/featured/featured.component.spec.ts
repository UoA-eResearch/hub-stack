import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturedComponent } from "./featured.component";

import { ResearchHubApiService } from "../../../services/research-hub-api.service";
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http'
import { AnalyticsService } from "../../../services/analytics.service";

describe('Feature component', () => {
    let component: FeaturedComponent;
    let fixture: ComponentFixture<FeaturedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FeaturedComponent],
            imports: [
                CommonModule,
                MaterialModule,
                SharedModule,
                BrowserAnimationsModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                AnalyticsService,
                ResearchHubApiService,
                HttpClientModule,
                HttpClient,
                HttpHandler
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeaturedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
