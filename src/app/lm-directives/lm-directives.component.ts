import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlItem, UrlItemUtil } from '../interfaces/url-item.interface';
import { URL_ROOT, URL_REGEX_CHECK } from './constants/url.constants';

@Component({
  selector: 'app-lm-directives',
  templateUrl: './lm-directives.component.html',
  styleUrls: ['./lm-directives.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmDirectivesComponent implements OnInit {
  public expandedRegexCheck = false;
  public urlListRegexCheck: UrlItem[] = this.createUrlListRegexCheck();

  constructor() {
    this.updateStatusExpandedByPathname();
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private getPathRegexCheck(): string {
    return '/' + URL_ROOT + '/' + URL_REGEX_CHECK;
  }

  private createUrlListRegexCheck(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathRegexCheck();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  private updateStatusExpandedByPathname(): void {
    const pathname = location.pathname;
    this.expandedRegexCheck = pathname.startsWith(this.getPathRegexCheck());
  }

  // ** **
}
