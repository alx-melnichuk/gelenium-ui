import {
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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, ValidationErrors } from '@angular/forms';
import { BooleanUtil } from '../_utils/boolean.util';
import { DateUtil } from '../_utils/date.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { CALENDAR_VIEW_DAY, CALENDAR_VIEW_MONTH, CALENDAR_VIEW_YEAR, GlnCalendarChange } from './gln-calendar-change.interface';
import { GlnCalendarConfig } from './gln-calendar-config.interface';
import {
  CalendarDayCell,
  CalendarDayCellRow,
  CalendarDayName,
  CALENDAR_DAY_CURRENT,
  CALENDAR_YEAR_PERIOD_MAX,
  CALENDAR_YEAR_PERIOD_MIN,
  GlnCalendarUtil,
} from './gln-calendar.util';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--item-size';

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const WEEKDAY_NUM_DEFAULT = 2;
const NUMBER_OF_YEARS_DEFAULT = 20;

let uniqueIdCounter = 0;

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
  public isStartSunday: string | boolean | null | undefined;
  @Input()
  public isWeekNumber: string | boolean | null | undefined;
  @Input()
  public monthFormByDays: string | null | undefined;
  @Input()
  public monthFormByMonths: string | null | undefined;
  @Input()
  public numberOfYears: string | null | undefined;
  @Input()
  public startDate: Date | null | undefined;
  @Input()
  public sizeDayWeek: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  @Input()
  public value: Date | null | undefined;
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly change: EventEmitter<Date | null> = new EventEmitter();
  @Output() // Emits selected month from the list. This does not mean that the selected date has changed.
  readonly monthSelected: EventEmitter<Date> = new EventEmitter();
  @Output() // Emits selected year from the list. This does not mean that the selected date has changed.
  readonly yearSelected: EventEmitter<Date> = new EventEmitter();

  @ViewChild('dayInfoRowListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public dayInfoRowListRef: ElementRef<HTMLDivElement> | undefined;

  public get numberOfYearsValue(): number {
    return this.numberOfYearsVal || NUMBER_OF_YEARS_DEFAULT;
  }
  public set numberOfYearsValue(value: number) {}

  public get sizeDayWeekValue(): number {
    return this.sizeDayWeekVal || WEEKDAY_NUM_DEFAULT;
  }
  public set sizeDayWeekValue(value: number) {}

  public calendarDayCellRowList: CalendarDayCellRow[] = [];
  public calendarDayNameList: CalendarDayName[] = [];
  public calendarDayMonth: number = -1;
  public calendarDayMonthName: string = '';
  public calendarDayYear: number = -1;
  public calendarDayYearName: string = '';
  public calendarMonthCellList: string[] = [];
  public calendarMonthSelected: number = -1;
  public calendarYearCellList: number[] = [];
  public calendarYearFirst: number = -1;
  public calendarYearLast: number = -1;
  public calendarYearCurrent: number = -1;
  public calendarYearSelected: number = -1;
  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public currConfig: GlnCalendarConfig;
  public errors: ValidationErrors | null = null;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isStartSundayVal: boolean | null = null; // Binding attribute "isStartSunday".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public markedDate: Date | null = null;
  public monthFormByDaysVal: string | null = null; // Binding attribute "monthFormByDays".
  public monthFormByMonthsVal: string | null = null; // Binding attribute "monthFormByMonths".
  public numberOfYearsVal: number | null = null; // Binding attribute "numberOfYears".
  public numberCellsByYearsVal: string | null = null; // Binding attribute "numberCellsByYears".
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public todaysMonth: number = -1;
  public todaysYear: number = -1;
  public VIEW_DAY: string = CALENDAR_VIEW_DAY;
  public VIEW_MONTH: string = CALENDAR_VIEW_MONTH;
  public VIEW_YEAR: string = CALENDAR_VIEW_YEAR;
  public view: string = CALENDAR_VIEW_DAY;
  public YEAR_PERIOD_MIN: number = -1;
  public YEAR_PERIOD_MAX: number = -1;

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
    let isPrepareToViewDay: boolean = false;
    let isPrepareToViewMonth: boolean = false;
    let isPrepareToViewYear: boolean = false;
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['cellSize'] || (changes['config'] && this.cellSize == null && this.currConfig.cellSize != null)) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertNumber(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
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
    if (changes['isStartSunday'] || (changes['config'] && this.isStartSunday == null && this.currConfig.isStartSunday != null)) {
      this.isStartSundayVal = BooleanUtil.init(this.isStartSunday) ?? !!this.currConfig.isStartSunday;
      isPrepareToViewDay = true;
    }
    if (changes['isWeekNumber'] || (changes['config'] && this.isWeekNumber == null && this.currConfig.isWeekNumber != null)) {
      this.isWeekNumberVal = BooleanUtil.init(this.isWeekNumber) ?? !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (changes['monthFormByDays'] || (changes['config'] && this.monthFormByDays == null && this.currConfig.monthFormByDays != null)) {
      this.monthFormByDaysVal = this.monthFormByDays || this.currConfig.monthFormByDays || '';
      isPrepareToViewDay = true;
    }
    if (
      changes['monthFormByMonths'] ||
      (changes['config'] && this.monthFormByMonths == null && this.currConfig.monthFormByMonths != null)
    ) {
      this.monthFormByMonthsVal = this.monthFormByMonths || this.currConfig.monthFormByMonths || '';
      isPrepareToViewMonth = true;
    }
    if (changes['numberOfYears'] || (changes['config'] && this.numberOfYears == null && this.currConfig.numberOfYears != null)) {
      const numberOfYearsStr: string = this.monthFormByMonths || this.currConfig.numberOfYears?.toString() || '';
      this.numberOfYearsVal = this.convertNumber(numberOfYearsStr, NUMBER_OF_YEARS_DEFAULT);
      isPrepareToViewYear = true;
    }
    if (changes['startDate'] || (changes['config'] && this.startDate == null && this.currConfig.startDate != null)) {
      this.startDateVal = this.startDate || this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        isPrepareToViewDay = true;
        isPrepareToViewYear = true;
      }
    }
    if (changes['sizeDayWeek'] || (changes['config'] && this.sizeDayWeek == null && this.currConfig.sizeDayWeek != null)) {
      const sizeDayWeekStr: string = (this.sizeDayWeek?.toString() || this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      isPrepareToViewDay = true;
    }
    if (changes['value']) {
      this.markedDate = this.value || null;
      isPrepareToViewDay = true;
      isPrepareToViewMonth = true;
      isPrepareToViewYear = true;
    }

    if (isPrepareToViewDay) {
      const isStartSundayVal: boolean = !!this.isStartSundayVal;
      this.updateViewDayCells(this.value || null, this.sizeDayWeekValue, isStartSundayVal, this.startDateVal, this.monthFormByDaysVal);
    }
    if (isPrepareToViewMonth) {
      this.updateViewMonthCells(this.value, this.monthFormByMonthsVal);
    }
    if (isPrepareToViewYear) {
      this.updateViewYearCells(this.startDateVal, this.value, this.numberOfYearsValue);
      this.updateViewYearPeriodLimits(this.numberOfYearsValue, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    let isPrepareToViewDay: boolean = false;
    let isPrepareToViewMonth: boolean = false;
    let isPrepareToViewYear: boolean = false;

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertNumber(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
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
    if (this.isStartSundayVal == null) {
      this.isStartSundayVal = !!this.currConfig.isStartSunday;
      isPrepareToViewDay = true;
    }
    if (this.isWeekNumberVal == null) {
      this.isWeekNumberVal = !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (this.monthFormByDaysVal == null) {
      this.monthFormByDaysVal = this.currConfig.monthFormByDays || '';
      isPrepareToViewDay = true;
    }
    if (this.monthFormByMonthsVal == null) {
      this.monthFormByMonthsVal = this.currConfig.monthFormByMonths || '';
      isPrepareToViewMonth = true;
    }
    if (this.numberOfYearsVal == null) {
      this.numberOfYearsVal = this.convertNumber(this.currConfig.numberOfYears?.toString() || '', NUMBER_OF_YEARS_DEFAULT);
      isPrepareToViewYear = true;
    }
    if (this.startDateVal == null) {
      this.startDateVal = this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        isPrepareToViewDay = true;
        isPrepareToViewYear = true;
      }
    }
    if (this.sizeDayWeekVal == null) {
      const sizeDayWeekStr: string = (this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      isPrepareToViewDay = true;
    }

    if (isPrepareToViewDay) {
      const isStartSundayVal: boolean = !!this.isStartSundayVal;
      this.updateViewDayCells(this.value || null, this.sizeDayWeekValue, isStartSundayVal, this.startDateVal, this.monthFormByDaysVal);
    }
    if (isPrepareToViewMonth) {
      this.updateViewMonthCells(this.value, this.monthFormByMonthsVal);
    }
    if (isPrepareToViewYear) {
      this.updateViewYearCells(this.startDateVal, this.value, this.numberOfYearsValue);
      this.updateViewYearPeriodLimits(this.numberOfYearsValue, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
  }

  // ** Public methods **

  public trackByIndex(index: number): number {
    return index;
  }

  public isEmpty(): boolean {
    return this.value == null;
  }

  public clickSwitch(): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      if (this.view === CALENDAR_VIEW_DAY) {
        this.view = CALENDAR_VIEW_YEAR;
      } else if (this.view === CALENDAR_VIEW_YEAR) {
        this.view = CALENDAR_VIEW_MONTH;
      } else if (this.view === CALENDAR_VIEW_MONTH) {
        this.view = CALENDAR_VIEW_DAY;
      }
    }
  }

  public clickPrev(newView: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (CALENDAR_VIEW_MONTH === newView) {
      const startDate: Date = new Date(this.calendarDayYear, this.calendarDayMonth - 1, 1, 0, 0, 0, 0);
      this.updateViewDayCells(this.value || null, this.sizeDayWeekValue, !!this.isStartSundayVal, startDate, this.monthFormByDaysVal);
    } else if (CALENDAR_VIEW_YEAR === newView) {
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearFirst - 1, this.numberOfYearsValue);
      if (yearStart !== -1) {
        this.updateViewYearCells(new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value, this.numberOfYearsValue);
      }
    }
  }

  public clickNext(newView: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (CALENDAR_VIEW_MONTH === newView) {
      const startDate: Date = new Date(this.calendarDayYear, this.calendarDayMonth + 1, 1, 0, 0, 0, 0);
      this.updateViewDayCells(this.value || null, this.sizeDayWeekValue, !!this.isStartSundayVal, startDate, this.monthFormByDaysVal);
    } else if (CALENDAR_VIEW_YEAR === newView) {
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearLast + 1, this.numberOfYearsValue);
      if (yearStart !== -1) {
        this.updateViewYearCells(new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value, this.numberOfYearsValue);
      }
    }
  }

  // -- Methods for the mode "view year" --

  public clickYearCell(year: number): void {
    console.log(`clickYearCell(${year})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || this.view !== CALENDAR_VIEW_YEAR) {
      return;
    }
    const minYear: number = this.calendarYearCellList[0];
    const maxYear: number = this.calendarYearCellList[this.calendarYearCellList.length - 1];
    if (minYear <= year && year <= maxYear) {
      const yearValue: number = this.value?.getFullYear() || -1;
      if (year !== yearValue) {
        this.calendarYearCurrent = year;
        this.yearSelected.emit(new Date(year, 0, 1, 0, 0, 0, 0));
      }
      this.clickSwitch();
    }
  }

  // -- Methods for the mode "view month" --

  public clickMonthCell(month: number): void {
    console.log(`clickMonthCell(${month})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || this.view !== CALENDAR_VIEW_MONTH) {
      return;
    }
    const monthValue: number = this.value?.getMonth() || -1;
    if (-1 < month && month < 12) {
      if (month !== monthValue) {
        const year: number = this.calendarYearCurrent !== -1 ? this.calendarYearCurrent : new Date().getFullYear();
        this.monthSelected.emit(new Date(year, month, 1, 0, 0, 0, 0));
      }
      this.clickSwitch();
    }
  }

  // -- Methods for the mode "view day" --

  public clickSelectItem(cell: CalendarDayCell | null): void {
    if (this.isDisabledVal || this.isReadOnlyVal || !cell || (this.isHideOldDaysVal && cell.state != CALENDAR_DAY_CURRENT)) {
      console.log(`clickSelectItem() return;`); // #
      return;
    }
    let value: Date | null = null;
    if (cell !== null) {
      const yearValue: number = this.value?.getFullYear() || -1;
      const monthValue: number = this.value?.getMonth() || -1;
      const dayValue: number = this.value?.getDate() || -1;
      if (yearValue !== cell.year || monthValue !== cell.month || dayValue !== cell.day) {
        value = GlnCalendarUtil.getDateByItsDetails(this.value || new Date(), cell.year, cell.month, cell.day);
      }
    }
    this.change.emit(value);
  }

  public keydownDayInfoRowList(event: KeyboardEvent): void {
    console.log(`keydownDayInfoRowList()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    // event.key === 'ArrowRight' 'ArrowLeft' 'ArrowUp' 'ArrowDown' 'Tab' 'Escape' 'Enter' 'June 6, 2023'
    if (this.view !== CALENDAR_VIEW_DAY || this.markedDate == null) {
      return;
    }
    let delta: number = 0;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : 7;
    const deltaUpDown: number = !this.isHorizontVal ? -7 : -1;
    if ('ArrowRight' === event.key) {
      delta = deltaRightLeft;
    } else if ('ArrowLeft' === event.key) {
      delta = -deltaRightLeft;
    } else if ('ArrowUp' === event.key) {
      delta = deltaUpDown;
    } else if ('ArrowDown' === event.key) {
      delta = -deltaUpDown;
    }
    if (delta != 0) {
      const newMarkedDate: Date = DateUtil.addDay(this.markedDate, delta);
      const dateBegin: Date = new Date(this.calendarDayYear, this.calendarDayMonth, 1, 0, 0, 0, 0);
      const dateEnd: Date = DateUtil.addDay(new Date(this.calendarDayYear, this.calendarDayMonth + 1, 1, 0, 0, 0, 0), -1);

      if (DateUtil.compare(dateBegin, newMarkedDate) === 1) {
        console.log(`newMarkedDate < this.initDateStart`); // #
        this.clickPrev(CALENDAR_VIEW_MONTH);
      } else if (DateUtil.compare(dateEnd, newMarkedDate) === 1) {
        console.log(`this.initDateFinish < newMarkedDate`); // #
        this.clickNext(CALENDAR_VIEW_MONTH);
      } else {
        const currElem: HTMLElement | null = this.getElementByDate(this.dayInfoRowListRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
        const newElem: HTMLElement | null = this.getElementByDate(this.dayInfoRowListRef, GlnCalendarUtil.getLabelByDate(newMarkedDate));
        if (newElem != null) {
          this.markedDate = newMarkedDate;
          HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
          HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(newElem), 'tabindex', '0');
          Promise.resolve().then(() => {
            newElem.focus();
          });
        }
      }
    } else if (' ' === event.key || 'Enter' === event.key) {
      const elem: HTMLElement | null = this.getElementByDate(this.dayInfoRowListRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
      if (elem != null) {
        delta = 9;
        const value: Date = new Date(this.markedDate);
        this.change.emit(value);
      }
    }

    if (delta != 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ** Private methods **

  // -- Methods for the mode "view year" --
  private updateViewYearCells(startDate: Date | null, selected: Date | null | undefined, numberOfYears: number): void {
    const today: Date = new Date();
    this.todaysYear = today.getFullYear();
    this.calendarYearSelected = selected?.getFullYear() || this.todaysYear;
    this.calendarYearCurrent = this.todaysYear;

    const initDate: Date = startDate || selected || today;
    let yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(initDate.getFullYear(), numberOfYears);
    if (yearStart === -1) {
      yearStart = GlnCalendarUtil.getFirstYearOfPeriod((selected || today).getFullYear(), numberOfYears);
    }
    this.calendarYearCellList = GlnCalendarUtil.getYearCellList(yearStart, numberOfYears);
    this.calendarYearFirst = yearStart;
    this.calendarYearLast = yearStart + numberOfYears - 1;
    this.changeDetectorRef.markForCheck();
  }
  private updateViewYearPeriodLimits(numberOfYears: number, yearPeriodMin: number, yearPeriodMax: number): void {
    this.YEAR_PERIOD_MIN = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMin, numberOfYears);
    this.YEAR_PERIOD_MAX = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMax - numberOfYears, numberOfYears) + numberOfYears - 1;
  }
  // -- Methods for the mode "view month" --
  private updateViewMonthCells(selected: Date | null | undefined, monthFormByMonths: string | null): void {
    const today: Date = new Date();
    this.todaysMonth = today.getMonth();
    this.calendarMonthSelected = selected?.getMonth() || this.todaysMonth;

    this.calendarMonthCellList = GlnCalendarUtil.getMonthCellList(DateUtil.convertMonthFormat(monthFormByMonths || 'short'));

    this.changeDetectorRef.markForCheck();
  }

  // -- Methods for the mode "view day" --
  private updateViewDayCells(
    selected: Date | null,
    sizeDayWeek: number,
    isSunday: boolean,
    startDate: Date | null,
    format: string | null
  ): void {
    const today: Date = new Date();
    const date: Date = startDate || selected || today;
    this.calendarDayYear = date.getFullYear();
    this.calendarDayMonth = date.getMonth();
    const date2: Date = new Date(this.calendarDayYear, this.calendarDayMonth, 1, 0, 0, 0, 0);

    this.calendarDayYearName = DateUtil.getYearName(date2, 'numeric');
    this.calendarDayMonthName = DateUtil.getMonthName(date2, DateUtil.convertMonthFormat(format || 'long'));

    const dayStartWeek: number = !isSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    this.calendarDayNameList = GlnCalendarUtil.getDayNameList(sizeDayWeek, dayStartWeek);
    this.calendarDayCellRowList = GlnCalendarUtil.getDayCellRowList(selected, dayStartWeek, date2, today);

    this.changeDetectorRef.markForCheck();
  }
  // -- --

  private getElementByDate(dayInfoRowListRef: ElementRef<HTMLDivElement> | undefined, label: string | null): HTMLElement | null {
    let result: HTMLElement | null = null;
    if (!!dayInfoRowListRef && !!label) {
      result = dayInfoRowListRef.nativeElement.querySelector(`button[data-label='${label}']`) as HTMLElement;
    }
    return result;
  }

  private convertNumber(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private convertSizeDayWeek(sizeDayWeek: string | undefined, defaultWeekdayNum: number): number {
    let sizeDayWeekNum: number = defaultWeekdayNum;
    if (sizeDayWeek != undefined && !!sizeDayWeek) {
      const valueNum: number = Number.parseFloat(sizeDayWeek);
      if (!Number.isNaN(valueNum)) {
        sizeDayWeekNum = 0 < valueNum && valueNum < 25 ? valueNum : -1;
      } else {
        sizeDayWeekNum = 'long' === sizeDayWeek ? -1 : 'short' === sizeDayWeek ? 3 : sizeDayWeekNum;
      }
    }
    return sizeDayWeekNum;
  }

  private setCssCellSize(cellSize: number, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_CELL_SIZE, (cellSize > 0 ? cellSize.toString() : null)?.concat('px'));
  }
  private settingIsDisabled(isDisabled: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', !!isDisabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', isDisabled ? '' : null);
  }
  private settingIsHorizont(isHorizont: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-is-horizont', !!isHorizont);
    HtmlElemUtil.setAttr(renderer, elem, 'hor', isHorizont ? '' : null);
  }
  private settingIsWeekNumber(isWeekNumber: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-is-week-number', !!isWeekNumber);
    HtmlElemUtil.setAttr(renderer, elem, 'wee', isWeekNumber ? '' : null);
  }
  private settingReadOnly(readOnly: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-read-only', !!readOnly);
    HtmlElemUtil.setAttr(renderer, elem, 'rea', readOnly ? '' : null);
  }
}
