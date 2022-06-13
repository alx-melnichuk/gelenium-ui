import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';
import { GlnButtonConfig, GlnButtonExterior, GlnFrameSize } from 'gelenium-ui';

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

  public routerLink = '/components/button';
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
