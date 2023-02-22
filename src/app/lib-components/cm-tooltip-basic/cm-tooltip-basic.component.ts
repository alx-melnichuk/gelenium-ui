import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-tooltip-basic',
  templateUrl: './cm-tooltip-basic.component.html',
  styleUrls: ['./cm-tooltip-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public demo1 = false;
  public position1 = 'top';
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

  public getValue(eventTarget: any): any {
    return eventTarget != null ? (eventTarget as Attr).value : '';
  }
}
