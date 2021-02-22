import {Content} from './Content';

export interface GuideCategory {
  id: number;
  name: string;
  content: Content;
  displayOrder: number;
  summary: string;
  description: string;
  additionalInfo: string;
  icon: string;
}
