import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumanCasePipe } from '../../../pipes/human-case.pipe';

import { LargeCardsComponent } from './large-cards.component';

describe('LargeCardsComponent', () => {
  let component: LargeCardsComponent;
  let fixture: ComponentFixture<LargeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeCardsComponent, HumanCasePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeCardsComponent);
    component = fixture.componentInstance;
    component.contentItem = {"ssoProtected": false,
    "title": "Star Wars Films",
    "banner": {
      "url": "https://images.ctfassets.net/vbuxn5csp0ik/41ssWDWCHzLUp8hVinPKw2/a74ae1a83d6f422b81fb96225c4f91d7/star-wars.png"
    },
    "__typename": "SubHub",
    "slug": "star-wars-films",
    "summary": "Star Wars, space opera film series created by George Lucas that became one of the most successful and influential franchises in motion picture history.",
    "internalPagesCollection": {
      "items": [
        {
          "__typename": "Article",
          "slug": "star-wars-episode-1-the-phantom-menace",
          "title": "Star Wars: Episode 1 - The Phantom Menace",
          "summary": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "1",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/7dCFLQEQW77FjcPxqnb9kn/fe530fdd2d62ea6b91d4d620b68a5c41/1.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-2-attack-of-the-clones",
          "title": "Star Wars: Episode 2 - Attack of the Clones",
          "summary": "Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator and discovers a secret clone army crafted for the Jedi.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "2",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/4caYEor0tgADwavoevtPCh/a4848bf2cd30c915db75a8e3cff80267/2.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-3-revenge-of-the-sith",
          "title": "Star Wars: Episode 3 - Revenge of the Sith",
          "summary": "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "3",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/5Yh2B4u2S18gGnT9wuFetd/71d04ebd8852defba0991a9c85082b61/3.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-4-a-new-hope",
          "title": "Star Wars: Episode 4 - A New Hope",
          "summary": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "Star Wars 1",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/2Jl9r36VAKFLugt2sFLQ96/968479eefa41f1ca57dfb98be2bd4d08/4.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-5-the-empire-strikes-back",
          "title": "Star Wars: Episode 5 - The Empire Strikes Back",
          "summary": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "The Empire Strikes Back",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/5FiwaMco1fgbQ6DyMLnGxY/cb56a37df30925a353054e2ac780cbe1/5.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-6-return-of-the-jedi",
          "title": "Star Wars: Episode 6 - Return of the Jedi",
          "summary": "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "Return of the Jedi",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/2rGjXUoQyhifXdC8j6Q5aj/126489b8124ac42a8c9de2a87b02d91f/6.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-7-the-force-awakens",
          "title": "Star Wars: Episode 7 - The Force Awakens",
          "summary": "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "The Force Awakens",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/1AFvs7sq3th5H6fBsYlXyn/abd98a5b997db475b2422c0fec38d53a/7.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-8-the-last-jedi",
          "title": "Star Wars: Episode 8 - The Last Jedi",
          "summary": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "The Last Jedi",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/5TcqlgvxOFT3SYjKqDFWpb/494c4cf40da2f9a55046ee8bea220817/8.png"
          }
        },
        {
          "__typename": "Article",
          "slug": "star-wars-episode-9-the-rise-of-skywalker",
          "title": "Star Wars: Episode 9 - The Rise of Skywalker",
          "summary": "The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end.",
          "ssoProtected": false,
          "searchable": true,
          "banner": {
            "title": "The Rise of Skywalker",
            "description": null,
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/3zkIIfJf7z96yaVL9I2Q2w/798875f51da7af8a55a2ba66e93ddb17/9.png"
          }
        }
      ]
    },
    "externalPagesCollection": {
      "items": []
    }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
