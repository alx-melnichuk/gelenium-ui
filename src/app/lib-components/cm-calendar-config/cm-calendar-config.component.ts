import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { GlnCalendarConfig, GLN_CALENDAR_CONFIG } from 'gelenium-ui';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

const glnCalendarConfigDefault: GlnCalendarConfig = {
  cellSize: 'wide',
  isHideOldDays: true,
};

@Component({
  selector: 'app-cm-calendar-config',
  templateUrl: './cm-calendar-config.component.html',
  styleUrls: ['./cm-calendar-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_CALENDAR_CONFIG, useValue: glnCalendarConfigDefault }],
})
export class CmCalendarConfigComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmCalendar = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_CALENDAR');

  public selectedDate: Date = this.getSelectedDate();

  public value08a: Date | null = new Date(this.selectedDate);
  public value08b: Date | null = new Date(this.selectedDate);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}
