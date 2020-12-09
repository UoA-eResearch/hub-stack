import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetBlockComponent } from './asset-block.component';

describe('AssetBlockComponent', () => {
  let component: AssetBlockComponent;
  let fixture: ComponentFixture<AssetBlockComponent>;

  const mockAsset = {
    "title": "Welcome to Word as PDF",
      "description": "A sample PDF File",
      "url": "https://assets.ctfassets.net/vbuxn5csp0ik/1hHB9LvcjOe8elcCwJ7c06/c77454e678a16ef6daf1781ac86e4779/Welcome_to_Word_as_PDF.pdf"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBlockComponent);
    component = fixture.componentInstance;
    component.contentItem = mockAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
