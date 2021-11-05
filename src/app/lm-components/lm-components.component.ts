import { Component, OnInit } from '@angular/core';

import { UrlItem, URL_COMPONENTS, URL_INPUT, URL_SELECT } from './lm-components.interface';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
})
export class LmComponentsComponent implements OnInit {
  public urlList: UrlItem[] = this.createUrlList();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private createUrlList(): UrlItem[] {
    const result = [];
    result.push({ label: 'Input', url: '/' + URL_COMPONENTS + '/' + URL_INPUT } as UrlItem);
    result.push({ label: 'Select', url: '/' + URL_COMPONENTS + '/' + URL_SELECT } as UrlItem);
    return result;
  }
}
