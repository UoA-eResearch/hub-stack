import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from '../model/ListItem';


@Pipe({
  name: 'listItemToRouterLink'
})
export class ListItemToRouterLinkPipe implements PipeTransform {

  transform(listItem: ListItem): any[] {
      const route = ['/']; // Makes an absolute change to the route
      route.push(listItem.type);
      route.push(listItem.id.toString());
      return route;
  }
}
