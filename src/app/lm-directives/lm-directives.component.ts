import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from '../constants/constants';
import { UrlItem, UrlItemUtil } from '../interfaces/url-item.interface';

import { UrlDirectives } from './constants/url-directives.constants';

@Component({
  selector: 'app-lm-directives',
  templateUrl: './lm-directives.component.html',
  styleUrls: ['./lm-directives.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmDirectivesComponent implements OnInit {
  public expandedHeight = EXPANDED_HEIGHT;

  public expandedRegexCheck = false;
  public urlListRegexCheck: UrlItem[] = this.createUrlListRegexCheck();

  public expandedRegexMatch = false;
  public urlListRegexMatch: UrlItem[] = this.createUrlListRegexMatch();

  public expandedRegexRemove = false;
  public urlListRegexRemove: UrlItem[] = this.createUrlListRegexRemove();

  constructor() {
    this.updateStatusExpandedByPathname();
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  // ** RegexCheck **

  private getPathRegexCheck(): string {
    return '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_CHECK');
  }

  private createUrlListRegexCheck(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathRegexCheck();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** RegexMatch **

  private getPathRegexMatch(): string {
    return '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_MATCH');
  }

  private createUrlListRegexMatch(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathRegexMatch();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** RegexRemove **

  private getPathRegexRemove(): string {
    return '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_REMOVE');
  }

  private createUrlListRegexRemove(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = this.getPathRegexRemove();
    result.push(UrlItemUtil.create('Basic', url + '#Basic'));
    result.push(UrlItemUtil.create('Api', url + '#Api'));
    return result;
  }

  // ** -- **

  private updateStatusExpandedByPathname(): void {
    const pathname = location.pathname;
    this.expandedRegexCheck = pathname.startsWith(this.getPathRegexCheck());
    this.expandedRegexMatch = pathname.startsWith(this.getPathRegexMatch());
    this.expandedRegexRemove = pathname.startsWith(this.getPathRegexRemove());
  }

  // ** **
}
