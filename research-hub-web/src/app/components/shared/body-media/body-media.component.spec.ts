import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaComponent } from './body-media.component';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('BodyMediaComponent', () => {
  let component: BodyMediaComponent;
  let fixture: ComponentFixture<BodyMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMediaComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMediaComponent);
    component = fixture.componentInstance;
    component.node = { "data": { "target": { "sys": { "id": "51CsS9cFmuRN2s0wOcWuuF", "type": "Link", "linkType": "Entry" } } }, "content": [], "nodeType": BLOCKS.EMBEDDED_ENTRY };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
