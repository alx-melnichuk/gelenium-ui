import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-calendar-attributes',
  templateUrl: './cm-calendar-attributes.component.html',
  styleUrls: ['./cm-calendar-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCalendarAttributesComponent {
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
  // Part 1
  public value02a: Date | null = new Date(this.selectedDate);
  public value02b: Date | null = new Date(this.selectedDate);
  public value02c: Date | null = new Date(this.selectedDate);
  public value02d: Date | null = new Date(this.selectedDate);
  // Part 2
  public value02f: Date | null = new Date(this.selectedDate);
  public value02g: Date | null = new Date(this.selectedDate);
  public value02h: Date | null = new Date(this.selectedDate);
  public value02i: Date | null = new Date(this.selectedDate);
  // Part 3
  public value02k: Date | null = new Date(this.selectedDate);
  public value02l: Date | null = new Date(this.selectedDate);
  public value02m: Date | null = new Date(this.selectedDate);
  public value02n: Date | null = new Date(this.selectedDate);
  // Part 4
  public value02o: Date | null = new Date(this.selectedDate);
  public value02p: Date | null = new Date(this.selectedDate);
  public value02q: Date | null = new Date(this.selectedDate);
  public value02r: Date | null = new Date(this.selectedDate);
  // Part 5
  public value02s: Date | null = new Date(this.selectedDate);
  public value02t: Date | null = new Date(this.selectedDate);
  public value02u: Date | null = new Date(this.selectedDate);
  public value02v: Date | null = new Date(this.selectedDate);
  // Part 6
  public value02w: Date | null = new Date(this.selectedDate);
  public dateClasses02w = (date: Date, view: string, currentDate: Date): string[] => {
    const result: string[] = [];
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    if ('day' === view && month == currentMonth && (day === 1 || day === 20)) {
      console.log(`view='day'   date="${date.toDateString()}" cnat6-demo1`);
      result.push('cnat6-demo1');
    } else if ('month' === view && (month === 1 || month === 4)) {
      console.log(`view='month' date="${date.toDateString()}" cnat6-demo1`);
      result.push('cnat6-demo1');
    } else if ('year' === view && (year === 2025 || year === 2021)) {
      console.log(`view='year'  date="${date.toDateString()}" cnat6-demo1`);
      result.push('cnat6-demo1');
    }
    return result;
  };
  public value02x: Date | null = new Date(this.selectedDate);
  dateDisabled02x = (date: Date, view: string, currentDate: Date): boolean => {
    let result: boolean = false;
    const dayWeek: number = date.getDay();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    if ('day' === view && month == currentMonth && (dayWeek === 0 || dayWeek === 1)) {
      console.log(`view='day'   date="${date.toDateString()}" isDisabled`); // #
      result = true;
    } else if ('month' === view && (month === 1 || month === 4)) {
      console.log(`view='month' date="${date.toDateString()}" isDisabled`); // #
      result = true;
    } else if ('year' === view && (year === 2025 || year === 2021)) {
      console.log(`view='year'  date="${date.toDateString()}" isDisabled`); // #
      result = true;
    }
    return result;
  };

  // Demo
  public value02z: Date | null = new Date(this.selectedDate);
  public startDate01a: Date = new Date(2023, 4, 12);
  public isDisabled01a: boolean = false;
  public isHideOldDays01a: boolean = false;
  public isHideDayoff01a: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const date: Date = new Date();
    const result: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (date.getDate() === 1 ? 1 : -1));
    return result;
  }
}
