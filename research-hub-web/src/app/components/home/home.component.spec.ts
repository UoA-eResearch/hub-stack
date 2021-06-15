import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { BrowseComponent } from './browse/browse.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { ContentTitleComponent } from './content-title/content-title.component';
import { FeaturedComponent } from './featured/featured.component';
import { HomeComponent } from './home.component';
import { ResearchActivityComponent } from './research-activity/research-activity.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(FeaturedComponent),
        MockComponent(BrowseComponent),
        MockComponent(ResearchActivityComponent),
        MockComponent(ContentTitleComponent),
        MockComponent(ContentContainerComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
