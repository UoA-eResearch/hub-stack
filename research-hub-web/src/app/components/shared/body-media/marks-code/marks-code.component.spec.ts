import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MARKS, Text as IText } from '@contentful/rich-text-types';
import { MarksCodeComponent } from './marks-code.component';

export interface Text extends IText {
  markIndex: number;
}

describe('MarksCodeComponent', () => {
  let component: MarksCodeComponent;
  let fixture: ComponentFixture<MarksCodeComponent>;

  const node: Text = {
    "nodeType": "text",
    "value": "    inline    code   ",
    "marks": [{
      "type": MARKS.CODE
    }],
    "data": {},
    "markIndex": 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksCodeComponent);
    component = fixture.componentInstance;
    component.node = node;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.contentItem).toBe(node.value);
  });
});
