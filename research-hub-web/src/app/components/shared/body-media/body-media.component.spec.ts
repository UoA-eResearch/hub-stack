import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { AppComponentService } from '../../../app.component.service';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BodyMediaComponent } from './body-media.component';

describe('BodyMediaComponent', () => {
  let component: BodyMediaComponent;
  let fixture: ComponentFixture<BodyMediaComponent>;
  let controller: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyMediaComponent ],
      imports: [
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [ 
        AppComponentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(BodyMediaComponent);
    component = fixture.componentInstance;
    component.data = {
      "data": {
        "target": {
          "sys": {
            "id": "4vVyp2nCmE1FVrhxymuDY",
            "type": "Link",
            "linkType": "Asset"
          }
        }
      },
      "content": [],
      "nodeType": "embedded-asset-block"
    }
    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "4vVyp2nCmE1FVrhxymuDY",
            "type": "Link",
            "linkType": "Asset"
          }
        }
      },
      "content": [],
      "nodeType": "embedded-asset-block"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
