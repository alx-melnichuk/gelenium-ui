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
  public week6: string[] = [];
  public contentWeek1: Record<string, string[]> = { dataWeek: this.week1 };
  public contentWeek2: Record<string, string[]> = { dataWeek: this.week2 };
  public contentWeek3: Record<string, string[]> = { dataWeek: this.week3 };
  public contentWeek4: Record<string, string[]> = { dataWeek: this.week4 };
  public contentWeek5: Record<string, string[]> = { dataWeek: this.week5 };
  public contentWeek6: Record<string, string[]> = { dataWeek: this.week6 };

  constructor() {
    this.week1.push(...['', '', '', '', '', '', '1']);
    this.week2.push(...['2', '3', '4', '5', '6', '7', '8']);
    this.week3.push(...['9', '10', '11', '12', '13', '14', '15']);
    this.week4.push(...['16', '17', '18', '19', '20', '21', '22']);
    this.week5.push(...['23', '24', '25', '26', '27', '28', '29']);
    this.week6.push(...['30', '31', '', '', '', '', '']);
    const data1: string[] = this.getNameDaysOfWeek();
    console.log(`data1=`, data1);
    const data2: string[] = this.getNameDaysOfWeek('narrow');
    console.log(`data2=`, data2);
    const data3: string[] = this.getNameDaysOfWeek('short');
    console.log(`data3=`, data3);
  }

  ngOnInit(): void {}

  public trackByIndex(index: number): number {
    return index;
  }

  private getNameDaysOfWeek(weekdayValue?: 'long' | 'short' | 'narrow' | undefined, locale?: string | undefined): string[] {
    const result: string[] = [];
    const weekdayNameList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const len: number = weekdayValue === 'short' ? 3 : weekdayValue === 'narrow' ? 1 : -1;
    const userLocale = !!locale ? locale : navigator.language;
    const current: Date = new Date();
    let first = current.getDate() - current.getDay();
    for (let i = 0; i < 7; i++) {
      const data: Date = new Date(current.setDate(first++));
      const nameDay: string = data.toLocaleDateString(userLocale, { weekday: weekdayValue || 'long' });
      result.push(nameDay || weekdayNameList[i].substring(0, len > -1 ? len : undefined));
    }
    return result;
  }
}
