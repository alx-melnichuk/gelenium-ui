import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlItem, URL_COMPONENTS, URL_INFINITE_SCROLL, URL_INPUT } from './lm-components.interface';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent implements OnInit {
  public inputUrlList: UrlItem[] = this.createInputUrlList();
  public infiniteScrollUrlList: UrlItem[] = this.createInfiniteScrollUrlList();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private createUrlItem(label: string, url: string): UrlItem {
    return { label, url } as UrlItem;
  }

  private createInputUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = '/' + URL_COMPONENTS + '/' + URL_INPUT;
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Attributes', url + '#Attributes'));
    result.push(this.createUrlItem('Validation', url + '#Validation'));
    result.push(this.createUrlItem('Item Size', url + '#ItemSize'));
    result.push(this.createUrlItem('Numerical Value', url + '#NumericalValue'));
    result.push(this.createUrlItem('Helper Text', url + '#HelperText'));
    result.push(this.createUrlItem('Palette Customization', url + '#PaletteCustomization'));
    result.push(this.createUrlItem('Ornaments', url + '#Ornaments'));
    result.push(this.createUrlItem('Border Radius', url + '#BorderRadius'));
    return result;
  }

  private createInfiniteScrollUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const url = '/' + URL_COMPONENTS + '/' + URL_INFINITE_SCROLL;
    result.push(this.createUrlItem('Basic', url + '#Basic'));
    result.push(this.createUrlItem('Optional', url + '#Optional'));
    return result;
  }
}
