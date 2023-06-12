import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, ValidationErrors } from '@angular/forms';
import { BooleanUtil } from '../_utils/boolean.util';
import { DateUtil } from '../_utils/date.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnCalendarConfig } from './gln-calendar-config.interface';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--item-size';
const CSS_PROP_FONT_SIZE_HEADER = '--glncnh--fn-sz';

interface CalendarRow {
  cellList: CalendarCell[];
  weekNumberObj?: { weekNumber: number };
}

interface CalendarCell {
  year: number;
  month: number;
  day: number;
  attr1: string;
  isToday?: boolean | undefined;
  isDayoff?: boolean | undefined;
}

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const WEEKDAY_NUM_DEFAULT = 2;
const ATTR_SELECTED = 'slct';
const ATTR_CURRENT = 'curr';
const ATTR_OLD_MONTH = 'old';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-calendar',
  exportAs: 'glnCalendar',
  templateUrl: './gln-calendar.component.html',
  styleUrls: ['./gln-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnCalendarComponent implements OnChanges, OnInit, AfterContentInit {
  @Input()
  public id = `glncn-${uniqueIdCounter++}`;
  @Input()
  public config: GlnCalendarConfig | null | undefined;
  @Input()
  public cellSize: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isHideOldDays: string | boolean | undefined;
  @Input()
  public isHideDayoff: string | boolean | undefined;
  @Input()
  public isHorizont: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public isWeekNumber: string | boolean | null | undefined;
  @Input()
  public startDate: Date | null | undefined;
  @Input()
  public value: Date | null | undefined;
  @Input()
  public weekday: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)

  @Output()
  readonly selected: EventEmitter<{ value: unknown | null }> = new EventEmitter();

  public daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public calendarRows: CalendarRow[] = [];
  public currConfig: GlnCalendarConfig;
  public errors: ValidationErrors | null = null;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isRequiredVal: boolean | null = null; // Binding attribute "isRequired".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public nameMonth: string = '';
  public nameYear: string = '';
  public weekdayVal: number | null = null; // Binding attribute "weekday".

  constructor(
    // // eslint-disable-next-line @typescript-eslint/ban-types
    // @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_CALENDAR_CONFIG) private rootConfig: GlnCalendarConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-calendar');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(`OnChanges()`); // #
    let isPrepareData: boolean = !!changes['value'];
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['cellSize'] || (changes['config'] && this.cellSize == null && this.currConfig.cellSize != null)) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      this.settingIsDisabled(this.isDisabledVal, this.renderer, this.hostRef);
    }
    if (changes['isHideOldDays'] || (changes['config'] && this.isHideOldDays == null && this.currConfig.isHideOldDays != null)) {
      this.isHideOldDaysVal = BooleanUtil.init(this.isHideOldDays) ?? !!this.currConfig.isHideOldDays;
    }
    if (changes['isHideDayoff'] || (changes['config'] && this.isHideDayoff == null && this.currConfig.isHideDayoff != null)) {
      this.isHideDayoffVal = BooleanUtil.init(this.isHideDayoff) ?? !!this.currConfig.isHideDayoff;
    }
    if (changes['isHorizont'] || (changes['config'] && this.isHorizont == null && this.currConfig.isHorizont != null)) {
      this.isHorizontVal = BooleanUtil.init(this.isHorizont) ?? !!this.currConfig.isHorizont;
      this.settingIsHorizont(this.isHorizontVal, this.renderer, this.hostRef);
    }
    if (changes['isReadOnly'] || (changes['config'] && this.isReadOnly == null && this.currConfig.isReadOnly != null)) {
      this.isReadOnlyVal = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (changes['isRequired'] || (changes['config'] && this.isRequired == null && this.currConfig.isRequired != null)) {
      this.isRequiredVal = BooleanUtil.init(this.isRequired) ?? !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (changes['isWeekNumber'] || (changes['config'] && this.isWeekNumber == null && this.currConfig.isWeekNumber != null)) {
      this.isWeekNumberVal = BooleanUtil.init(this.isWeekNumber) ?? !!this.currConfig.isWeekNumber;
      isPrepareData = true;
    }
    if (changes['weekday'] || (changes['config'] && this.weekday == null && this.currConfig.weekday != null)) {
      const weekdayStr: string = (this.weekday?.toString() || this.currConfig.weekday || '').toString();
      this.weekdayVal = this.convertWeekday(weekdayStr, WEEKDAY_NUM_DEFAULT);
      isPrepareData = true;
    }

    if (isPrepareData && this.weekdayVal != null) {
      const isWeekOnMonday: boolean = false;
      this.updateValue(this.value, this.weekdayVal, isWeekOnMonday, this.startDate || null);
    }
  }

  public ngOnInit(): void {
    console.log(`OnInit()`); // #
    // Update ID value if it is missing.
    // HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    const fontSize: number = HtmlElemUtil.propertyAsNumber(this.hostRef, 'font-size');
    this.setCssFontSizeHeader(fontSize - 1, this.hostRef);
    let isPrepareData: boolean = false;

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertSize(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (this.isHideOldDaysVal == null) {
      this.isHideOldDaysVal = !!this.currConfig.isHideOldDays;
    }
    if (this.isHideDayoffVal == null) {
      this.isHideDayoffVal = !!this.currConfig.isHideDayoff;
    }
    if (this.isHorizontVal == null) {
      this.isHorizontVal = !!this.currConfig.isHorizont;
      this.settingIsHorizont(this.isHorizontVal, this.renderer, this.hostRef);
    }
    if (this.isReadOnlyVal == null) {
      this.isReadOnlyVal = !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (this.isRequiredVal == null) {
      this.isRequiredVal = !!this.currConfig.isRequired;
      this.settingRequired(this.isRequiredVal, this.renderer, this.hostRef);
    }
    if (this.isWeekNumberVal == null) {
      this.isWeekNumberVal = !!this.currConfig.isWeekNumber;
      isPrepareData = true;
    }
    if (this.weekdayVal == null) {
      const weekdayStr: string = (this.currConfig.weekday || '').toString();
      this.weekdayVal = this.convertWeekday(weekdayStr, WEEKDAY_NUM_DEFAULT);
      isPrepareData = true;
    }

    if (isPrepareData && this.weekdayVal != null) {
      const isWeekOnMonday: boolean = false;
      this.updateValue(this.value, this.weekdayVal, isWeekOnMonday, this.startDate || null);
    }
  }

  public ngAfterContentInit(): void {
    console.log(`AfterContentInit()`); // #
    // // When using [(ngModel)] parentFormGroup will be null.
    // this.isRemoveAttrHideAnimation = !this.parentFormGroup;
    // if (!this.isRemoveAttrHideAnimation) {
    //   // Remove an attribute that disables animation on initialization.
    //   this.renderer.removeAttribute(this.hostRef.nativeElement, CSS_ATTR_HIDE_ANIMATION_INIT);
    // }
  }

  // ** -- **

  // ** Public methods **

  public trackByIndex(index: number): number {
    return index;
  }

  public isEmpty(): boolean {
    return this.value == null;
  }

  public clickSwitch(): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      console.log(`clickSwitch() return;`); // #
      return;
    }
  }

  public clickPrev(): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      console.log(`clickPrev() return;`); // #
      return;
    }
  }

  public clickNext(): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      console.log(`clickNext() return;`); // #
      return;
    }
  }

  public clickSelectItem(cell: CalendarCell | null): void {
    if (this.isDisabledVal || this.isReadOnlyVal || !cell || (cell.attr1 != ATTR_CURRENT && this.isHideOldDaysVal)) {
      console.log(`clickSelectItem() return;`); // #
      return;
    }
  }

  // ** Private methods **

  private updateValue(selected: Date | null | undefined, weekdayLen: number, isWeekOnMonday: boolean, startDate: Date | null): void {
    console.log(`prepareData()`); // #
    const today: Date = new Date();
    const initDate: Date = selected || startDate || today;
    this.nameYear = DateUtil.getNameYear(initDate, 'numeric');
    this.nameMonth = DateUtil.getNameMonth(initDate, 'long');
    this.daysOfWeek = this.getListDaysOfWeek(weekdayLen);
    this.calendarRows = this.getGridDaysOfMonth(selected, isWeekOnMonday, initDate, today);
    this.changeDetectorRef.markForCheck();
  }
  /** Get a list of days of the week.
   * @param weekday: number; // 1-'narrow'(T); 2,3-'short'(Thu); -1-'long'(Thursday);
   */
  private getListDaysOfWeek(weekdayLen: number): string[] {
    const result: string[] = ['', '', '', '', '', '', ''];
    const weekdayRes: 'long' | 'short' | 'narrow' = weekdayLen <= 0 || 3 < weekdayLen ? 'long' : 1 === weekdayLen ? 'narrow' : 'short';
    const currentDate: Date = new Date();
    const current: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    for (let i = 1; i < 8; i++) {
      current.setDate(i);
      const value: string = DateUtil.getNameWeekday(current, weekdayRes);
      const index: number = current.getDay();
      result[index] = weekdayLen > 0 ? value.substring(0, weekdayLen) : value;
    }
    return result;
  }

  private getGridDaysOfMonth(selected: Date | null | undefined, isWeekOnMonday: boolean, initDate: Date, today: Date): CalendarRow[] {
    console.log(`getGridDaysOfMonth()`); // #
    const result: CalendarRow[] = [];
    const selectedYear: number | undefined = selected?.getFullYear();
    const selectedMonth: number | undefined = selected?.getMonth();
    const selectedDay: number | undefined = selected?.getDate();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const todayDay: number = today.getDate();

    const itemDate: Date = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate(), 0, 0, 0, 0);
    const currentMonth: number = itemDate.getMonth();
    itemDate.setDate(1);
    // dateItem.getDay() 0-Sun,1-Mon,2-Tue,3-Wed,4-Thu,5-Fri,6-Sat;
    itemDate.setDate(itemDate.getDate() - itemDate.getDay() - 1);
    const weekStartIndex: number = 0;

    let hasSelected: boolean = selected == null;
    let hasToday: boolean = false;
    let isToday: boolean | undefined;
    let isDayoff: boolean | undefined;
    let calendarRow: CalendarRow | undefined;
    let idx: number = 0;
    while (idx < 42) {
      itemDate.setDate(itemDate.getDate() + 1);
      const year: number = itemDate.getFullYear();
      const month: number = itemDate.getMonth();
      const day: number = itemDate.getDate();
      const dayWeek: number = itemDate.getDay();
      let attr1: string = '';
      if (!hasSelected && year === selectedYear && month === selectedMonth && day === selectedDay) {
        hasSelected = true;
        attr1 = ATTR_SELECTED;
      } else if (month === currentMonth) {
        attr1 = ATTR_CURRENT;
      } else {
        attr1 = ATTR_OLD_MONTH;
      }

      isToday = !hasToday && year === todayYear && month === todayMonth && day === todayDay ? true : undefined;
      if (!hasToday && isToday) {
        hasToday = true;
      }
      isDayoff = dayWeek == 0 || dayWeek == 6 ? true : undefined;
      if (weekStartIndex === dayWeek) {
        calendarRow = { cellList: [], weekNumberObj: { weekNumber: DateUtil.getWeekNumber(itemDate) } };
        result.push(calendarRow);
      }
      calendarRow?.cellList.push({ year, month, day, attr1, isToday, isDayoff });
      idx++;
    }
    return result;
  }

  private getIsWeekStartsOnMonday(): boolean {
    const he1: any = new Intl.Locale('default');
    return 1 === he1.weekInfo?.firstDay;
  }

  // **

  private convertSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private convertWeekday(weekday: string | undefined, defaultWeekdayNum: number): number {
    let weekdayNum: number = defaultWeekdayNum;
    if (weekday != undefined && !!weekday) {
      const valueNum: number = Number.parseFloat(weekday);
      if (!Number.isNaN(valueNum)) {
        weekdayNum = 0 < valueNum && valueNum < 25 ? valueNum : -1;
      } else {
        weekdayNum = 'long' === weekday ? -1 : 'short' === weekday ? 3 : weekdayNum;
      }
    }
    return weekdayNum;
  }

  private setCssCellSize(cellSize: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_CELL_SIZE, (cellSize > 0 ? cellSize.toString() : null)?.concat('px'));
  }
  private setCssFontSizeHeader(fontSize: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_FONT_SIZE_HEADER, (fontSize > 0 ? fontSize.toString() : null)?.concat('px'));
  }
  private settingIsDisabled(isDisabled: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!isDisabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', isDisabled ? '' : null);
  }
  private settingIsHorizont(isHorizont: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-is-horizont', !!isHorizont);
    HtmlElemUtil.setAttr(renderer, elem, 'hor', isHorizont ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
  private settingRequired(required: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-required', !!required);
    HtmlElemUtil.setAttr(renderer, elem, 'req', required ? '' : null);
  }
}
