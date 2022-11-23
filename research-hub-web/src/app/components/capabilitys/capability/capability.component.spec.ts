import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ArticleListComponent } from '@app/components/articles/article-list/article-list.component';
import { SharedModule } from '@app/components/shared/app.shared.module';
import { PageTitleService } from '@services/page-title.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { CapabilityComponent } from './capability.component';

const testSlug = 'first-capability';

describe('CapabilityComponent', () => {
  let component: CapabilityComponent;
  let fixture: ComponentFixture<CapabilityComponent>;
  let controller: ApolloTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapabilityComponent],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([
          { path: 'article/list', component: ArticleListComponent }
        ])
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(ActivatedRoute).params = of({
      slug: testSlug
    });
    fixture = TestBed.createComponent(CapabilityComponent);
    controller = TestBed.inject(ApolloTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
