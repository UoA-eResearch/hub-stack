import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { BannerImageComponent } from './banner-image.component';

describe('BannerImageComponent', () => {
  let component: BannerImageComponent;
  let fixture: ComponentFixture<BannerImageComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerImageComponent ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(BannerImageComponent);
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
