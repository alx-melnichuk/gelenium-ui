import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from 'src/app/lib-core/constants/constants';

import { GlnFrameConfig, GlnFrameSize, GlnFrameSizeUtil } from 'gelenium-ui';

@Component({
  selector: 'app-frame-border-radius',
  templateUrl: './frame-border-radius.component.html',
  styleUrls: ['./frame-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameBorderRadiusComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = LABEL_OUTLINED;
  @Input()
  public labelUnderline = LABEL_UNDERLINE;
  @Input()
  public labelStandard = LABEL_STANDARD;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  public borderRadius = 50;
  public propRadius = '--glnf-br-rd';
  public ratioOutlined = 0.58;
  public ratioUnderline = 0.4;

  public labelPdRatio = 0.58; // TODO del;

  public exterior05 = 'outlined';
  public isAddPadding05 = true;
  public isHiddenLabel05 = false;

  public sizeShort = GlnFrameSize.short;
  public sizeSmall = GlnFrameSize.small;
  public sizeMiddle = GlnFrameSize.middle;
  public sizeWide = GlnFrameSize.wide;
  public sizeLarge = GlnFrameSize.large;
  public sizeHuge = GlnFrameSize.huge;

  public formGroup05: FormGroup = new FormGroup({
    input05a: new FormControl('Demo Size Short', []),
    input05b: new FormControl('Demo Size Small', []),
    input05c: new FormControl('Demo Size Middle', []),
    input05d: new FormControl('Demo Size Wide', []),
    input05e: new FormControl('Demo Size Large', []),
    input05f: new FormControl('Demo Size Huge', []),
  });

  public isAddPadding06 = true;
  public isHiddenLabel06 = false;

  public formGroup06: FormGroup = new FormGroup({
    input06a: new FormControl('Demo - A', []),
    input06b: new FormControl('Demo - B', []),
    input06c: new FormControl('Demo - C', []),
    input06d: new FormControl('Demo - D', []),
    input06e: new FormControl('Demo - E', []),
    input06f: new FormControl('Demo - F', []),
  });
  public configOutlined: GlnFrameConfig = {
    labelPd: 18.5, // 0.37*FrameSizeValue.middle
  };
  public configUnderline: GlnFrameConfig = {
    labelPd: 18.5, // 0.37*FrameSizeValue.middle
  };

  constructor(private sanitizer: DomSanitizer) {}

  public safeStyle(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  public getValue(value: GlnFrameSize): number {
    return GlnFrameSizeUtil.getValue(value) || 0;
  }
  public getRadius(value: number, exterior: string): string {
    return exterior === 'underline' ? value + 'px ' + value + 'px 0 0' : value + 'px';
  }
  public getRatio(exterior: string): number {
    return exterior === 'underline' ? this.ratioUnderline : this.ratioOutlined;
  }
  public getConfig(labelPd: number): GlnFrameConfig {
    return { labelPd };
  }
}
