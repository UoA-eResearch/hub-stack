import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '@components/shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturedComponent } from "./featured.component";

import { ResearchHubApiService } from "@services/research-hub-api.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AnalyticsService } from "@services/analytics.service";

describe('Feature component', () => {
    let component: FeaturedComponent;
    let fixture: ComponentFixture<FeaturedComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FeaturedComponent],
            imports: [
                CommonModule,
                MaterialModule,
                SharedModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
            ],
            providers: [
                AnalyticsService,
                ResearchHubApiService,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeaturedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
