import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { 
  AllCategoriesGQL,
  AllStagesGQL,
  AllOrganisationsGQL,
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
  EventCollection  
} from '@app/graphql/schema';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ContentTypeDisplayNames } from '@app/global/global-variables';


@Injectable()
export class SearchBarService {
  public searchCategoryChange: Subject<any> = new Subject<any>();
  public searchStageChange: Subject<any> = new Subject<any>();
  public searchOrganisationChange: Subject<any> = new Subject<any>();
  public resultsChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchTextChange: Subject<any> = new Subject<any>();
  public currentPageChange: Subject<any> = new Subject<any>();
  public totalPagesChange: Subject<any> = new Subject<any>();
  public sortTypeChange: Subject<any> = new Subject<any>();
  public contentTypeChange: Subject<any> = new Subject<any>();
  public searchText: string;
  public category: Array<any> = new Array<any>();
  public stage: Array<any> = new Array<any>();
  public organisation: Array<any> = new Array<any>();
  public resultArray;
  public currentPage;
  public totalPages;
  public sortType;
  public contentType: Array<string> = Object.keys(ContentTypeDisplayNames);
  public eventIdChange: Subject<any> = new Subject<any>();
  public eventId;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public allStagesGQL: AllStagesGQL,
    public allOrganisationsGQL: AllOrganisationsGQL,
    private http: HttpClient
  ) { }


  // Category
  setCategory(category) {
    if (category !== undefined) {
      this.category = category;
      this.searchCategoryChange.next(category);
    }
  }
  getCategory() {
    return this.category;
  }

  // Category
  setEventId(eventId) {
    if (eventId !== undefined) {
      this.eventId = eventId;
      this.eventIdChange.next(eventId);
    }
  }
  getEventId() {
    return this.eventId;
  }

  // Stage
  setStage(stage) {
    if (stage !== undefined) {
      this.stage = stage;
      this.searchStageChange.next(stage);
    }
  }
  getStage() {
    return this.stage;
  }


  // Organisation
  setOrganisation(organisation) {
    if (organisation !== undefined) {
      this.organisation = organisation;
      this.searchOrganisationChange.next(organisation);
    }
  }
  getOrganisation() {
    return this.organisation;
  }

  // Sort Type
  setSort(sortType) {
    if (sortType !== undefined) {
      this.sortType = sortType;
      this.sortTypeChange.next(sortType);
    }
  }
  getSort() {
    return this.sortType;
  }

  // Content Type
  setContentType(contentType) {
    if (contentType !== undefined) {
      this.contentType = contentType;
      this.contentTypeChange.next(contentType);
    }
  }
  getContentType() {
    return this.contentType;
  }

  // Current Page
  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
    this.currentPageChange.next(currentPage);
  }
  getCurrentPage() {
    return this.currentPage;
  }

  // Total Pages
  setTotalPages(totalPages) {
    this.totalPages = totalPages;
    this.totalPagesChange.next(totalPages);
  }
  getTotalPages() {
    return this.totalPages;
  }

  // Search Text
  setSearchText(searchText) {
      this.searchText = searchText;
      this.searchTextChange.next(searchText);
  }
  getSearchText() {
    return this.searchText;
  }

  // Search Results
  getResults() {
    return this.resultArray;
  }
  setResults(results) {
      this.resultArray = results;
      this.resultsChange.next(results);
  }

   // Get all research stages
   public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }

  // Get all research categories
  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  // Get all organisations
  public getAllOrganisations(): Observable<OrgUnitCollection> {
    try {
      return this.allOrganisationsGQL.fetch()
        .pipe(pluck('data', 'orgUnitCollection')) as Observable<OrgUnitCollection>
    } catch (e) { console.error('Error loading all organisations:', e) };
  }

  // Create list result
  public createResultsList() {
      // Set page number to 1 as default
      if (this.getCurrentPage() == undefined) this.setCurrentPage(1);
      this.setTotalPages(this.getTotalPages());

      // Triggers loading animation on collection page
      this.setTotalPages(this.getTotalPages());

      // Create deep copy of category array to handle events manually
      let categories = this.getCategory().map(x => { return  x });

      // If event is selected, remove it from search parameters, event is a content model so must be handled differently
      if (this.getCategory().includes(this.getEventId())) {
        categories.splice(this.getCategory().indexOf(this.getEventId()), 1)
        this.contentType = ["event"]
      }

      let searchText = this.getSearchText() !== undefined ? this.getSearchText() : '';

      // Create the search query
      let query = {
        query: searchText,
        size: 10,
        from: (this.getCurrentPage() - 1) * 10,
        sort: this.getSort(),
        filters: {
          relatedOrgs: this.getOrganisation(),
          stage: this.getStage(),
          category: categories
        },
        includeContentTypes : this.contentType
      };

      // Send the POST request
      this.http.post(environment.searchUrl, query).subscribe(data => {
        let array = [];
        data["result"]["hits"]["hits"].forEach(element => {
          // Set how the results will be displayed
          const title: string = element.highlight?.["fields.title.en-US"] ?
            element.highlight["fields.title.en-US"].join('') :
            element._source.fields.title["en-US"];

          const summary: string = element.highlight?.["fields.summary.en-US"] ?
            element.highlight["fields.summary.en-US"].join(' ') :
            element._source.fields.summary["en-US"];

          const keywords: string[] = element.highlight?.["fields.keywords.en-US"] ?
            element.highlight["fields.keywords.en-US"] :
            element._source.fields.keywords?.["en-US"];

          const typeAndKeywords: string[] = keywords != undefined ?
            [ContentTypeDisplayNames[element._source.sys.contentType.sys.id]].concat(keywords) :
            [ContentTypeDisplayNames[element._source.sys.contentType.sys.id]]

          let result = {
            "title": title,
            "summary" : summary,
            "slug" : element._source.fields.slug["en-US"],
            "ssoProtected" : element._source.fields.ssoProtected["en-US"],
            "__typename" : element._source.sys.contentType.sys.id,
            "icon": element._source.fields.icon?.["en-US"]["url"],
            "keywords": typeAndKeywords
          }
          array.push(result);
        });

        const resultsTotal = data["result"]["hits"]["total"]["value"];
          
        // Create the results
        this.setResults(array);
        this.setTotalPages(resultsTotal);

        // reset the Content Type filter to all pages
        this.contentType = Object.keys(ContentTypeDisplayNames);

        // prepare to send virtual page view for GA site search tracking:
        // url-safe the search text -replace non-alphanumeric, extra whitespaces etc, then join words with +
        const cleanedQuery = searchText.replace(/[\W_]+/g," ").trim().split(' ').join('+');
        const searchCategories = this.getCategory().join('+');
        const researchActivities = this.getStage().join('+');
        const orgs = this.getOrganisation().join('+');

        // push search query info to GTM dataLayer
        // the searchQueryUrl (cleanedQuery) is used to create a virtual page view in GA, which then generates site search data
        window.dataLayer.push({
          event: 'search',
          searchQuery: searchText,
          searchQueryUrl: cleanedQuery,
          resultsTotal: resultsTotal,
          searchCategory: searchCategories,
          researchActivities: researchActivities,
          orgs: orgs
        });
      })
  }
}