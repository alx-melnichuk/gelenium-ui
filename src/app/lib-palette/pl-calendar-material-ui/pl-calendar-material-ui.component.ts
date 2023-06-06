import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-pl-calendar-material-ui',
  templateUrl: './pl-calendar-material-ui.component.html',
  styleUrls: ['./pl-calendar-material-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlCalendarMaterialUiComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlPlCalendar = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_CALENDAR');

  public isDisabled01a: boolean = false;
  public isHideOldDays01a: boolean = false;
  public cfgMui = { cellSize: 36, isHideOldDays: true, weekday: 1 };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
