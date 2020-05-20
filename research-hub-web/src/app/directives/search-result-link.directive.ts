import { Directive, ElementRef, Input, AfterViewInit, HostListener, SimpleChanges, OnChanges} from '@angular/core';
import { ListItem } from 'app/model/ListItem';
import { AnalyticsService } from 'app/services/analytics.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
    selector: '[appSearchResultLink]'
})
export class SearchResultLinkDirective implements OnChanges {
    @Input() item: ListItem;

    constructor(private el: ElementRef, private analyticsService: AnalyticsService, private route: ActivatedRoute) {}

    @HostListener('click') click() {
       if (this.item.type === 'policy') {
           this.analyticsService.trackPolicy(this.item.title, this.item.url);
       }
   }

    ngOnChanges(changes: SimpleChanges) {
        this.item = changes.item.currentValue;
        if (this.item.type === 'policy') {
            this.el.nativeElement.href = this.item.url;
            this.el.nativeElement.target = '_blank';
        } else {
            this.el.nativeElement.href = '#/' + this.item.type + '/' + this.item.id.toString();
            this.el.nativeElement.target = '_self';
        }
    }
}
