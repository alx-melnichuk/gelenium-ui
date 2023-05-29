import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnCalendarConfig } from './gln-calendar-config.interface';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--cell-size';
const CSS_PROP_FONT_SIZE_HEADER = '--glncnh--fn-sz';

interface CalendarCell {
  year: number;
  month: number;
  day: number;
  isCurrMonth: boolean;
  isToday?: boolean;
}

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

@Component({
  selector: 'gln-calendar',
  exportAs: 'glnCalendar',
  templateUrl: './gln-calendar.component.html',
  styleUrls: ['./gln-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnCalendarComponent implements OnChanges, OnInit {
  @Input()
  public config: any; // GlnDatepickerConfig | null | undefined;
  @Input()
  public cellSize: number | string | null | undefined; // 'short','small','middle','wide','large','huge'

  public daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public week1Buff: CalendarCell[] = [];
  public week2Buff: CalendarCell[] = [];
  public week3Buff: CalendarCell[] = [];
  public week4Buff: CalendarCell[] = [];
  public week5Buff: CalendarCell[] = [];
  public week6Buff: CalendarCell[] = [];

  public contentWeek1: Record<string, CalendarCell[]> = { dataWeek: this.week1Buff };
  public contentWeek2: Record<string, CalendarCell[]> = { dataWeek: this.week2Buff };
  public contentWeek3: Record<string, CalendarCell[]> = { dataWeek: this.week3Buff };
  public contentWeek4: Record<string, CalendarCell[]> = { dataWeek: this.week4Buff };
  public contentWeek5: Record<string, CalendarCell[]> = { dataWeek: this.week5Buff };
  public contentWeek6: Record<string, CalendarCell[]> = { dataWeek: this.week6Buff };

  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public currConfig: any; // GlnDatepickerConfig;
  public isHideDatesAround: boolean = false;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_CALENDAR_CONFIG) private rootConfig: GlnCalendarConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    const data1: string[] = this.getNameDaysOfWeek();
    // console.log(`data1=`, data1);
    const data2: string[] = this.getNameDaysOfWeek('narrow');
    // console.log(`data2=`, data2);
    const data3: string[] = this.getNameDaysOfWeek('short');
    // console.log(`data3=`, data3);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['cellSize'] || (changes['config'] && this.cellSize == null && this.currConfig.cellSize != null)) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.converSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['small']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    // HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize: number = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    this.setCssFontSizeHeader(fontSize - 1, this.hostRef);

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.size || '').toString();
      this.cellSizeVal = this.converSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }

    // this.getDetailsDaysOfMonth(new Date('2023-01-01T03:24:00'));
    this.getDetailsDaysOfMonth(new Date('2023-05-10T03:24:00'));
    this.updateContentWeek();
    this.isHideDatesAround = true;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  // Private methods

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

  private getDetailsDaysOfMonth(dateInit: Date): void {
    const yearInit: number = dateInit.getFullYear();
    const monthInit: number = dateInit.getMonth();
    const dayInit: number = dateInit.getDate();

    const dateItem: Date = new Date(yearInit, monthInit, 1);
    let indexDayOfWeeek: number = dateItem.getDay(); // 0-вс,1-пн,2-вт,3-ср,4-чт,5-пт,6-сб
    // console.log(`dateItem.getDay()=`, dateItem.getDay());
    dateItem.setDate(dateItem.getDate() - indexDayOfWeeek - 1);
    // console.log(`dateItem2.getDay()=`, dateItem.getDay());

    const cellBuffList: CalendarCell[] = [];
    let idx: number = 0;
    while (idx < 42) {
      dateItem.setDate(dateItem.getDate() + 1);
      const year: number = dateItem.getFullYear();
      const month: number = dateItem.getMonth();
      const day: number = dateItem.getDate();

      const isToday: boolean | undefined = year === yearInit && month === monthInit && day === dayInit ? true : undefined;
      cellBuffList.push({ year, month, day, isCurrMonth: month === monthInit, isToday });
      // console.log(`calendarCellBuff.push(idx:${idx} { year: ${year}, month: ${month}, day: ${day} }`); // #
      idx++;
    }

    this.week1Buff = cellBuffList.slice(0, 7);
    this.week2Buff = cellBuffList.slice(7, 14);
    this.week3Buff = cellBuffList.slice(14, 21);
    this.week4Buff = cellBuffList.slice(21, 28);
    this.week5Buff = cellBuffList.slice(28, 35);
    this.week6Buff = cellBuffList.slice(35, 42);

    /*
    const buff: string[] = [];

    // const delta: number = this.getIsWeekStartsOnMonday();
    let indexDayOfWeeek: number = dateStart.getDay();
    console.log(`dateStart.getDay()=`, dateStart.getDay());
    let idx1 = 0;
    while (indexDayOfWeeek > 0) {
      buff.push('');
      indexDayOfWeeek--;
      idx1++;
    }
    console.log(`idx1=`, idx1);

    let idxDay: number = 1;
    const maxIdxDay: number = dateEnd.getDate() - dateStart.getDate() + 1;
    // let dateIdxDay: Date = new Date(yearOfInit, monthOfInit, 1);

    while (idxDay <= maxIdxDay) {
      buff.push(idxDay.toString());
      idxDay++;
    }

    let idx2 = 0;
    while (buff.length < 42) {
      buff.push('');
      idx2++;
    }
    console.log(`idx2=`, idx2);

    console.log(`buff=`, buff);

    this.week1 = buff.slice(0, 7);
    this.week2 = buff.slice(7, 14);
    this.week3 = buff.slice(14, 21);
    this.week4 = buff.slice(21, 28);
    this.week5 = buff.slice(28, 35);
    this.week6 = buff.slice(35, 42);
    console.log(`this.week1=`, this.week1);
    console.log(`this.week2=`, this.week2);
    console.log(`this.week3=`, this.week3);
    console.log(`this.week4=`, this.week4);
    console.log(`this.week5=`, this.week5);
    console.log(`this.week6=`, this.week6);
    */
  }

  private getIsWeekStartsOnMonday(): boolean {
    const he1: any = new Intl.Locale('default');
    return 1 === he1.weekInfo?.firstDay;
  }

  private updateContentWeek(): void {
    this.contentWeek1 = { dataWeek: this.week1Buff };
    this.contentWeek2 = { dataWeek: this.week2Buff };
    this.contentWeek3 = { dataWeek: this.week3Buff };
    this.contentWeek4 = { dataWeek: this.week4Buff };
    this.contentWeek5 = { dataWeek: this.week5Buff };
    this.contentWeek6 = { dataWeek: this.week6Buff };
  }

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private setCssCellSize(cellSize: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_CELL_SIZE, (cellSize > 0 ? cellSize.toString() : null)?.concat('px'));
  }
  private setCssFontSizeHeader(fontSize: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_FONT_SIZE_HEADER, (fontSize > 0 ? fontSize.toString() : null)?.concat('px'));
  }
}
