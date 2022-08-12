import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-button-size',
  templateUrl: './button-size.component.html',
  styleUrls: ['./button-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSizeComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;
  @Input()
  public labelContained = BTN_CONTAINED;
  @Input()
  public labelOutlined = BTN_OUTLINED;
  @Input()
  public labelText = BTN_TEXT;

  public exterior03a = 'outlined';
  public exterior03b = 'outlined';

  public urlButton1 = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_BUTTON1');

  public routerLink = this.urlButton1;
  public fragment03a = 'size-link3a';
  public fragment03b = 'size-link3b';
  public fragment03c = 'size-link3c';
  public fragment03d = 'size-link3d';
  public fragment03e = 'size-link3e';
  public fragment03f = 'size-link3f';
  public fragment03g = 'size-link3g';
  public fragment03h = 'size-link3h';
  public fragment03i = 'size-link3i';
  // GlnButtonConfig
  public config03 = {
    frameSizeValue: 57,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
}
