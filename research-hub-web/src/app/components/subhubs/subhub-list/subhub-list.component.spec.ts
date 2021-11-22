import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SubhubListComponent } from './subhub-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';

describe('SubhubListComponent', () => {
  let component: SubhubListComponent;
  let fixture: ComponentFixture<SubhubListComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SubhubListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SubhubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all SubHubs', () => {
    // spyOn(component, 'allSubhubGQL').and.returnValue(allMockSubHubs$);
    // component.getAllSubHubs().subscribe(res => {
    //   expect(res).toBeTruthy();
    // });
  // })

    //   it('Should get all SubHubs', async () => {
  //     spyOn(component, 'getAllSubHubs').and.returnValue(allMockSubHubs$);
  //     component.getAllSubHubs().subscribe(res => {
  //       expect(res).toBeTruthy();
  //     });
  //   })
});
