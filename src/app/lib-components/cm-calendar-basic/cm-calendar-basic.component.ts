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

  public value01a: Date | null | undefined = new Date(this.selectedDate); // new Date(2022, 6, 10); // new Date(this.selectedDate);
  public value01b: Date | null | undefined = new Date(this.selectedDate);

  startDate01a: Date = new Date(2021, 5, 8);
  isDisabled01a = false;
  isHideDayoff01a = false;
  isReadOnly01a = false;
  isColsByYears01a = false;
  isColsByMonths01a = false;
  isRowsByYears01a = false;
  isWeekNumber01a = false;
  isTwoDigitDay01a = false;
  isLocale01a = false;

  isConfig01a = false;
  config01a = {
    colsByYears: 5,
    colsByMonths: 4,
    formatMonth: 'short',
    isStartSunday: true,
    isWeekNumber: true,
    rowsByYears: 4,
    // views: ['month', 'year'], // views9="['day','year','month']"
    sizeDayWeek: 1,
  };
  isStartSunday01a: boolean = false;
  isFormatMonth01a: boolean = false;
  isSizeDayWeek01a: boolean = false;
  isMinDate01a = false;
  isMaxDate01a = false;
  // minDate: Date = new Date(1965, 1, 1);
  // // maxDate: Date = new Date(2095, 1, 1);
  // maxDate: Date = new Date(2015, 1, 1);
  minDate: Date = new Date(2023, 2, 10);
  maxDate: Date = new Date(2024, 2, 10);

  dateClasses01a = (date: Date, view: string, currentDate: Date): string[] => {
    const result: string[] = [];
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    console.log(`view=${view}`);
    if ('day' === view && month == currentMonth && (day === 1 || day === 20)) {
      console.log(`_day   date="${date.toDateString()}" cnbs-demo1`); // #
      result.push('cnbs-demo1');
    } else if ('month' === view && (month === 1 || month === 4)) {
      console.log(`_month date="${date.toDateString()}" cnbs-demo1`); // #
      result.push('cnbs-demo1');
    } else if ('year' === view && (year === 2025 || year === 2021)) {
      console.log(`_year  date="${date.toDateString()}" cnbs-demo1`); // #
      result.push('cnbs-demo1');
    }

    return result;
  };
  config01b = {
    dateClasses: this.dateClasses01a,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth() /* - 1 */, d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}
