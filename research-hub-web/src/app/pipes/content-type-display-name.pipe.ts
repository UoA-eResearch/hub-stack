import { Pipe, PipeTransform } from '@angular/core';
import { HumanCasePipe } from './human-case.pipe';

export const ContentTypeDisplayNames = {
  'article': 'Article',
  'casestudy': 'Case Study',
  'equipment': 'Equipment',
  'event': 'Event',
  'funding': 'Funding',
  'service': 'Service',
  'software': 'Software',
  'subhub': 'Topic',
  'officialdocuments': 'Document',
  'orgunit': 'Unit',
  'person': 'Contact'
};

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
