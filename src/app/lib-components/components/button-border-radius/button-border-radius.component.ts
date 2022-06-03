import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { GlnButtonConfig } from 'projects/gelenium-ui/src/lib/gln-button/gln-button-config.interface';
import { GlnFrameSize, GlnFrameSizeUtil } from 'projects/gelenium-ui/src/lib/_interfaces/gln-frame-size.interface';

import {
  BTN_CONTAINED,
  BTN_OUTLINED,
  BTN_TEXT,
  LABEL_CSS,
  LABEL_HTML,
  LABEL_SHOW_SOURCE,
  LABEL_TS,
} from 'src/app/lib-core/constants/constants';

@Component({
  selector: 'app-button-border-radius',
  templateUrl: './button-border-radius.component.html',
  styleUrls: ['./button-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBorderRadiusComponent {
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

  public exterior04a = 'outlined';
  public routerLink = '/components/button';
  public fragment04a = 'size-link4a';
  public fragment04b = 'size-link4b';
  public fragment04c = 'size-link4c';
  public fragment04d = 'size-link4d';
  public fragment04e = 'size-link4e';
  public fragment04f = 'size-link4f';
  public fragment04g = 'size-link4g';
  public fragment04h = 'size-link4h';
  public fragment04i = 'size-link4i';
  public fragment04j = 'size-link4j';
  public fragment04k = 'size-link4k';
  public fragment04l = 'size-link4l';

  public borderRadius = 50;
  public propRadius = '--gb-br-rd';
  public isAddPadding04a = true;
  public labelPdRatio = 0.4;
  public exterior04b = 'outlined';
  public isAddPadding04b = true;
  public radiusRatio = 0.3;

  public sizeShort = GlnFrameSize.short;
  public sizeSmall = GlnFrameSize.small;
  public sizeMiddle = GlnFrameSize.middle;
  public sizeWide = GlnFrameSize.wide;
  public sizeLarge = GlnFrameSize.large;
  public sizeHuge = GlnFrameSize.huge;

  constructor(private sanitizer: DomSanitizer) {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }

  public getValue(value: GlnFrameSize): number {
    return GlnFrameSizeUtil.getValue(value) || 0;
  }
  public safeStyle(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  public round(value: number): number {
    return Math.round(value * 100) / 100;
  }
  public getConfig(labelPd: number): GlnButtonConfig {
    return { labelPd };
  }
}
