import {Person} from './Person';
import {Content} from './Content';

export interface OrgUnit {
  id: number;
  name: string;
  summary: string;
  image: string;
  url: string;
  people: Array<Person>;
  contentItems: Array<Content>;
}
