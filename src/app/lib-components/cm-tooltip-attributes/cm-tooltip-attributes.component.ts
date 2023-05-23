import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-tooltip-attributes',
  templateUrl: './cm-tooltip-attributes.component.html',
  styleUrls: ['./cm-tooltip-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmTooltipAttributesComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmTooltip = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_TOOLTIP');

  public showDelay02e: number = 500;
  public hideDelay02e: number = 500;

  public isDisabled02i: boolean = true;

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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public incVal(value: number, delta: number, max: number): number {
    return value + delta <= max ? value + delta : value > max ? max : value;
  }
  public decVal(value: number, delta: number, min: number): number {
    return value - delta >= min ? value - delta : value < min ? min : value;
  }

  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }
}
