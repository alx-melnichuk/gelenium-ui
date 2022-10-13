import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouterConfig } from '../../lib-core/config/router-config';
import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../lib-core/constants';

import { GlnFrameSizeUtil } from 'gelenium-ui';

@Component({
  selector: 'app-cm-frame-border-radius',
  templateUrl: './cm-frame-border-radius.component.html',
  styleUrls: ['./cm-frame-border-radius.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameBorderRadiusComponent {
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

  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');

  public borderRadius = 50;
  public ratioOutlined = 0.58;
  public ratioUnderline = 0.4;

  public exterior05 = 'outlined';
  public isAddPadding05 = true;
  public hideLabel05 = false;

  public formGroup05: FormGroup = new FormGroup({
    model05a: new FormControl('Demo Size Short', []),
    model05b: new FormControl('Demo Size Small', []),
    model05c: new FormControl('Demo Size Middle', []),
    model05d: new FormControl('Demo Size Wide', []),
    model05e: new FormControl('Demo Size Large', []),
    model05f: new FormControl('Demo Size Huge', []),
  });

  public isAddPadding06 = true;
  public hideLabel06 = false;

  public formGroup06: FormGroup = new FormGroup({
    model06a: new FormControl('Demo - A', []),
    model06b: new FormControl('Demo - B', []),
    model06c: new FormControl('Demo - C', []),
    model06d: new FormControl('Demo - D', []),
    model06e: new FormControl('Demo - E', []),
    model06f: new FormControl('Demo - F', []),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getSize(frameSize: string | null, radiusRatio: number = 1): string {
    const value = GlnFrameSizeUtil.getValue(GlnFrameSizeUtil.convert(frameSize)) ?? 0;
    return Math.round((value * radiusRatio * 100) / 100)
      .toString()
      .concat('px');
  }

  public getRadius(value: string, exterior: string): string {
    return exterior === 'underline' ? value + ' ' + value + ' 0 0' : value;
  }
  public getRatio(exterior: string): number {
    return exterior === 'underline' ? this.ratioUnderline : this.ratioOutlined;
  }
}
