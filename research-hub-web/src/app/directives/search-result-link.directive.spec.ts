import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { AnalyticsService } from 'app/services/analytics.service';
import { SharedModule } from 'app/components/shared/app.shared.module';
import { CommonModule } from '@angular/common';
import { SearchResultLinkDirective } from './search-result-link.directive';
import { ActivatedRoute } from '@angular/router';
import { routing } from 'app/components/search-results/search-results.routing';
import { SearchResultsModule } from 'app/components/search-results/search-results.module';
import { SearchResultsComponentService } from 'app/components/search-results/search-results-component.service';
import { By } from '@angular/platform-browser';
import { ListItem } from 'app/model/ListItem';
import { FilterDialogComponent } from 'app/components/search-results/filter-dialog/filter-dialog.component';
import { SearchFiltersService } from 'app/components/search-results/search-filters/search-filters.service';
import { FilterSidenavComponent } from 'app/components/search-results/filter-sidenav/filter-sidenav.component';

@Component({
  template: `
    <a appSearchResultLink [item]="nonPolicyExample" id="nonPolicyExample">Non Policy Example Link</a>
    <a appSearchResultLink [item]="policyExample" id="policyExample">Policy Example Link</a>
  `
})
class TestSearchResultLinkComponent {
    private nonPolicyExample: ListItem;
    private policyExample: ListItem;

    constructor() {
        this.nonPolicyExample = JSON.parse(`{
            "type": "content",
            "id": 40,
            "title": "Animal Ethics",
            "subtitle": "Information about animal welfare legislation, the need for approval by the Animal Ethics Committee (AEC) for the use of animals in research and teaching, and the application process.",
            "image": "content/justice.svg",
            "url": "blank",
            "relevance": 0,
            "categories": [
                "Service",
                "Training"
            ]
        }`);

        this.policyExample = JSON.parse(`{
            "type": "policy",
            "id": 20,
            "title": "ASAS Terms of Use and Terms of Conditions",
            "subtitle": "Terms of Use or Conditions which apply to internal or external ASAS users respectively.",
            "image": "content/policy.svg",
            "url": "http://www.science.auckland.ac.nz/en/for/business-employers-and-community-2/analytical-services/terms-and-conditions-.html#af93d031815a79fbba36e0d93fb0eedf",
            "relevance": 0,
            "categories": [
                "Policy"
            ]
        }`);

    }
}

describe('Directive: SearchResultLink', () => {

    let fixture: ComponentFixture<TestSearchResultLinkComponent>;
    let de: DebugElement;

    const fakeActivatedRoute = {
        snapshot: { data: { } }
    } as ActivatedRoute;

    beforeEach(() => {

        // Fake Google analytics function (used rather than importing script unnecessarily)
        (<any>window).ga = function() {}

        fixture = TestBed.configureTestingModule({
            declarations: [
                TestSearchResultLinkComponent,
            ],
            imports: [
                CommonModule,
                SharedModule,
                SearchResultsModule,
                routing
            ],
            providers: [
                SearchResultsComponentService,
                AnalyticsService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ]
        }).createComponent(TestSearchResultLinkComponent);

        fixture.detectChanges(); // Create initial binding

        // First element with an attached SearchResultLink directive
        de = fixture.debugElement.query(By.directive(SearchResultLinkDirective));
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(de).toBeTruthy();
    });

    it('should have a listItem bound to it', () => {
        const searchResultDir = de.injector.get(SearchResultLinkDirective) as SearchResultLinkDirective;
        expect(searchResultDir.item).toBeTruthy();
    });

    it('should have an internal link if it is not a policy', () => {
         const a = fixture.debugElement.query(By.css('#nonPolicyExample')).nativeElement;
         expect(a.href).toContain(document.location.hostname);
    });

    it('should have an external link if it is a policy', () => {
         const a = fixture.debugElement.query(By.css('#policyExample')).nativeElement;
         expect(a.href).not.toContain(document.location.hostname);
    });

    it('should open in the same tab if it is not a policy', () => {
         const aTarget = fixture.debugElement.query(By.css('#nonPolicyExample')).nativeElement.target;
         expect(aTarget).toBe('_self');
    });

    it('should open in a new tab if it is a policy', () => {
         const aTarget = fixture.debugElement.query(By.css('#policyExample')).nativeElement.target;
         expect(aTarget).toBe('_blank');
    });
});
