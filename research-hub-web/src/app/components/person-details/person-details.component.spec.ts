import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/app.shared.module';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonDetailsComponent } from "./person-details.component";

import { HttpClient, HttpHandler } from "@angular/common/http";
import { ResearchHubApiService, ContentItemsParams } from '../../services/research-hub-api.service';
import { AnalyticsService } from '../../services/analytics.service';
import { AppComponentService } from '../../app.component.service';
import { CategoryId, RoleTypeId } from '../../services/options.service';

// xdescribe('Person Details Component', () => {
//     let component: PersonDetailsComponent;
//     let fixture: ComponentFixture<PersonDetailsComponent>;

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [PersonDetailsComponent],
    //         imports: [
    //             CommonModule,
    //             MaterialModule,
    //             SharedModule,
    //             BrowserAnimationsModule,
    //             RouterModule.forRoot([]),
    //         ],
    //         providers: [
    //             ResearchHubApiService,
    //             HttpClient,
    //             HttpHandler,
    //             AnalyticsService,
    //             AppComponentService,
    //             // CategoryId,
    //             RoleTypeId,
    //             ContentItemsParams
    //         ],
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(PersonDetailsComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    //   afterEach(() => {

    //   });

//     it('should create asdf', () => {
//         expect(component).toBeTruthy();
//     });

// });
