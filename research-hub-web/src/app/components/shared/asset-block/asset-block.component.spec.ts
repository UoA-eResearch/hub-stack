import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBlockComponent } from './asset-block.component';

describe('AssetBlockComponent', () => {
  let component: AssetBlockComponent;
  let fixture: ComponentFixture<AssetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
