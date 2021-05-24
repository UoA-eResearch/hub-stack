import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockModule, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { SearchBarComponent } from './search-bar.component';
import { SearchBarService } from './search-bar.service';

fdescribe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
        MockModule(MaterialModule),
        MockModule(FormsModule)
      ],
      providers: [
        MockProvider(SearchBarService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
