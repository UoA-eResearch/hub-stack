import { Pipe, PipeTransform } from '@angular/core';
import { ContentTypeDisplayNames } from '@app/global/global-variables';

@Pipe({
  name: 'contentTypeDisplayName'
})
export class ContentTypeDisplayNamePipe implements PipeTransform {

  transform(value: string): string {
    return ContentTypeDisplayNames[value];
  }

}
