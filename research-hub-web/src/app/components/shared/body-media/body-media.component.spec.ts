import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BLOCKS } from '@contentful/rich-text-types';
import { BehaviorSubject, Observable, of , Subscription} from 'rxjs';
import { BodyMediaComponent } from './body-media.component';
import { BodyMediaService } from '../../../services/body-media.service';

describe('BodyMediaComponent', () => {
  let component: BodyMediaComponent;
  let bodyMediaService: BodyMediaService;
  let fixture: ComponentFixture<BodyMediaComponent>;
  const mockLinkCard$: BehaviorSubject<any> = ({
    "entries": {
      "block": [
        {
          "title": "Wookipedia",
          "summary": "A fandom wiki for Star Wars lore and diegesis.",
          "url": "https://starwars.fandom.com/wiki/Main_Page",
          "sys": {
            "id": "4YAZa38QjarRclrUvAUzw3"
          }
        },
        {
          "title": "Star Wars Fandom",
          "summary": " The Star Wars Wiki is an online encyclopedia for information on the Star Wars universe.",
          "url": "https://starwars.fandom.com/wiki/Main_Page",
          "sys": {
            "id": "4Hphn1OLcz4XWpdtLTCMZG"
          }
        },
        {
          "title": "TheForce.net",
          "summary": "Your daily dose of Star Wars",
          "url": "http://theforce.net/",
          "sys": {
            "id": "3Gqx6HoxR7vn6ro2GhcI8b"
          }
        }
      ]
    }} as unknown as BehaviorSubject<any>);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyMediaComponent ],
      providers: [BodyMediaService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMediaComponent);
    component = fixture.componentInstance;

    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "3Gqx6HoxR7vn6ro2GhcI8b",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": [],
      "nodeType": BLOCKS.EMBEDDED_ENTRY
    }
    spyOn(component.bodyMediaService, 'getBodyMedia').and.returnValue(mockLinkCard$);
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));
});