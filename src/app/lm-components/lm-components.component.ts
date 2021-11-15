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
  public infiniteScroll: UrlItem[] = [this.createUrlItem('InfiniteScroll', '/' + URL_COMPONENTS + '/' + URL_INFINITE_SCROLL + '#Main')];
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
    const urlInput = '/' + URL_COMPONENTS + '/' + URL_INPUT;
    result.push(this.createUrlItem('Basic', urlInput + '#Basic'));
    result.push(this.createUrlItem('Attributes', urlInput + '#Attributes'));
    result.push(this.createUrlItem('Validation', urlInput + '#Validation'));
    result.push(this.createUrlItem('Item Size', urlInput + '#ItemSize'));
    result.push(this.createUrlItem('Numerical Value', urlInput + '#NumericalValue'));
    result.push(this.createUrlItem('Helper Text', urlInput + '#HelperText'));
    result.push(this.createUrlItem('Palette Customization', urlInput + '#PaletteCustomization'));
    result.push(this.createUrlItem('Ornaments', urlInput + '#Ornaments'));
    result.push(this.createUrlItem('Border Radius', urlInput + '#BorderRadius'));
    // result.push({ label: '', url: urlInput + '#' } as UrlItem);

    return result;
  }
}
