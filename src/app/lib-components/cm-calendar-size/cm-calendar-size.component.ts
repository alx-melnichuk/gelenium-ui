import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-cm-calendar-size',
  templateUrl: './cm-calendar-size.component.html',
  styleUrls: ['./cm-calendar-size.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmCalendarSizeComponent {
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
  public value03a: Date | null = new Date(this.selectedDate);
  public value03b: Date | null = new Date(this.selectedDate);
  public value03c: Date | null = new Date(this.selectedDate);
  public value03d: Date | null = new Date(this.selectedDate);
  public value03e: Date | null = new Date(this.selectedDate);
  public value03f: Date | null = new Date(this.selectedDate);
  public value03g: Date | null = new Date(this.selectedDate);
  public value03h: Date | null = new Date(this.selectedDate);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}