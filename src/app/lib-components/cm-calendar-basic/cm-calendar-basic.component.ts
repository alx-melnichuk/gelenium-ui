import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  public selectedDate: Date | null = this.getSelectedDate();

  // public control01 = {
  // model01a: new FormControl(this.selectedDate, []),
  // model01b: new FormControl(null, []),
  // model01c: new FormControl(null, []),
  // model01d: new FormControl(true, []),
  // model01e: new FormControl(false, []),
  // model01f: new FormControl(false, []),
  // };
  // public formGroup01: FormGroup = new FormGroup(this.control01);
  public value01a: Date | null = this.selectedDate;
  public startDate01a: Date = new Date(2023, 4, 12);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    /*setTimeout(() => {
      const date: Date = new Date();
      const newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      newDate.setDate(newDate.getDate() + 3);
      console.log(`newDate=`, newDate);
      this.value01a = newDate;
    }, 2000);*/
  }

  private getSelectedDate(): Date {
    const date: Date = new Date();
    const result: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (date.getDate() === 1 ? 1 : -1));
    return result;
  }
}
