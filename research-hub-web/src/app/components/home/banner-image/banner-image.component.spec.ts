import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { BannerImageComponent } from './banner-image.component';
import { CommonModule } from '@angular/common';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@app/components/shared/app.shared.module';

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
        MockModule(CommonModule),
        MockModule(SharedModule)
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
