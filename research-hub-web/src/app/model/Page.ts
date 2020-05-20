import {OrderBy} from '../services/research-hub-api.service';


export interface Page<T> {
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: OrderBy;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
