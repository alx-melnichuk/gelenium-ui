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
  NgZone,
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
import { first } from 'rxjs/operators';

import { BooleanUtil } from '../_utils/boolean.util';
import { ChangeUtil } from '../_utils/change.util';
import { DateUtil } from '../_utils/date.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import {
  CalendarDayCell,
  CalendarDayCellRow,
  CalendarDayName,
  CALENDAR_DAY_CURRENT,
  CALENDAR_DAY_PREVIOUS,
  CALENDAR_DAY_SELECTED,
  CALENDAR_YEAR_PERIOD_MAX,
  CALENDAR_YEAR_PERIOD_MIN,
  GlnCalendarUtil,
} from './gln-calendar.util';
import { GlnCalendarConfig } from './gln-calendar-config.interface';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--item-size';

export const CALENDAR_VIEW_DAY = 'day';
export const CALENDAR_VIEW_MONTH = 'month';
export const CALENDAR_VIEW_YEAR = 'year';

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const WEEKDAY_NUM_DEFAULT = 2;
const NUMBER_OF_YEARS_DEFAULT = 20;
const FORMAT_BY_MONTH_DEFAULT = 'short';
const MONTH_FORMAT_DEFAULT = 'long';

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
  public formatByMonths: string | null | undefined;
  @Input()
  public formatForMonth: string | null | undefined;
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
  public isTwoDigitDay: string | boolean | null | undefined;
  @Input()
  public isWeekNumber: string | boolean | null | undefined;
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

  @ViewChild('yearCellListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public yearCellListRef: ElementRef<HTMLDivElement> | undefined;

  public calendarDayCellRowList: CalendarDayCellRow[] = [];
  public calendarDayNameList: CalendarDayName[] = [];
  public calendarDayMonth: number = -1;
  public calendarDayMonthName: string = '';
  public calendarDayYear: number = -1;
  public calendarDayYearName: string = '';
  public calendarMonthCellList: string[] = [];
  public calendarMonthSelected: number = -1;
  public calendarMonthToday: number = -1;
  public calendarYearCellList: number[] = [];
  public calendarYearFirst: number = -1;
  public calendarYearLast: number = -1;
  public calendarYearCurrent: number = -1;
  public calendarYearSelected: number = -1;
  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public currConfig: GlnCalendarConfig;
  public errors: ValidationErrors | null = null;
  public formatByMonthsVal: string | null = null; // Binding attribute "formatByMonths".
  public formatForMonthVal: string | null = null; // Binding attribute "formatForMonth".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isStartSundayVal: boolean | null = null; // Binding attribute "isStartSunday".
  public isTwoDigitDayVal: boolean | null = null; // Binding attribute "isTwoDigitDay".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public markedDate: Date | null = null;
  public markedYear: number | null = null;
  public numberOfYearsVal: number | null = null; // Binding attribute "numberOfYears".
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public STATE_CURR: string = CALENDAR_DAY_CURRENT;
  public STATE_OLD: string = CALENDAR_DAY_PREVIOUS;
  public STATE_SLCT: string = CALENDAR_DAY_SELECTED;
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
    private ngZone: NgZone,
    @Optional() @Inject(GLN_CALENDAR_CONFIG) private rootConfig: GlnCalendarConfig | null,
    @Optional() @Host() @SkipSelf() private parentFormGroup: ControlContainer | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-calendar');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let hasFormatByMonths: boolean = false;
    let hasFormatForMonth: boolean = false;
    let hasIsStartSunday: boolean = false;
    let hasNumberOfYears: boolean = false;
    let hasSizeDayWeek: boolean = false;
    let hasStartDate: boolean = false;
    let hasValue: boolean = false;

    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (!!changes['cellSize'] || ChangeUtil.check(changes['config'], 'cellSize')) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertNumber(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (!!changes['formatByMonths'] || ChangeUtil.check(changes['config'], 'formatByMonths')) {
      this.formatByMonthsVal = this.formatByMonths || this.currConfig.formatByMonths || '';
      hasFormatByMonths = true;
      console.log(`OnChanges() formatByMonths`); // #
    }
    if (changes['formatForMonth'] || ChangeUtil.check(changes['config'], 'formatForMonth')) {
      this.formatForMonthVal = this.formatForMonth || this.currConfig.formatForMonth || '';
      hasFormatForMonth = true;
      console.log(`OnChanges() formatForMonth`); // #
    }
    if (!!changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      this.settingIsDisabled(this.isDisabledVal, this.renderer, this.hostRef);
    }
    if (!!changes['isHideOldDays'] || ChangeUtil.check(changes['config'], 'isHideOldDays')) {
      this.isHideOldDaysVal = BooleanUtil.init(this.isHideOldDays) ?? !!this.currConfig.isHideOldDays;
    }
    if (!!changes['isHideDayoff'] || ChangeUtil.check(changes['config'], 'isHideDayoff')) {
      this.isHideDayoffVal = BooleanUtil.init(this.isHideDayoff) ?? !!this.currConfig.isHideDayoff;
    }
    if (!!changes['isHorizont'] || ChangeUtil.check(changes['config'], 'isHorizont')) {
      this.isHorizontVal = BooleanUtil.init(this.isHorizont) ?? !!this.currConfig.isHorizont;
      this.settingIsHorizont(this.isHorizontVal, this.renderer, this.hostRef);
    }
    if (!!changes['isReadOnly'] || ChangeUtil.check(changes['config'], 'isReadOnly')) {
      this.isReadOnlyVal = BooleanUtil.init(this.isReadOnly) ?? !!this.currConfig.isReadOnly;
      this.settingReadOnly(this.isReadOnlyVal, this.renderer, this.hostRef);
    }
    if (!!changes['isStartSunday'] || ChangeUtil.check(changes['config'], 'isStartSunday')) {
      this.isStartSundayVal = BooleanUtil.init(this.isStartSunday) ?? !!this.currConfig.isStartSunday;
      hasIsStartSunday = true;
      console.log(`OnChanges() isStartSunday`); // #
    }
    if (!!changes['isTwoDigitDay'] || ChangeUtil.check(changes['config'], 'isTwoDigitDay')) {
      this.isTwoDigitDayVal = BooleanUtil.init(this.isTwoDigitDay) ?? !!this.currConfig.isTwoDigitDay;
    }
    if (!!changes['isWeekNumber'] || ChangeUtil.check(changes['config'], 'isWeekNumber')) {
      this.isWeekNumberVal = BooleanUtil.init(this.isWeekNumber) ?? !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (!!changes['numberOfYears'] || ChangeUtil.check(changes['config'], 'numberOfYears')) {
      const numberOfYearsStr: string = this.numberOfYears || this.currConfig.numberOfYears?.toString() || '';
      this.numberOfYearsVal = this.convertNumber(numberOfYearsStr, NUMBER_OF_YEARS_DEFAULT);
      hasNumberOfYears = true;
      console.log(`OnChanges() numberOfYears`); // #
    }
    if (!!changes['startDate'] || ChangeUtil.check(changes['config'], 'startDate')) {
      this.startDateVal = this.startDate || this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        hasStartDate = true;
        console.log(`OnChanges() startDate`); // #
      }
    }
    if (!!changes['sizeDayWeek'] || ChangeUtil.check(changes['config'], 'sizeDayWeek')) {
      const sizeDayWeekStr: string = (this.sizeDayWeek?.toString() || this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      hasSizeDayWeek = true;
      console.log(`OnChanges() sizeDayWeek`); // #
    }
    if (changes['value'] && !changes['value'].firstChange) {
      hasValue = true;
      this.markedDate = this.value || new Date();
      console.log(`OnChanges() value`); // #
    }

    if (hasIsStartSunday || hasSizeDayWeek) {
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal);
    }
    const current = this.initDate(this.calendarDayMonth, this.calendarDayYear, this.currentDate(this.startDateVal, this.value, new Date()));
    if (hasFormatForMonth) {
      this.updateViewDayTitle(this.formatForMonthVal, current);
    }
    if (hasIsStartSunday || hasStartDate || hasValue) {
      this.updateViewDayCells(this.isStartSundayVal, current, this.value);
    }
    if (hasFormatByMonths || hasValue) {
      this.updateViewMonthCells(this.formatByMonthsVal, this.value);
    }
    if (hasNumberOfYears) {
      this.updateViewYearPeriodLimits(this.numberOfYearsVal, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
    if (hasNumberOfYears || hasStartDate || hasValue) {
      this.updateViewYearCells(this.numberOfYearsVal, this.startDateVal, this.value);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertNumber(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (this.formatByMonthsVal == null) {
      this.formatByMonthsVal = this.currConfig.formatByMonths || FORMAT_BY_MONTH_DEFAULT;
      console.log(`OnInit() formatByMonthsVal == null`); // #
    }
    if (this.formatForMonthVal == null) {
      this.formatForMonthVal = this.currConfig.formatForMonth || '';
      console.log(`OnInit() formatForMonthVal == null`); // #
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
      console.log(`OnInit() isStartSundayVal == null`); // #
    }
    if (this.isTwoDigitDayVal == null) {
      this.isTwoDigitDayVal = !!this.currConfig.isTwoDigitDay;
    }
    if (this.isWeekNumberVal == null) {
      this.isWeekNumberVal = !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (this.numberOfYearsVal == null) {
      this.numberOfYearsVal = this.convertNumber(this.currConfig.numberOfYears?.toString() || '', NUMBER_OF_YEARS_DEFAULT);
      console.log(`OnInit() numberOfYearsVal == null`); // #
    }
    if (this.startDateVal == null) {
      this.startDateVal = this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        console.log(`OnInit() startDateVal == null`); // #
      }
    }
    if (this.sizeDayWeekVal == null) {
      const sizeDayWeekStr: string = (this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      console.log(`OnInit() sizeDayWeekVal == null`); // #
    }

    if (this.calendarDayNameList.length === 0) {
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal);
    }
    const current = this.initDate(this.calendarDayMonth, this.calendarDayYear, this.currentDate(this.startDateVal, this.value, new Date()));
    if (!this.calendarDayMonthName) {
      this.updateViewDayTitle(this.formatForMonthVal, current);
    }
    if (this.calendarDayCellRowList.length === 0) {
      this.updateViewDayCells(this.isStartSundayVal, current, this.value);
    }
    if (this.calendarMonthCellList.length === 0) {
      this.updateViewMonthCells(this.formatByMonthsVal, this.value);
    }
    if (this.YEAR_PERIOD_MIN === -1) {
      this.updateViewYearPeriodLimits(this.numberOfYearsVal, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
    if (this.calendarYearCellList.length === 0) {
      this.updateViewYearCells(this.numberOfYearsVal, this.startDateVal, this.value);
    }
  }
  // ** Public methods **

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByNumber(index: number, item: number) {
    return item;
  }

  public trackByDayCell(index: number, dayCell: CalendarDayCell) {
    return dayCell.year * 10000 + dayCell.month * 100 + dayCell.day;
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
      const currentMonth: Date = new Date(this.calendarDayYear, this.calendarDayMonth - 1, 1, 0, 0, 0, 0);
      this.updateViewDayTitle(this.formatForMonthVal, currentMonth);
      this.updateViewDayCells(this.isStartSundayVal, currentMonth, this.value);
      this.changeDetectorRef.markForCheck();
    } else if (CALENDAR_VIEW_YEAR === newView) {
      const numberOfYears: number = this.numberOfYearsVal || NUMBER_OF_YEARS_DEFAULT;
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearFirst - 1, numberOfYears);
      if (yearStart !== -1) {
        this.updateViewYearCells(this.numberOfYearsVal, new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value);
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  public clickNext(newView: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (CALENDAR_VIEW_MONTH === newView) {
      const currentMonth: Date = new Date(this.calendarDayYear, this.calendarDayMonth + 1, 1, 0, 0, 0, 0);
      this.updateViewDayTitle(this.formatForMonthVal, currentMonth);
      this.updateViewDayCells(this.isStartSundayVal, currentMonth, this.value);
      this.changeDetectorRef.markForCheck();
    } else if (CALENDAR_VIEW_YEAR === newView) {
      const numberOfYears: number = this.numberOfYearsVal || NUMBER_OF_YEARS_DEFAULT;
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearLast + 1, numberOfYears);
      if (yearStart !== -1) {
        this.updateViewYearCells(this.numberOfYearsVal, new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value);
        this.changeDetectorRef.markForCheck();
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
  public keydownYearCellList(event: KeyboardEvent, elementRef: HTMLDivElement, yearFirst: number, numberOfYears: number | null): void {
    console.log(``); // #
    console.log(`$$ keydownYearCell()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.view !== CALENDAR_VIEW_YEAR || this.markedYear == null) {
      return;
    }
    let delta: number = 0;
    const numberOfYears2: number = numberOfYears || NUMBER_OF_YEARS_DEFAULT;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : numberOfYears2;
    const deltaUpDown: number = !this.isHorizontVal ? -numberOfYears2 : -1;
    delta = 'ArrowRight' === event.key ? deltaRightLeft : 'ArrowLeft' === event.key ? -deltaRightLeft : delta;
    delta = 'ArrowUp' === event.key ? deltaUpDown : 'ArrowDown' === event.key ? -deltaUpDown : delta;
    console.log(`$$ keydownYearCell(); delta: ${delta} elementRef${elementRef != null ? '!' : ''}=null key: ${event.key}`); // #
    console.log(`$$ keydownYearCell(); markedYear='${this.markedYear}'`); // #
    console.log(`$$ keydownYearCell(); yearFirst=${yearFirst} yearLast=${yearFirst + numberOfYears2 - 1}`); // #
    if (delta != 0) {
      const newMarkedYear: number = this.markedYear + delta;
      const currElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, this.markedYear.toString());
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
      this.markedYear = newMarkedYear;
      console.log(`$$ keydownYearCell();new markedYear='${this.markedYear}'`); // #
      let isZoneOnStable: boolean = false;
      const yearLast: number = yearFirst + numberOfYears2 - 1;
      if (newMarkedYear < yearFirst) {
        console.log(`$$ keydownYearCell; clickPrev(CALENDAR_VIEW_YEAR);`); // #
        this.clickPrev(CALENDAR_VIEW_YEAR);
        isZoneOnStable = true;
      } else if (yearLast < newMarkedYear) {
        console.log(`$$ keydownYearCell; clickNext(CALENDAR_VIEW_YEAR);`); // #
        this.clickNext(CALENDAR_VIEW_YEAR);
        isZoneOnStable = true;
      } else {
        console.log(`$$ keydownYearCell(); 1moveFocusToAnotherElement(${newMarkedYear});`); // #
        this.moveFocusToAnotherElement(elementRef, newMarkedYear.toString());
      }
      if (isZoneOnStable) {
        // Update the position once the zone is stable so that the component will be fully rendered.
        this.ngZone.onStable.pipe(first()).subscribe(() => {
          this.moveFocusToAnotherElement(elementRef, newMarkedYear.toString());
        });
      }
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
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      const newValue: Date | null = cell == null ? null : new Date(cell.year, cell.month, cell.day, 0, 0, 0, 0);
      if (!DateUtil.equality(this.value, newValue)) {
        this.change.emit(newValue);
      } else {
        this.markedDate = newValue;
      }
    }
  }
  public keydownDayCellRowList(event: KeyboardEvent, elementRef: HTMLDivElement): void {
    console.log(``); // #
    console.log(`@@ keydownDayCellRowList()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.view !== CALENDAR_VIEW_DAY || this.markedDate == null) {
      return;
    }
    let delta: number = 0;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : 7;
    const deltaUpDown: number = !this.isHorizontVal ? -7 : -1;
    delta = 'ArrowRight' === event.key ? deltaRightLeft : 'ArrowLeft' === event.key ? -deltaRightLeft : delta;
    delta = 'ArrowUp' === event.key ? deltaUpDown : 'ArrowDown' === event.key ? -deltaUpDown : delta;
    console.log(`@@ keydownDayCell(); delta: ${delta} elementRef${elementRef != null ? '!' : ''}=null key: ${event.key}`); // #
    console.log(`@@ keydownDayCell(); markedDate='${GlnCalendarUtil.getLabelByDate(this.markedDate)}'`); // #
    console.log(`@@ keydownDayCell(); calendarDayYear=${this.calendarDayYear} calendarDayMonth=${this.calendarDayMonth}`); // #
    if (delta != 0) {
      const newMarkedDate: Date = DateUtil.addDay(this.markedDate, delta);
      const currElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
      this.markedDate = newMarkedDate;
      console.log(`@@ keydownDayCell();new markedDate='${GlnCalendarUtil.getLabelByDate(this.markedDate)}'`); // #
      let isZoneOnStable: boolean = false;
      const dateBegin: Date = new Date(this.calendarDayYear, this.calendarDayMonth, 1, 0, 0, 0, 0);
      const dateEnd: Date = DateUtil.addDay(new Date(this.calendarDayYear, this.calendarDayMonth + 1, 1, 0, 0, 0, 0), -1);
      if (DateUtil.compare(newMarkedDate, dateBegin) === 1) {
        console.log(`@@ keydownDayCell(); clickPrev(CALENDAR_VIEW_MONTH);`); // #
        this.clickPrev(CALENDAR_VIEW_MONTH);
        isZoneOnStable = true;
      } else if (DateUtil.compare(dateEnd, newMarkedDate) === 1) {
        console.log(`@@ keydownDayCell(); clickNext(CALENDAR_VIEW_MONTH);`); // #
        this.clickNext(CALENDAR_VIEW_MONTH);
        isZoneOnStable = true;
      } else {
        console.log(`@@ keydownDayCell(); 1moveFocusToAnotherElement(${GlnCalendarUtil.getLabelByDate(newMarkedDate) || ''});`); // #
        this.moveFocusToAnotherElement(elementRef, GlnCalendarUtil.getLabelByDate(newMarkedDate) || '');
      }

      if (isZoneOnStable) {
        // Update the position once the zone is stable so that the component will be fully rendered.
        this.ngZone.onStable.pipe(first()).subscribe(() => {
          console.log(`@@ keydownDayCell(); 2moveFocusToAnotherElement(${GlnCalendarUtil.getLabelByDate(newMarkedDate) || ''});`); // #
          this.moveFocusToAnotherElement(elementRef, GlnCalendarUtil.getLabelByDate(newMarkedDate) || '');
        });
      }
    } else if (' ' === event.key || 'Enter' === event.key) {
      const elem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
      if (elem != null) {
        delta = 9;
        this.change.emit(new Date(this.markedDate));
      }
    }
    if (delta != 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ** Private methods **

  // -- Methods for the mode "view year" --
  private updateViewYearCells(numberOfYears: number | null, startDate: Date | null, selected: Date | null | undefined): void {
    const today: Date = new Date();
    this.todaysYear = today.getFullYear();
    this.calendarYearSelected = selected?.getFullYear() || this.todaysYear;
    this.calendarYearCurrent = this.todaysYear;

    const numberOfYears2: number = numberOfYears || NUMBER_OF_YEARS_DEFAULT;
    const initDate: Date = this.currentDate(startDate, selected, new Date());
    let yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(initDate.getFullYear(), numberOfYears2);
    if (yearStart === -1) {
      yearStart = GlnCalendarUtil.getFirstYearOfPeriod((selected || today).getFullYear(), numberOfYears2);
    }
    this.calendarYearCellList = GlnCalendarUtil.getYearCellList(yearStart, numberOfYears2);
    this.calendarYearFirst = yearStart;
    this.calendarYearLast = yearStart + numberOfYears2 - 1;

    this.markedYear = selected?.getFullYear() || today.getFullYear();
  }
  private updateViewYearPeriodLimits(numberOfYears: number | null, yearPeriodMin: number, yearPeriodMax: number): void {
    const numberOfYears2: number = numberOfYears || NUMBER_OF_YEARS_DEFAULT;
    this.YEAR_PERIOD_MIN = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMin, numberOfYears2);
    this.YEAR_PERIOD_MAX = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMax - numberOfYears2, numberOfYears2) + numberOfYears2 - 1;
  }
  // -- Methods for the mode "view month" --
  private updateViewMonthCells(formatByMonths: string | null, selected: Date | null | undefined): void {
    const today: Date = new Date();
    this.calendarMonthToday = today.getMonth();
    this.calendarMonthSelected = selected?.getMonth() || this.calendarMonthToday;
    this.calendarMonthCellList = GlnCalendarUtil.getMonthCellList(DateUtil.convertMonthFormat(formatByMonths || FORMAT_BY_MONTH_DEFAULT));
  }

  // -- Methods for the mode "view day" --
  private updateViewDayTitle(formatForMonth: string | null, currentDate: Date): void {
    this.calendarDayYear = currentDate.getFullYear();
    this.calendarDayMonth = currentDate.getMonth();
    this.calendarDayYearName = DateUtil.getYearName(currentDate, 'numeric');
    this.calendarDayMonthName = DateUtil.getMonthName(currentDate, DateUtil.convertMonthFormat(formatForMonth || MONTH_FORMAT_DEFAULT));
    console.log(`updateViewDayTitle() calendarDayMonth=${this.calendarDayMonth} calendarDayYear=${this.calendarDayYear}`); // #
  }
  private updateViewDayHeader(isStartSunday: boolean | null, sizeDayWeek: number | null): void {
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    const sizeDayWeekVal: number = sizeDayWeek || WEEKDAY_NUM_DEFAULT;
    this.calendarDayNameList = GlnCalendarUtil.getDayNameList(sizeDayWeekVal, dayStartWeek);
    console.log(`updateViewDayHeader() isStartSunday=${isStartSunday} sizeDayWeek=${sizeDayWeekVal}`); // #
  }
  private updateViewDayCells(isStartSunday: boolean | null, currentMonth: Date, selected: Date | null | undefined): void {
    const today: Date = new Date();
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    this.calendarDayCellRowList = GlnCalendarUtil.getDayCellRowList(selected || null, dayStartWeek, currentMonth, today);
    const mDate = ` markedDate=${!!this.markedDate ? this.markedDate.toISOString() : 'null'}`;
    console.log(`updateViewDayCells()  calendarDayMonth=${this.calendarDayMonth} calendarDayYear=${this.calendarDayYear} ${mDate}`); // #
  }
  // -- --
  private moveFocusToAnotherElement(elementRef: HTMLDivElement, newMarkedLabel: string): void {
    const newElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, newMarkedLabel);
    console.log(`moveFocusToAnotherElement(${newMarkedLabel}) newElem${newElem != null ? '!' : ''}=null`); // #
    if (newElem != null) {
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(newElem), 'tabindex', '0');
      // Promise.resolve().then(() => {
      //   newElem.focus();
      // });
      setTimeout(() => {
        newElem.focus();
      }, 300);
      // // Update the position once the zone is stable so that the component will be fully rendered.
      // this.ngZone.onStable.pipe(first()).subscribe(() => {
      //   newElem.focus();
      // });
    }
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

  private currentDate(startDate: Date | null, selected: Date | null | undefined, today: Date): Date {
    return startDate || selected || today;
  }
  private initDate(calendarDayMonth: number, calendarDayYear: number, defaultValue: Date): Date {
    return calendarDayMonth > -1 && calendarDayYear > -1 ? new Date(calendarDayYear, calendarDayMonth, 1, 0, 0, 0, 0) : defaultValue;
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
