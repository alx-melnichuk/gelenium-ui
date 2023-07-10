import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-calendar-basic',
  templateUrl: './cm-calendar-basic.component.html',
  styleUrls: ['./cm-calendar-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCalendarBasicComponent {
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

  public value01a: Date | null = null; // new Date(this.selectedDate);
  public value01b: Date | null = new Date(this.selectedDate);

  isDisabled01a = false;
  isHideDayoff01a = false;
  isReadOnly01a = false;
  isColsByYears01a = false;
  isColsByMonths01a = false;
  isRowsByYears01a = false;
  isWeekNumber01a = false;
  isTwoDigitDay01a = false;

  isConfig01a = false;
  config01a = {
    colsByYears: 5,
    colsByMonths: 4,
    formatForMonth: 'short',
    isStartSunday: true,
    isWeekNumber: true,
    rowsByYears: 4,
    // views: ['month', 'year'], // views9="['day','year','month']"
    sizeDayWeek: 1,
  };
  isStartSunday01a: boolean = false;
  isFormatForMonth01a: boolean = false;
  isSizeDayWeek01a: boolean = false;
  minDate: Date = new Date(2023, 5, 5);
  maxDate: Date = new Date(2023, 8, 20);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth() - 1, d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}
