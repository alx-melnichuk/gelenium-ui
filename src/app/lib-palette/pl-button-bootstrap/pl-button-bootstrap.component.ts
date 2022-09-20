import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnButtonConfig, GlnButtonExterior, GlnFrameSize } from 'gelenium-ui';

import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';
import { UrlUtil } from '../../lib-core/utils/url.util';

@Component({
  selector: 'app-pl-button-bootstrap',
  templateUrl: './pl-button-bootstrap.component.html',
  styleUrls: ['./pl-button-bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlButtonBootstrapComponent {
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

  public urlPlButton = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_BUTTON');

  public routerLink = this.urlPlButton;

  public isDisabledPrimary = false;
  public isDisabledSecondary = false;
  public isDisabledSuccess = false;
  public isDisabledDanger = false;
  public isDisabledWarning = false;
  public isDisabledInfo = false;
  public isDisabledLight = false;
  public isDisabledDark = false;
  public isDisabledReference = false;

  public cfgContained: GlnButtonConfig = {
    exterior: GlnButtonExterior.contained,
    frameSize: GlnFrameSize.short,
    isNoRipple: true,
  };

  public cfgOutlined: GlnButtonConfig = {
    exterior: GlnButtonExterior.outlined,
    frameSize: GlnFrameSize.short,
    isNoRipple: true,
  };

  public cfgText: GlnButtonConfig = {
    exterior: GlnButtonExterior.text,
    frameSize: GlnFrameSize.short,
    isNoRipple: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
