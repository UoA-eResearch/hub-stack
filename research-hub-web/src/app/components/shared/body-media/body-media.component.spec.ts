import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { BodyMediaComponent } from './body-media.component';
import { BodyMediaService } from '../../../services/body-media.service';

describe('BodyMediaComponent', () => {
  let component: BodyMediaComponent;
  let fixture: ComponentFixture<BodyMediaComponent>;

  const mockLinkCard = {
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
      ],
      "inline": [
        {
          "sys": {
            "id": "5nxnLALq66B9OhRfctSEbv"
          },
          "__typename": "Equipment",
          "slug": "banana",
          "title": "Banana",
          "summary": "High tech piece of equipment, a banana.",
          "banner": {
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/3lnh1iAI2XfB7QSmxmkk80/3d6f57963e61382e6eb5f924cd77f1a9/6lXPZr.jpg"
          },
          "ssoProtected": false,
          "searchable": true
        }
      ],
      "hyperlink": [
        {
          "sys": {
            "id": "2647FkFSbo4chjpDcwzx9o"
          },
          "__typename": "SubHub",
          "slug": "star-wars",
          "title": "Star Wars",
          "summary": "Star Wars is an American epic space opera media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenon. ",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/4zi39gUOD5Grhb5yeUEfJs/602be4ec1ad3a5e19d96b930879b35b2/star-wars.jpg"
          }
        }
      ]
    },
    "assets": {
      "block": [
        {
          "sys": {
            "id": "7rDB26Qx10Ctjog2as3XDZ"
          },
          "title": "Ashoka's Escape",
          "description": "Although many targets of Order 66 were killed by their own soldiers, Ahsoka Tano managed to escape with the help of Rex, after removing his inhibitor chip to free him from the brainwashing.",
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/7rDB26Qx10Ctjog2as3XDZ/942f070a77e9a99e0cecd8228046c0cb/giphy.gif",
          "size": 3074160
        }
      ],
      "hyperlink": [
        {
          "sys": {
            "id": "2o4i2f1vxfLW2NlQuuSE8I"
          },
          "title": "The redemption of Anakin Skywalker led to the return of the Jedi.",
          "description": null,
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/2o4i2f1vxfLW2NlQuuSE8I/fd5099edbed368b30ecf2d12495ab584/maxresdefault.jpg",
          "size": 109905
        }
      ]
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BodyMediaComponent],
      providers: [BodyMediaService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(BodyMediaComponent);
    component = fixture.componentInstance;
    component.bodyMediaService.setBodyMedia(mockLinkCard);
    spyOn(component.bodyMediaService, 'getBodyMedia').and.returnValue(mockLinkCard);
  });

  it('should create entry-block', () => {
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
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create asset-block', () => {
    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "7rDB26Qx10Ctjog2as3XDZ",
            "type": "Link",
            "linkType": "Asset"
          }
        }
      },
      "content": [],
      "nodeType": BLOCKS.EMBEDDED_ASSET
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create entry-inline', () => {
    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "5nxnLALq66B9OhRfctSEbv",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": [],
      "nodeType": INLINES.EMBEDDED_ENTRY
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create entry-hyperlink', () => {
    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "2647FkFSbo4chjpDcwzx9o",
            "type": "Link",
            "linkType": "Entry"
          }
        }
      },
      "content": [],
      "nodeType": INLINES.ENTRY_HYPERLINK
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create asset-hyperlink', () => {
    component.node = {
      "data": {
        "target": {
          "sys": {
            "id": "2o4i2f1vxfLW2NlQuuSE8I",
            "type": "Link",
            "linkType": "Asset"
          }
        }
      },
      "content": [],
      "nodeType": INLINES.ASSET_HYPERLINK
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});