import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponentService } from '../../app.component.service';
import { SoftwareComponent } from './software.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoftwareCollection, AllSoftwareGQL, Software } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SoftwareComponent', () => {
  let component: SoftwareComponent;
  let fixture: ComponentFixture<SoftwareComponent>;
  let controller: ApolloTestingController;
  const mockAllSoftware$: Observable<SoftwareCollection> = of({
    'items': [
      {
        "__typename": "Software",
        "title": "Demo - Open Refine",
        "slug": "open-refine",
        "summary": "OpenRefine is a standalone open source desktop application for data cleanup and transformation to other formats",
        "ssoProtected": false
      },
      {
        "__typename": "Software",
        "title": "Demo - Research Outputs",
        "slug": "research-outputs",
        "summary": "Research Outputs is the research management system used by University staff and doctoral candidates to record their research publications and activities.",
        "ssoProtected": false
      },
      {
        "__typename": "Software",
        "title": "Test - Adobe Photoshop",
        "slug": "adobe-photoshop",
        "summary": "Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. ",
        "ssoProtected": false
      }
    ],
    '__typename': 'SoftwareCollection'
  } as SoftwareCollection);

  const mockSoftware$: Observable<Software> = of({"__typename": "Software",
  "sys": {
    "id": "5hb587LTMdgBc4YRRmU9Wv"
  },
  "title": "Demo - Open Refine",
  "slug": "open-refine",
  "ssoProtected": false,
  "banner": null,
  "summary": "OpenRefine is a standalone open source desktop application for data cleanup and transformation to other formats",
  "bodyText": {
    "json": {
      "data": {},
      "content": [
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [
                {
                  "type": "bold"
                }
              ],
              "value": "OpenRefine",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": ", formerly called ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "bold"
                }
              ],
              "value": "Google Refine",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": " and before that ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "bold"
                }
              ],
              "value": "Freebase Gridworks",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": ", is a standalone open source desktop application for data cleanup and transformation to other formats, the activity known as ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Data_wrangling"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "data wrangling",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": ".",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/OpenRefine#cite_note-3"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "[3]",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " It is similar to ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Spreadsheet"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "spreadsheet",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " applications (and can work with spreadsheet file formats); however, it behaves more like a database.",
              "nodeType": "text"
            }
          ],
          "nodeType": "paragraph"
        },
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "It operates on ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "italic"
                }
              ],
              "value": "rows",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": " of data which have cells under ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "italic"
                }
              ],
              "value": "columns,",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": " which is very similar to ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Relational_database"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "relational database",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " tables. An OpenRefine project consists of one table. The user can filter the rows to display using ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "italic"
                }
              ],
              "value": "facets",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": "\n that define filtering criteria (for example, showing rows where a given column is not empty). Unlike spreadsheets, most operations in OpenRefine are done on all visible rows: transformation of all cells in all rows under one column,",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/OpenRefine#cite_note-4"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "[4]",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": "\n creation of a new column based on existing column data, etc. All actions that were done on a dataset are stored in a project and can be replayed on another dataset.",
              "nodeType": "text"
            }
          ],
          "nodeType": "paragraph"
        },
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "Unlike spreadsheets, no formulas are stored in the cells, but formulas are used to transform the data, and transformation is done only once.",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/OpenRefine#cite_note-5"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "[5]",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " Transformation expressions can be written in ",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [
                {
                  "type": "bold"
                }
              ],
              "value": "General Refine Expression Language (GREL)",
              "nodeType": "text"
            },
            {
              "data": {},
              "marks": [],
              "value": ",",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/OpenRefine#cite_note-6"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "[6]",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Jython"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Jython",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " (i.e. Python) and ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Clojure"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Clojure",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": ".",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/OpenRefine#cite_note-7"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "[7]",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": "",
              "nodeType": "text"
            }
          ],
          "nodeType": "paragraph"
        },
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "The program has a ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Web_user_interface"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "web user interface",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": ". However, it is not hosted on the web (",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Software_as_a_service"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "SAAS",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": "), but is available for download and use on the local machine. When starting OpenRefine, it starts a ",
              "nodeType": "text"
            },
            {
              "data": {
                "uri": "https://en.wikipedia.org/wiki/Web_server"
              },
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "web server",
                  "nodeType": "text"
                }
              ],
              "nodeType": "hyperlink"
            },
            {
              "data": {},
              "marks": [],
              "value": " and starts a browser to open the web UI powered by this web server.\n",
              "nodeType": "text"
            }
          ],
          "nodeType": "paragraph"
        },
        {
          "data": {},
          "content": [
            {
              "data": {},
              "marks": [],
              "value": "\n\n",
              "nodeType": "text"
            }
          ],
          "nodeType": "paragraph"
        }
      ],
      "nodeType": "document"
    }
  },
  "keywords": [
    "Research Data",
    "Data Wrangling",
    "Data Cleanup",
    "Data Transformation"
  ],
  "link": "http://openrefine.org/",
  "relatedContactsCollection": {
    "items": []
  },
  "relatedOrgsCollection": {
    "items": [
      {
        "__typename": "OrganisationalUnit",
        "slug": "Crentre-for-eresearch",
        "title": "Demo - Centre for eResearch",
        "summary": "The Centre for eResearch is centrally funded by the University to deliver the services to help researchers address challenging  computational problems. These services are generally free to use for research staff and students.",
        "ssoProtected": false,
        "searchable": true
      }
    ]
  },
  "relatedItemsCollection": {
    "items": []
  },
  "searchable": true,
  "category": [
    "Software & Internet Access",
    "Research data management"
  ],
  "support": null
  } as unknown as Software);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareComponent],
      imports: [
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ], providers: [
        AppComponentService,
        AllSoftwareGQL
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    fixture.destroy();
    controller.verify();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all software', () => {
    spyOn(component, 'getAllSoftware').and.returnValue(mockAllSoftware$);
    component.getAllSoftware().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(SoftwareComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'open-refine'
      });
      fixture.detectChanges();
    });

    it('Should get a single software data', () => {
      spyOn(component, 'getSoftwareBySlug').and.returnValue(mockSoftware$);
      component.getSoftwareBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('open-refine');
      });
    });

    it('Should get a single software data by ID', () => {
      spyOn(component, 'getSoftwareByID').and.returnValue(mockSoftware$);
      component.getSoftwareByID('').subscribe(res => {
        expect(res.sys.id).toEqual('5hb587LTMdgBc4YRRmU9Wv');
      });
    })
  });
});
