import {OrgUnit} from './OrgUnit';

export interface Person {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  jobTitle: string;
  directoryUrl: string;
  image: string;
  orgUnits: Array<OrgUnit>;
}
