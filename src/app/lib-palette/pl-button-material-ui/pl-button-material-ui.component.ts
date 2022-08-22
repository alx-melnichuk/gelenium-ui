import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnButtonConfig, GlnButtonExterior, GlnFrameSize } from 'gelenium-ui';

import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-pl-button-material-ui',
  templateUrl: './pl-button-material-ui.component.html',
  styleUrls: ['./pl-button-material-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlButtonMaterialUiComponent {
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

  public urlPlButton = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_BUTTON');

  public routerLink = this.urlPlButton;
  public exterior03a = 'outlined';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }
}
