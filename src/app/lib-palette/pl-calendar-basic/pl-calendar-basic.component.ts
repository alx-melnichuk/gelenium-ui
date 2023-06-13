import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { RouterConfig } from '../../lib-core/config/router-config';
import { LABEL_CSS, LABEL_HTML, LABEL_SHOW_SOURCE, LABEL_TS } from '../../lib-core/constants';

@Component({
  selector: 'app-pl-calendar-basic',
  templateUrl: './pl-calendar-basic.component.html',
  styleUrls: ['./pl-calendar-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlCalendarBasicComponent {
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

  public selectedDate: Date = this.getSelectedDate();

  public value07a: Date | null = new Date(this.selectedDate);
  public value07b: Date | null = new Date(this.selectedDate);
  public value07c: Date | null = new Date(this.selectedDate);
  public value07d: Date | null = new Date(this.selectedDate);
  public value07e: Date | null = new Date(this.selectedDate);
  public value07f: Date | null = new Date(this.selectedDate);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private getSelectedDate(): Date {
    const d1: Date = new Date();
    const result: Date = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0, 0);
    result.setDate(result.getDate() + (d1.getDate() === 1 ? 1 : -1));
    return result;
  }
}
