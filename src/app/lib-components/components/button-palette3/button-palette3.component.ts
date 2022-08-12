import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlComponents } from '../../../lib-components/lib-components.constants';

@Component({
  selector: 'app-button-palette3',
  templateUrl: './button-palette3.component.html',
  styleUrls: ['./button-palette3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPalette3Component {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlButton2 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON');

  public routerLink = this.urlButton2;
  public fragment8 = 'palette8';
  public fragment9 = 'palette9';
  public fragment10 = 'palette10';
  public fragment11 = 'palette11';
  public fragment12 = 'palette12';

  public isDisabledWarning = false;
  public isDisabledInfo = false;
  public isDisabledLight = false;
  public isDisabledDark = false;
  public isDisabledReference = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
