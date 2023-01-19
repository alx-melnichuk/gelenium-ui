import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnButtonConfig } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { BTN_CONTAINED, BTN_OUTLINED, BTN_TEXT, LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

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

  public urlPlButton = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_BUTTON');

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
    exterior: 'contained',
    size: 'short',
    isNoRipple: true,
  };

  public cfgOutlined: GlnButtonConfig = {
    exterior: 'outlined',
    size: 'short',
    isNoRipple: true,
  };

  public cfgText: GlnButtonConfig = {
    exterior: 'text',
    size: 'short',
    isNoRipple: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
