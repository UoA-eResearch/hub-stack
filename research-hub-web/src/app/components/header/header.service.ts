import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';




@Injectable()
export class HeaderService {

  public batchParamsChange: Subject<any> = new Subject<any>();

  private title: string;
  private description: string;
  private imageUrl: string;
  private isVisible: boolean;

  constructor() { }

  setBatchParams(title: string, description: string, imageUrl: string, isVisible: boolean) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.isVisible = isVisible;

    const params = {title: title, description: description, imageUrl: imageUrl, isVisible: isVisible};
    this.batchParamsChange.next(params);
  }
}
