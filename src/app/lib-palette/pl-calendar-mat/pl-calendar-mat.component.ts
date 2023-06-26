import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-pl-calendar-mat',
  templateUrl: './pl-calendar-mat.component.html',
  styleUrls: ['./pl-calendar-mat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlCalendarMatComponent {
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

  public isDisabled07j: boolean = false;
  public isHideOldDays07j: boolean = false;
  public cfgMui = {
    cellSize: 36,
    isHideDayoff: true,
    isHideOldDays: true,
    isStartSunday: true,
    monthFormByDays: 'short', // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
    // monthFormByMonths?: string| undefined; // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
    sizeDayWeek: 1,
  };
  public selectedDate: Date = this.getSelectedDate();
  public value07j: Date | null = new Date(this.selectedDate);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}