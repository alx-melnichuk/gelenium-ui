import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants/constants';

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

  public exterior05 = 'outlined';
  public isAddPadding05 = true;
  public isNoLabel05 = false;

  public sizeShort = GlnFrameSize.short;
  public sizeSmall = GlnFrameSize.small;
  public sizeMiddle = GlnFrameSize.middle;
  public sizeWide = GlnFrameSize.wide;
  public sizeLarge = GlnFrameSize.large;
  public sizeHuge = GlnFrameSize.huge;

  public formGroup05: FormGroup = new FormGroup({
    model05a: new FormControl('Demo Size Short', []),
    model05b: new FormControl('Demo Size Small', []),
    model05c: new FormControl('Demo Size Middle', []),
    model05d: new FormControl('Demo Size Wide', []),
    model05e: new FormControl('Demo Size Large', []),
    model05f: new FormControl('Demo Size Huge', []),
  });

  public isAddPadding06 = true;
  public isNoLabel06 = false;

  public formGroup06: FormGroup = new FormGroup({
    model06a: new FormControl('Demo - A', []),
    model06b: new FormControl('Demo - B', []),
    model06c: new FormControl('Demo - C', []),
    model06d: new FormControl('Demo - D', []),
    model06e: new FormControl('Demo - E', []),
    model06f: new FormControl('Demo - F', []),
  });
  public configOutlined: GlnFrameConfig = {
    labelPd: 18.5, // 0.37*FrameSizeValue.middle
  };
  public configUnderline: GlnFrameConfig = {
    labelPd: 18.5, // 0.37*FrameSizeValue.middle
  };

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
