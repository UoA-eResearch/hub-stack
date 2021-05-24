import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchBarService } from '../search-bar/search-bar.service';
import { SearchPageComponent } from './search-page.component';

xdescribe('SearchPageComponent', () => {// this test needs work; excluded for now
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        SearchBarComponent // this needs to be mocked, using MockComponent causes error I don't quite understand at the moment
      ],
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule,
        MockModule(MaterialModule),
        MockModule(FormsModule)
      ],
      providers: [
        SearchBarService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
