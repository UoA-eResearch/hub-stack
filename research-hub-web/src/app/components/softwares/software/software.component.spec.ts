import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { SoftwareComponent } from './software.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoftwareCollection, AllSoftwareGQL, Software } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, MockProvider } from 'ng-mocks';

describe('SoftwaresComponent', () => {
  let component: SoftwareComponent;
  let fixture: ComponentFixture<SoftwareComponent>;
  let controller: ApolloTestingController;

  const mockAllSoftware$: Observable<SoftwareCollection> = of({
    'items': [
      {
        '__typename': 'Software',
        'slug': 'death-star',
        'title': 'Death Star',
        'summary': 'Mobile space station and galactic superweapon.',
        'ssoProtected': true,
        'searchable': false
      }
    ],
    '__typename': 'SoftwareCollection'
  } as SoftwareCollection);

  const mockSoftware$: Observable<Software> = of(
    {
      '__typename': 'Software',
      'sys': {
        'id': '111'
      },
      'slug': 'death-star',
      'title': 'Death Star',
      'summary': 'Mobile space station and galactic superweapon.',
      'ssoProtected': true,
      'searchable': false
    } as Software);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SoftwareComponent
      ],
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule)
      ], providers: [
        MockProvider(PageTitleService)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all Software', () => {
  //   spyOn(component, 'getAllSoftware').and.returnValue(mockAllSoftware$);
  //   component.getAllSoftware().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })

  // describe('When a url slug is present', async () => {
  //   beforeEach(() => {
  //     controller = TestBed.inject(ApolloTestingController);
  //     fixture = TestBed.createComponent(SoftwareComponent);
  //     component = fixture.componentInstance;
  //     TestBed.inject(ActivatedRoute).params = of({
  //       slug: 'death-star'
  //     });
  //     fixture.detectChanges();
  //   })

  //   it('Should get a single software data by Slug', () => {
  //     spyOn(component, 'getSoftwareBySlug').and.returnValue(mockSoftware$);
  //     component.getSoftwareBySlug(component.slug).subscribe(res => {
  //       expect(res.slug).toEqual('death-star');
  //     });
  //   })
  // });
});
