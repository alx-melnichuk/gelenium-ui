import { GrnButtonConfig } from 'projects/lib-geranium/src/lib/interfaces/grn-button-config.interface';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { FrameSize, FrameSizeUtil } from 'projects/lib-geranium/src/public-api';

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
  public fragment = 'button-button-size';
  public borderRadius = 50;
  public propRadius = '--gb-br-rd';
  public isAddPadding04a = true;
  public labelPdRatio = 0.4;
  public exterior04b = 'outlined';
  public isAddPadding04b = true;
  public radiusRatio = 0.3;

  public sizeShort = FrameSize.short;
  public sizeSmall = FrameSize.small;
  public sizeMiddle = FrameSize.middle;
  public sizeWide = FrameSize.wide;
  public sizeLarge = FrameSize.large;
  public sizeHuge = FrameSize.huge;

  constructor(private sanitizer: DomSanitizer) {}

  public getLabel(exterior: string): string {
    return exterior ? exterior.substring(0, 1).toUpperCase() + exterior.substring(1) : '';
  }

  public getValue(value: FrameSize): number {
    return FrameSizeUtil.getValue(value) || 0;
  }
  public safeStyle(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  public round(value: number): number {
    return Math.round(100 * value) / 100;
  }
  public getConfig(labelPd: number): GrnButtonConfig {
    return { labelPd };
  }
}
