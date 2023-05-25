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
  public daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public week1: string[] = [];
  public week2: string[] = [];
  public week3: string[] = [];
  public week4: string[] = [];
  public week5: string[] = [];

  constructor() {
    this.week1.push(...['', '1', '2', '3', '4', '5', '6']);
    this.week2.push(...['7', '8', '9', '10', '11', '12', '13']);
    this.week3.push(...['14', '15', '16', '17', '18', '19', '20']);
    this.week4.push(...['21', '22', '23', '24', '25', '26', '27']);
    this.week5.push(...['28', '29', '30', '31', '', ' ', ' ']);
  }

  ngOnInit(): void {}

  public trackByIndex(index: number): number {
    return index;
  }
}
