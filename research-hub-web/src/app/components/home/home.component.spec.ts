import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ContentContainerComponent } from './content-container/content-container.component';
import { ContentTitleComponent } from './content-title/content-title.component';
import { FeaturedComponent } from './featured/featured.component';
import { HomeComponent } from './home.component';
import { BannerImageComponent } from './banner-image/banner-image.component';
import { ContactComponent } from './contact/contact.component';
import { PageTitleService } from '@services/page-title.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(FeaturedComponent),
        MockComponent(ContentTitleComponent),
        MockComponent(ContentContainerComponent),
        MockComponent(BannerImageComponent),
        MockComponent(ContactComponent),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
