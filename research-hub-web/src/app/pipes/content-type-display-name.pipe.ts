import { Pipe, PipeTransform } from '@angular/core';
import { ContentTypeDisplayNames } from '@app/global/global-variables';
import { HumanCasePipe } from './human-case.pipe';

@Pipe({
  name: 'contentTypeDisplayName'
})
export class ContentTypeDisplayNamePipe implements PipeTransform {
  private humanCasePipe = new HumanCasePipe;

  transform(value: string): string {
    return ContentTypeDisplayNames[value.toLowerCase()] ??
      this.humanCasePipe.transform(value);
  }

}
