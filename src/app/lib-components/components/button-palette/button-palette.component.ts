import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from 'src/app/lib-core/constants/constants';
import { GlnButtonConfig, GlnButtonExterior, GlnFrameSize } from 'gelenium-ui';

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

  public routerLink = '/components/button';
  public fragment1 = 'palette1';
  public fragment2 = 'palette2';
  public fragment3 = 'palette3';
  public fragment4 = 'palette4';
  public fragment5 = 'palette5';
  public fragment6 = 'palette6';
  public fragment7 = 'palette7';
  public fragment8 = 'palette8';
  public fragment9 = 'palette9';
  public fragment10 = 'palette10';
  public fragment11 = 'palette11';
  public fragment12 = 'palette12';

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
}
