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
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnCalendarConfig } from './gln-calendar-config.interface';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--item-size';
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
  public config: GlnCalendarConfig | null | undefined;
  @Input()
  public cellSize: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public isHideOldDays: string | boolean | undefined;
  @Input()
  public isHorizont: string | boolean | null | undefined;
  @Input()
  public weekday: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)

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
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public nameMonth: string = '';
  public nameYear: string = '';
  public weekdayVal: number | null = null; // Binding attribute "weekday".

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_CALENDAR_CONFIG) private rootConfig: GlnCalendarConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    // console.log(`getListDaysOfWeek('long')=`, this.getListDaysOfWeek('long'));
    // console.log(`getListDaysOfWeek('narrow')=`, this.getListDaysOfWeek('narrow'));
    // console.log(`getListDaysOfWeek('short')=`, this.getListDaysOfWeek('short'));
    // console.log(`getListDaysOfWeek()=`, this.getListDaysOfWeek());
    // console.log(`getListDaysOfWeek(1)=`, this.getListDaysOfWeek(1));
    // console.log(`getListDaysOfWeek(2)=`, this.getListDaysOfWeek(2));
    // console.log(`getListDaysOfWeek(3)=`, this.getListDaysOfWeek(3));
    // console.log(`getListDaysOfWeek(4)=`, this.getListDaysOfWeek(4));
    // console.log(`getListDaysOfWeek(-1)=`, this.getListDaysOfWeek(-1));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let isPrepareData: boolean = false;
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['cellSize'] || (changes['config'] && this.cellSize == null && this.currConfig.cellSize != null)) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.converSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['small']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (changes['isHideOldDays'] || (changes['config'] && this.isHideOldDays == null && this.currConfig.isHideOldDays != null)) {
      this.isHideOldDaysVal = BooleanUtil.init(this.isHideOldDays) ?? !!this.currConfig.isHideOldDays;
    }
    if (changes['isHorizont'] || (changes['config'] && this.isHorizont == null && this.currConfig.isHorizont != null)) {
      this.isHorizontVal = BooleanUtil.init(this.isHorizont) ?? !!this.currConfig.isHorizont;
      this.settingIsHorizont(this.isHorizontVal, this.renderer, this.hostRef);
    }
    if (changes['weekday'] || (changes['config'] && this.weekday == null && this.currConfig.weekday != null)) {
      const weekdayStr: string = (this.weekday?.toString() || this.currConfig.weekday || '').toString();
      this.weekdayVal = this.converWeekday(weekdayStr);
      isPrepareData = true;
    }

    if (isPrepareData && this.weekdayVal != null) {
      this.prepareData(new Date(), this.weekdayVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    // HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize: number = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    this.setCssFontSizeHeader(fontSize - 1, this.hostRef);
    let isPrepareData: boolean = false;

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.size || '').toString();
      this.cellSizeVal = this.converSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (this.isHideOldDaysVal == null) {
      this.isHideOldDaysVal = !!this.currConfig.isHideOldDays;
    }
    if (this.isHorizontVal == null) {
      this.isHorizontVal = !!this.currConfig.isHorizont;
      this.settingIsHorizont(this.isHorizontVal, this.renderer, this.hostRef);
    }
    if (this.weekdayVal == null) {
      const weekdayStr: string = (this.currConfig.weekday || '').toString();
      this.weekdayVal = this.converWeekday(weekdayStr);
      isPrepareData = true;
    }

    if (isPrepareData && this.weekdayVal != null) {
      this.prepareData(new Date(), this.weekdayVal);
    }
  }

  // ** Public methods **

  public trackByIndex(index: number): number {
    return index;
  }

  public clickSelectItem(cell: CalendarCell | null): void {
    if (this.isDisabledVal || !cell || (!cell.isCurrMonth && this.isHideOldDaysVal)) {
      console.log(`clickSelectItem() return;`); // #
      return;
    }
  }

  // ** Private methods **

  private prepareData(date: Date, weekdayLen: number): void {
    this.nameYear = this.getInfoForYear(date);
    this.nameMonth = this.getInfoForMonth(date);
    this.daysOfWeek = this.getListDaysOfWeek(weekdayLen);
    const cellBuff: CalendarCell[] = this.getListDaysOfMonth(date);
    this.updateContentWeek(cellBuff);
  }

  private getInfoForYear(date: Date, year?: 'numeric' | '2-digit' | undefined): string {
    return new Intl.DateTimeFormat('default', { year: year || 'numeric' }).format(date);
  }

  private getInfoForMonth(date: Date, month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined): string {
    return new Intl.DateTimeFormat('default', { month: month || 'long' }).format(date);
  }
  private converWeekday(weekday: string | undefined): number {
    let weekdayNum: number = 1;
    if (weekday != undefined) {
      const valueNum: number = Number.parseFloat(weekday);
      if (!Number.isNaN(valueNum)) {
        weekdayNum = 0 < valueNum && valueNum < 25 ? valueNum : -1;
      } else {
        weekdayNum = 'long' === weekday ? -1 : 'short' === weekday ? 3 : 1;
      }
    }
    return weekdayNum;
  }
  /** Get a list of days of the week.
   * @param weekday: number; 1-'narrow'(T); 2,3-'short'(Thu); -1-'long'(Thursday);
   */
  private getListDaysOfWeek(weekdayLen: number, date?: Date | undefined): string[] {
    const result: string[] = ['', '', '', '', '', '', ''];
    const weekdayRes: 'long' | 'short' | 'narrow' = weekdayLen <= 0 || 3 < weekdayLen ? 'long' : 1 === weekdayLen ? 'narrow' : 'short';
    const currentDate: Date = date || new Date();
    const current: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    for (let i = 1; i < 8; i++) {
      current.setDate(i);
      const value: string = new Intl.DateTimeFormat('default', { weekday: weekdayRes }).format(current);
      const index: number = current.getDay();
      result[index] = weekdayLen > 0 ? value.substring(0, weekdayLen) : value;
    }
    return result;
  }
  /** Get a list of days in the specified month.
   * @param date: Date; Specifies the month and year.
   */
  private getListDaysOfMonth(date: Date): CalendarCell[] {
    const result: CalendarCell[] = [];
    const yearInit: number = date.getFullYear();
    const monthInit: number = date.getMonth();
    const dayInit: number = date.getDate();

    const dateItem: Date = new Date(yearInit, monthInit, 1);
    let indexDayOfWeeek: number = dateItem.getDay(); // 0-вс,1-пн,2-вт,3-ср,4-чт,5-пт,6-сб
    // console.log(`dateItem.getDay()=`, dateItem.getDay());
    dateItem.setDate(dateItem.getDate() - indexDayOfWeeek - 1);
    // console.log(`dateItem2.getDay()=`, dateItem.getDay());

    let idx: number = 0;
    while (idx < 42) {
      dateItem.setDate(dateItem.getDate() + 1);
      const year: number = dateItem.getFullYear();
      const month: number = dateItem.getMonth();
      const day: number = dateItem.getDate();
      const isToday: boolean | undefined = year === yearInit && month === monthInit && day === dayInit ? true : undefined;
      result.push({ year, month, day, isCurrMonth: month === monthInit, isToday });
      // console.log(`calendarCellBuff.push(idx:${idx} { year: ${year}, month: ${month}, day: ${day} }`); // #
      idx++;
    }
    return result;
  }

  private updateContentWeek(cellBuff: CalendarCell[]): void {
    this.week1Buff = cellBuff.slice(0, 7);
    this.week2Buff = cellBuff.slice(7, 14);
    this.week3Buff = cellBuff.slice(14, 21);
    this.week4Buff = cellBuff.slice(21, 28);
    this.week5Buff = cellBuff.slice(28, 35);
    this.week6Buff = cellBuff.slice(35, 42);

    this.contentWeek1 = { dataWeek: this.week1Buff };
    this.contentWeek2 = { dataWeek: this.week2Buff };
    this.contentWeek3 = { dataWeek: this.week3Buff };
    this.contentWeek4 = { dataWeek: this.week4Buff };
    this.contentWeek5 = { dataWeek: this.week5Buff };
    this.contentWeek6 = { dataWeek: this.week6Buff };
  }

  private getIsWeekStartsOnMonday(): boolean {
    const he1: any = new Intl.Locale('default');
    return 1 === he1.weekInfo?.firstDay;
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
  private settingIsHorizont(isHorizont: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-is-horizont', !!isHorizont);
    HtmlElemUtil.setAttr(renderer, elem, 'hor', isHorizont ? '' : null);
  }
}
