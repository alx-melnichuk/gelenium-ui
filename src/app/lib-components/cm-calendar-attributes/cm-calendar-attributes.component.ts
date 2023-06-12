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
  public value02j: Date | null = new Date(this.selectedDate);
  // Part 3
  public value02k: Date | null = new Date(this.selectedDate);
  public value02l: Date | null = new Date(this.selectedDate);

  // Demo
  public value02z: Date | null = new Date(this.selectedDate);
  public startDate01a: Date = new Date(2023, 4, 12);
  public isDisabled01a: boolean = false;
  public isHideOldDays01a: boolean = false;
  public isHideDayoff01a: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    /*setTimeout(() => {
      const date: Date = new Date();
      const newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      newDate.setDate(newDate.getDate() + 3);
      console.log(`newDate=`, newDate);
      this.value02a = newDate;
    }, 2000);*/
  }

  private getSelectedDate(): Date {
    const date: Date = new Date();
    const result: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (date.getDate() === 1 ? 1 : -1));
    console.log(`result`, result); // #
    return result;
  }
}
