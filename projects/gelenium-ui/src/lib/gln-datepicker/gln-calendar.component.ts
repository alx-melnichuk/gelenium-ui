import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gln-calendar',
  exportAs: 'glnCalendar',
  templateUrl: './gln-calendar.component.html',
  styleUrls: ['./gln-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnCalendarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
