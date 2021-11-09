import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UrlItem, URL_COMPONENTS, URL_INPUT, URL_SELECT } from './lm-components.interface';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent implements OnInit {
  public inputUrlList: UrlItem[] = this.createInputUrlList();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Private API **

  private createInputUrlList(): UrlItem[] {
    const result: UrlItem[] = [];
    const urlInput = '/' + URL_COMPONENTS + '/' + URL_INPUT;
    result.push({ label: 'Basic', url: urlInput + '#Basic' } as UrlItem);
    result.push({ label: 'Attributes', url: urlInput + '#Attributes' } as UrlItem);
    result.push({ label: 'Validation', url: urlInput + '#Validation' } as UrlItem);
    result.push({ label: 'Item Size', url: urlInput + '#ItemSize' } as UrlItem);
    result.push({ label: 'Numerical Value', url: urlInput + '#NumericalValue' } as UrlItem);
    result.push({ label: 'Helper Text', url: urlInput + '#HelperText' } as UrlItem);
    result.push({ label: 'Palette Customization', url: urlInput + '#PaletteCustomization' } as UrlItem);
    result.push({ label: 'Ornaments', url: urlInput + '#Ornaments' } as UrlItem);
    result.push({ label: 'Border Radius', url: urlInput + '#BorderRadius' } as UrlItem);
    // result.push({ label: '', url: urlInput + '#' } as UrlItem);

    return result;
  }

  // private createUrlList(): UrlItem[] {
  //   const result = [];
  //   result.push({ label: 'Input', url: '/' + URL_COMPONENTS + '/' + URL_INPUT } as UrlItem);
  //   result.push({ label: 'Select', url: '/' + URL_COMPONENTS + '/' + URL_SELECT } as UrlItem);
  //   return result;
  // }
}
