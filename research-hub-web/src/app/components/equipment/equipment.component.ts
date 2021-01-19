import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap, flatMap, map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { 
    EquipmentCollection, 
    AllEquipmentGQL, 
    AllEquipmentQuery, 
    AllSearchableContentPublicFieldsGQL, 
    AllSearchableContentPublicFieldsQuery, 
    GetEquipmentBySlugGQL,
    GetEquipmentByIdGQL,
    Equipment 
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { AppComponentService } from '@app/app.component.service';



@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  public allEquipment$: Observable<EquipmentCollection>;
  public equipment$: Observable<Equipment>;
  public slug: string;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public allEquipmentGQL: AllEquipmentGQL,
    public getEquipmentBySlugGQL: GetEquipmentBySlugGQL,
    public getEquipmentByIDGQL: GetEquipmentByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getArticleBySlug() method.
     */
    this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;

    /**
     * If this.slug is defined, we're loading an individual article,
     * therefore run the corresponding query. If not, return all articles.
     */
    if (!!this.slug) {
      this.getEquipmentBySlug(this.slug).subscribe(data => {
        this.equipment$ = this.getEquipmentByID(data.sys.id)
        .pipe(tap(res => this.appComponentService.setTitle(res.title)));
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Equipment');
      this.allEquipment$ = this.getAllEquipment();
    }
  }

  /**
   * Function that returns all articles from the ArticleCollection as an observable
   * of type ArticleCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting article/slug-name.
   */
  public getAllEquipment(): Observable<EquipmentCollection> {
    try {
      return this.allEquipmentGQL.fetch()
        .pipe(pluck('data', 'equipmentCollection')) as Observable<EquipmentCollection>
    } catch (e) { console.error('Error loading all equipment:', e) };
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's slug
   * as an observable of type Article. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /articles.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getEquipmentBySlug(slug: string): Observable<Equipment> {
    try {
      return this.getEquipmentBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.equipmentCollection.items)) as Observable<Equipment>;
    } catch (e) { console.error(`Error loading equipment ${slug}:`, e); }
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's ID
   * as an observable of type Article. This is then unwrapped with the async pipe.
   * ID is retrieved by subscribing to 'getArticleBySlug'.
   */
  public getEquipmentByID(id: string): Observable<Equipment> {
    try {
      return this.getEquipmentByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.equipment), catchError(err => (this.router.navigate(['/error/500'])))) as Observable<Equipment>;
    } catch (e) { console.error(`Error loading article ${id}:`, e); }
  }
}
