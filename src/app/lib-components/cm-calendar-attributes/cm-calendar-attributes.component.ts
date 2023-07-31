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

  public today: Date = new Date();
  public day: number = this.today.getDate() + (this.today.getDate() === 1 ? 1 : -1);
  public selectedDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.day, 0, 0, 0, 0);
  // public selectedDate: Date = this.getSelectedDate();
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
  public minDate02q: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3, 0, 0, 0, 0);
  public value02r: Date | null = new Date(this.selectedDate);
  public maxDate02r: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3, 0, 0, 0, 0);

  // Part 5
  public value02s: Date | null = new Date(this.selectedDate);
  public value02t: Date | null = new Date(this.selectedDate);
  public value02u: Date | null = new Date(this.selectedDate);
  public value02v: Date | null = new Date(this.selectedDate);

  // ===
  // Part 1
  public value0_2a: Date | null = new Date(this.selectedDate);
  public value0_2b: Date | null = new Date(this.selectedDate);
  public value0_2c: Date | null = new Date(this.selectedDate);
  public value0_2d: Date | null = new Date(this.selectedDate);
  // Part 2
  public value0_2f: Date | null = new Date(this.selectedDate);
  public value0_2g: Date | null = new Date(this.selectedDate);
  public value0_2h: Date | null = new Date(this.selectedDate);
  public value0_2i: Date | null = new Date(this.selectedDate);
  // Part 3
  public value0_2k: Date | null = new Date(this.selectedDate);
  public value0_2l: Date | null = new Date(this.selectedDate);
  public value0_2m: Date | null = new Date(this.selectedDate);
  public value0_2n: Date | null = new Date(this.selectedDate);
  // Part 4
  public value0_2o: Date | null = new Date(this.selectedDate);
  public value0_2p: Date | null = new Date(this.selectedDate);
  public value0_2q: Date | null = new Date(this.selectedDate);
  public value0_2r: Date | null = new Date(this.selectedDate);
  // Part 5
  public value0_2s: Date | null = new Date(this.selectedDate);
  public value0_2t: Date | null = new Date(this.selectedDate);
  public value0_2u: Date | null = new Date(this.selectedDate);
  public value0_2v: Date | null = new Date(this.selectedDate);
  // Part 6

  // Demo
  public value0_2_z: Date | null = new Date(this.selectedDate);
  public startDate01a: Date = new Date(2023, 4, 12);
  public isDisabled01a: boolean = false;
  public isHideOldDays01a: boolean = false;
  public isHideDayoff01a: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // Part 1
  public dateClasses02c = (date: Date, view: string, currentDate: Date): string[] => {
    const result: string[] = [];
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    if ('day' === view && month == currentMonth && (day === 1 || day === 20)) {
      result.push('cnat1-demo1');
    } else if ('month' === view && (month === 1 || month === 4)) {
      result.push('cnat1-demo1');
    } else if ('year' === view && (year === 2021 || year === 2025)) {
      result.push('cnat1-demo1');
    }
    return result;
  };
  public dateDisabled02d = (date: Date, view: string, currentDate: Date): boolean => {
    let result: boolean = false;
    const dayWeek: number = date.getDay();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    if ('day' === view && month == currentMonth && (dayWeek === 0 || dayWeek === 1)) {
      result = true;
    } else if ('month' === view && (month === 1 || month === 4)) {
      result = true;
    } else if ('year' === view && (year === 2021 || year === 2025)) {
      result = true;
    }
    return result;
  };

  private getSelectedDate(): Date {
    const date: Date = new Date();
    const result: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (date.getDate() === 1 ? 1 : -1));
    return result;
  }
}
