import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../../lib-core/constants';
import { UrlUtil } from '../../../lib-core/utils/url.util';

import { GlnButtonConfig, GlnButtonExterior, GlnFrameSize } from 'gelenium-ui';

@Component({
  selector: 'app-button-palette2',
  templateUrl: './button-palette2.component.html',
  styleUrls: ['./button-palette2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPalette2Component {
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
  public fragment4 = 'palette4';
  public fragment5 = 'palette5';
  public fragment6 = 'palette6';
  public fragment7 = 'palette7';

  public isDisabledPrimary = false;
  public isDisabledSecondary = false;
  public isDisabledSuccess = false;
  public isDisabledDanger = false;

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
