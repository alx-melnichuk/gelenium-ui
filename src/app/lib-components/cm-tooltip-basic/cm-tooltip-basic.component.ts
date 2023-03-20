import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnTooltipConfig, GLN_TOOLTIP_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnTooltipConfigDefault: GlnTooltipConfig = {
  classes: 'ttcf-panel',
  isArrow: true,
  isNoTransform: true,
  position: 'bottom-start',
};

@Component({
  selector: 'app-cm-tooltip-basic',
  templateUrl: './cm-tooltip-basic.component.html',
  styleUrls: ['./cm-tooltip-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [{ provide: GLN_TOOLTIP_CONFIG, useValue: glnTooltipConfigDefault }],
})
export class CmTooltipBasicComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlCmTooltip = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');

  public isShowBasic = true;
  public isShowAttributes01 = true; // 02(abcd)
  public isShowAttributes02 = true; // 02(efgh)
  public isShowAttributes03 = true; // 02(ijkl)
  public isShowAttributes04 = true; // 02(mnop)
  public isShowCustomization = true;
  public isShowFeature = true;
  // Customization // 05
  public isShowConfig = true; // 08
  public isShowApi = true; // 09

  // Page: "Attributes" 01 // 02(abcd)

  // Page: "Attributes" 02 // 02(efgh)
  public showDelay02e: number = 500;
  public hideDelay02e: number = 500;

  // Page: "Attributes" 03 // 02(ijkl)
  public isDisabled02i: boolean = true;

  // Page: "Attributes" 04 // 02(mnop)
  public position02m = 'bottom';
  public positionList: string[] = [
    'bottom',
    'bottom-start',
    'bottom-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ];

  // Page: "Feature" 07

  // Page: "Config" 08

  // Page:

  public demo1 = false;
  public demo2 = false;
  public position1 = 'bottom';

  public demo02 = 'Information-A';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // Page: "Attributes" 02
  public incVal(value: number, delta: number, max: number): number {
    return value + delta <= max ? value + delta : value > max ? max : value;
  }
  public decVal(value: number, delta: number, min: number): number {
    return value - delta >= min ? value - delta : value < min ? min : value;
  }

  // Page: ""

  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }
}
