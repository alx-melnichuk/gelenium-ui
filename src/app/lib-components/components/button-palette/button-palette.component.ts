import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlUtil } from '../../../lib-core/utils/url.util';

@Component({
  selector: 'app-button-palette',
  templateUrl: './button-palette.component.html',
  styleUrls: ['./button-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPaletteComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlButton2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_BUTTON');

  public routerLink = this.urlButton2;
  public fragment1 = 'palette1';
  public fragment2 = 'palette2';
  public fragment3 = 'palette3';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
