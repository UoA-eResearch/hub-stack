import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ContentTitleComponent } from '../content-title/content-title.component';
import { ContactComponent } from './contact.component';
import { SharedModule } from './../../shared/app.shared.module';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ContactComponent,
        MockComponent(ContentContainerComponent),
        MockComponent(ContentTitleComponent)
      ],
      imports: [
        MockModule(SharedModule)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
