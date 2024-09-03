import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllProcessesGQL, ProcessCollection } from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit, OnDestroy {
  public processes: ProcessCollection;
  public title: string = 'Process Collection';

  private subscription = new Subscription();

  constructor(
    private allProcessesGQL: AllProcessesGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.processes = collection)
    );
  }

  public loadContent(): Observable<ProcessCollection> {
    return this.allProcessesGQL.fetch().pipe(
      map((result) => result.data.processCollection as ProcessCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
