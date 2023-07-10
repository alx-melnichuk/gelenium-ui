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
const CSS_PROP_YEAR_WRAP_WD = '--glncn--year-wrapper-wd';
const CSS_PROP_YEAR_WRAP_HG = '--glncn--year-wrapper-hg';
const CSS_PROP_MONTH_WRAP_WD = '--glncn--month-wrapper-wd';
const CSS_PROP_MONTH_WRAP_HG = '--glncn--month-wrapper-hg';

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const WEEKDAY_NUM_DEFAULT = 2;
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
  public colsByYears: number | string | null | undefined; // [1 - 12]  default 4
  @Input()
  public colsByMonths: number | string | null | undefined; // [1 - 12] default 3
  @Input()
  public formatByMonths: string | null | undefined; // 'numeric'(6),'2-digit'(06),'long'(June),'short'(Jun),'narrow'(J)
  @Input()
  public formatForMonth: string | null | undefined; // 'numeric'(6),'2-digit'(06),'long'(June),'short'(Jun),'narrow'(J)
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isHideDayoff: string | boolean | undefined;
  @Input()
  public isHideOldDays: string | boolean | undefined;
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
  public maxDate: Date | null | undefined; // The maximum selectable date.
  @Input()
  public minDate: Date | null | undefined; // The minimum selectable date.
  @Input()
  public rowsByYears: number | string | null | undefined; // [1 - 12] default 5
  @Input()
  public sizeDayWeek: number | string | null | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  @Input()
  public startDate: Date | null | undefined; // # no example
  @Input()
  public value: Date | null | undefined;
  @Input()
  public view: string | null | undefined; // 'day','month','year' default 'day'
  @Input()
  public views: string[] | null | undefined; // Array<'day' | 'month' | 'year'>, default ['day', 'year', 'month']
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
  public colsByYearsVal: number | null = null; // Binding attribute "colsByYears".
  public colsByMonthsVal: number | null = null; // Binding attribute "colsByMonths".
  public currConfig: GlnCalendarConfig;
  public errors: ValidationErrors | null = null;
  public formatByMonthsVal: string | null = null; // Binding attribute "formatByMonths".
  public formatForMonthVal: string | null = null; // Binding attribute "formatForMonth".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isStartSundayVal: boolean | null = null; // Binding attribute "isStartSunday".
  public isTwoDigitDayVal: boolean | null = null; // Binding attribute "isTwoDigitDay".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public markedDate: Date | null = null;
  public markedYear: number | null = null;
  public rowsByYearsVal: number | null = null; // Binding attribute "rowsByYears".
  public rowsByMonthsVal: number | null = null;
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public STATE_CURR: string = CALENDAR_DAY_CURRENT;
  public STATE_OLD: string = CALENDAR_DAY_PREVIOUS;
  public STATE_SLCT: string = CALENDAR_DAY_SELECTED;
  public todaysYear: number = -1;
  public VIEW_DAY: string = GlnCalendarUtil.VIEW_DAY;
  public VIEW_MONTH: string = GlnCalendarUtil.VIEW_MONTH;
  public VIEW_YEAR: string = GlnCalendarUtil.VIEW_YEAR;
  public viewMode: string = GlnCalendarUtil.VIEW_DAY;
  public viewVal: string | null = null; // Binding attribute "view".
  public viewsVal: string[] = []; // Binding attribute "views".
  public YEAR_PERIOD_MIN: number = -1;
  public YEAR_PERIOD_MAX: number = -1;
  public yearsPerPage: number = -1;

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
    let hasSizeDayWeek: boolean = false;
    let hasStartDate: boolean = false;
    let hasValue: boolean = false;
    let hasYearsPerPage: boolean = false;

    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (!!changes['cellSize'] || ChangeUtil.check(changes['config'], 'cellSize')) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = this.convertNumber(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (!!changes['colsByYears'] || ChangeUtil.check(changes['config'], 'colsByYears')) {
      const colsByYearsVal: number = this.convertNumber((this.colsByYears || this.currConfig.colsByYears || '').toString(), -1);
      this.colsByYearsVal = GlnCalendarUtil.getColsByYears(colsByYearsVal);
      this.yearsPerPage = this.colsByYearsVal * GlnCalendarUtil.getRowsByYears(this.rowsByYearsVal || -1);
      this.setCssColsByYears(this.colsByYearsVal, this.hostRef);
      hasYearsPerPage = true;
    }
    if (!!changes['colsByMonths'] || ChangeUtil.check(changes['config'], 'colsByMonths')) {
      const colsByMonthsVal: number = this.convertNumber((this.colsByMonths || this.currConfig.colsByMonths || '').toString(), -1);
      this.colsByMonthsVal = GlnCalendarUtil.getColsByMonths(colsByMonthsVal);
      this.rowsByMonthsVal = GlnCalendarUtil.getRowsByMonthsByCols(this.colsByMonthsVal);
      this.setCssColsRowsByMonths(this.colsByMonthsVal, this.rowsByMonthsVal, this.hostRef);
    }
    if (!!changes['formatByMonths'] || ChangeUtil.check(changes['config'], 'formatByMonths')) {
      this.formatByMonthsVal = this.formatByMonths || this.currConfig.formatByMonths || '';
      hasFormatByMonths = true;
    }
    if (changes['formatForMonth'] || ChangeUtil.check(changes['config'], 'formatForMonth')) {
      this.formatForMonthVal = this.formatForMonth || this.currConfig.formatForMonth || '';
      hasFormatForMonth = true;
    }
    if (!!changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      this.settingIsDisabled(this.isDisabledVal, this.renderer, this.hostRef);
    }
    if (!!changes['isHideDayoff'] || ChangeUtil.check(changes['config'], 'isHideDayoff')) {
      this.isHideDayoffVal = BooleanUtil.init(this.isHideDayoff) ?? !!this.currConfig.isHideDayoff;
    }
    if (!!changes['isHideOldDays'] || ChangeUtil.check(changes['config'], 'isHideOldDays')) {
      this.isHideOldDaysVal = BooleanUtil.init(this.isHideOldDays) ?? !!this.currConfig.isHideOldDays;
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
    }
    if (!!changes['isTwoDigitDay'] || ChangeUtil.check(changes['config'], 'isTwoDigitDay')) {
      this.isTwoDigitDayVal = BooleanUtil.init(this.isTwoDigitDay) ?? !!this.currConfig.isTwoDigitDay;
    }
    if (!!changes['isWeekNumber'] || ChangeUtil.check(changes['config'], 'isWeekNumber')) {
      this.isWeekNumberVal = BooleanUtil.init(this.isWeekNumber) ?? !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (!!changes['rowsByYears'] || ChangeUtil.check(changes['config'], 'rowsByYears')) {
      const rowsByYearsVal: number = this.convertNumber((this.rowsByYears || this.currConfig.rowsByYears || '').toString(), -1);
      this.rowsByYearsVal = GlnCalendarUtil.getRowsByYears(rowsByYearsVal);
      this.yearsPerPage = GlnCalendarUtil.getColsByYears(this.colsByYearsVal || -1) * this.rowsByYearsVal;
      this.setCssRowsByYears(this.rowsByYearsVal, this.hostRef);
      hasYearsPerPage = true;
    }
    if (!!changes['sizeDayWeek'] || ChangeUtil.check(changes['config'], 'sizeDayWeek')) {
      const sizeDayWeekStr: string = (this.sizeDayWeek?.toString() || this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = GlnCalendarUtil.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      hasSizeDayWeek = true;
    }
    if (!!changes['startDate'] || ChangeUtil.check(changes['config'], 'startDate')) {
      this.startDateVal = this.startDate || this.currConfig.startDate || null;
      hasStartDate = true;
    }
    if (changes['value']) {
      hasValue = true;
      this.markedDate = this.value || new Date();
    }
    if (!!changes['views'] || ChangeUtil.check(changes['config'], 'views')) {
      const viewsInput: string[] = GlnCalendarUtil.checkViews(this.views);
      const viewsConfig: string[] = GlnCalendarUtil.checkViews(this.currConfig.views);
      this.viewsVal.push(...(!!viewsInput.length ? viewsInput : !!viewsConfig.length ? viewsConfig : GlnCalendarUtil.getViewModes()));
      if (this.viewsVal.length > 0 && this.viewsVal.indexOf(this.viewMode) === -1) {
        this.viewMode = this.viewsVal[0];
      }
    }

    if (hasIsStartSunday || hasSizeDayWeek) {
      console.log(`OnChange(); updateViewDayHeader();`); // #
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal);
    }
    const current = this.initDate(this.calendarDayMonth, this.calendarDayYear, this.currentDate(this.startDateVal, this.value, new Date()));
    if (hasFormatForMonth) {
      console.log(`OnChange(); updateViewDayTitle();`); // #
      this.updateViewDayTitle(this.formatForMonthVal, current);
    }
    if (hasIsStartSunday || hasStartDate || hasValue) {
      console.log(`OnChange(); updateViewDayCells();`); // #
      this.updateViewDayCells(this.isStartSundayVal, current, this.value);
    }
    if (hasFormatByMonths || hasValue) {
      console.log(`OnChange(); updateViewMonthCells();`); // #
      this.updateViewMonthCells(this.formatByMonthsVal, this.value);
    }
    if (hasYearsPerPage && this.yearsPerPage > -1) {
      console.log(`OnChange(); updateViewYearPeriodLimits();`); // #
      this.updateViewYearPeriodLimits(this.yearsPerPage, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
    if ((hasYearsPerPage || hasStartDate || hasValue) && this.yearsPerPage > -1) {
      console.log(`OnChange(); updateViewYearCells();`); // #
      this.updateViewYearCells(this.yearsPerPage, this.startDateVal, this.value);
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
    if (this.colsByYearsVal == null) {
      const colsByYearsVal: number = this.convertNumber((this.currConfig.colsByYears || '').toString(), -1);
      this.colsByYearsVal = GlnCalendarUtil.getColsByYears(colsByYearsVal);
      this.yearsPerPage = this.colsByYearsVal * GlnCalendarUtil.getRowsByYears(this.rowsByYearsVal || -1);
      this.setCssColsByYears(this.colsByYearsVal, this.hostRef);
    }
    if (this.colsByMonthsVal == null) {
      const colsByMonthsVal: number = this.convertNumber((this.currConfig.colsByMonths || '').toString(), -1);
      this.colsByMonthsVal = GlnCalendarUtil.getColsByMonths(colsByMonthsVal);
      this.rowsByMonthsVal = GlnCalendarUtil.getRowsByMonthsByCols(this.colsByMonthsVal);
      this.setCssColsRowsByMonths(this.colsByMonthsVal, this.rowsByMonthsVal, this.hostRef);
    }
    if (this.formatByMonthsVal == null) {
      this.formatByMonthsVal = this.currConfig.formatByMonths || FORMAT_BY_MONTH_DEFAULT;
    }
    if (this.formatForMonthVal == null) {
      this.formatForMonthVal = this.currConfig.formatForMonth || '';
    }
    if (this.isHideDayoffVal == null) {
      this.isHideDayoffVal = !!this.currConfig.isHideDayoff;
    }
    if (this.isHideOldDaysVal == null) {
      this.isHideOldDaysVal = !!this.currConfig.isHideOldDays;
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
    }
    if (this.isTwoDigitDayVal == null) {
      this.isTwoDigitDayVal = !!this.currConfig.isTwoDigitDay;
    }
    if (this.isWeekNumberVal == null) {
      this.isWeekNumberVal = !!this.currConfig.isWeekNumber;
      this.settingIsWeekNumber(this.isWeekNumberVal, this.renderer, this.hostRef);
    }
    if (this.rowsByYearsVal == null) {
      const rowsByYearsVal: number = this.convertNumber((this.currConfig.rowsByYears || '').toString(), -1);
      this.rowsByYearsVal = GlnCalendarUtil.getRowsByYears(rowsByYearsVal);
      this.yearsPerPage = GlnCalendarUtil.getColsByYears(this.colsByYearsVal || -1) * this.rowsByYearsVal;
      this.setCssRowsByYears(this.rowsByYearsVal, this.hostRef);
    }
    if (this.sizeDayWeekVal == null) {
      const sizeDayWeekStr: string = (this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = GlnCalendarUtil.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
    }
    if (this.startDateVal == null) {
      this.startDateVal = this.currConfig.startDate || null;
    }
    if (this.viewsVal.length === 0) {
      const viewsConfig: string[] = GlnCalendarUtil.checkViews(this.currConfig.views);
      this.viewsVal.push(...(!!viewsConfig.length ? viewsConfig : GlnCalendarUtil.getViewModes()));
      if (this.viewsVal.length > 0 && this.viewsVal.indexOf(this.viewMode) === -1) {
        this.viewMode = this.viewsVal[0];
      }
    }

    const viewStr: string = this.view || this.currConfig.view || '';
    if (!!viewStr && viewStr !== this.viewMode && this.viewsVal.indexOf(viewStr) > -1) {
      this.viewMode = viewStr;
    }

    if (this.calendarDayNameList.length === 0) {
      console.log(`OnInit(); updateViewDayHeader();`); // #
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal);
    }
    const current = this.initDate(this.calendarDayMonth, this.calendarDayYear, this.currentDate(this.startDateVal, this.value, new Date()));
    if (!this.calendarDayMonthName) {
      console.log(`OnInit(); updateViewDayTitle();`); // #
      this.updateViewDayTitle(this.formatForMonthVal, current);
    }
    if (this.calendarDayCellRowList.length === 0) {
      console.log(`OnInit(); updateViewDayCells();`); // #
      this.updateViewDayCells(this.isStartSundayVal, current, this.value);
    }
    if (this.calendarMonthCellList.length === 0) {
      console.log(`OnInit(); updateViewMonthCells();`); // #
      this.updateViewMonthCells(this.formatByMonthsVal, this.value);
    }
    if (this.YEAR_PERIOD_MIN === -1 && this.yearsPerPage > -1) {
      console.log(`OnInit(); updateViewYearPeriodLimits();`); // #
      this.updateViewYearPeriodLimits(this.yearsPerPage, CALENDAR_YEAR_PERIOD_MIN, CALENDAR_YEAR_PERIOD_MAX);
    }
    if (this.calendarYearCellList.length === 0 && this.yearsPerPage > -1) {
      console.log(`OnInit(); updateViewYearCells();`); // #
      this.updateViewYearCells(this.yearsPerPage, this.startDateVal, this.value);
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
    if (!this.isDisabledVal && !this.isReadOnlyVal && this.viewsVal.length > 1) {
      this.viewMode = GlnCalendarUtil.getNextView(this.viewsVal, this.viewMode);
    }
  }

  public clickPrev(newView: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (GlnCalendarUtil.VIEW_MONTH === newView) {
      const currentMonth: Date = new Date(this.calendarDayYear, this.calendarDayMonth - 1, 1, 0, 0, 0, 0);
      if (GlnCalendarUtil.isMoreMinDate(currentMonth, this.minDate)) {
        this.updateViewDayTitle(this.formatForMonthVal, currentMonth);
        this.updateViewDayCells(this.isStartSundayVal, currentMonth, this.value);
        this.changeDetectorRef.markForCheck();
      }
    } else if (GlnCalendarUtil.VIEW_YEAR === newView) {
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearFirst - 1, this.yearsPerPage);
      if (yearStart !== -1) {
        this.updateViewYearCells(this.yearsPerPage, new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value);
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  public clickNext(newView: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (GlnCalendarUtil.VIEW_MONTH === newView) {
      const currentMonth: Date = new Date(this.calendarDayYear, this.calendarDayMonth + 1, 1, 0, 0, 0, 0);
      if (GlnCalendarUtil.isLessMaxDate(currentMonth, this.maxDate)) {
        this.updateViewDayTitle(this.formatForMonthVal, currentMonth);
        this.updateViewDayCells(this.isStartSundayVal, currentMonth, this.value);
        this.changeDetectorRef.markForCheck();
      }
    } else if (GlnCalendarUtil.VIEW_YEAR === newView) {
      const yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(this.calendarYearLast + 1, this.yearsPerPage);
      if (yearStart !== -1) {
        this.updateViewYearCells(this.yearsPerPage, new Date(yearStart, 0, 1, 0, 0, 0, 0), this.value);
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  // -- Methods for the mode "view year" --

  public clickYearCell(year: number): void {
    console.log(`clickYearCell(${year})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || GlnCalendarUtil.VIEW_YEAR !== this.viewMode) {
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
  public keydownYearCellList(event: KeyboardEvent, elementRef: HTMLDivElement, yearFirst: number, yearsPerPage: number): void {
    console.log(``); // #
    console.log(`$$ keydownYearCell()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (GlnCalendarUtil.VIEW_YEAR !== this.viewMode || this.markedYear == null) {
      return;
    }
    let delta: number = 0;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : yearsPerPage;
    const deltaUpDown: number = !this.isHorizontVal ? -yearsPerPage : -1;
    delta = 'ArrowRight' === event.key ? deltaRightLeft : 'ArrowLeft' === event.key ? -deltaRightLeft : delta;
    delta = 'ArrowUp' === event.key ? deltaUpDown : 'ArrowDown' === event.key ? -deltaUpDown : delta;
    console.log(`$$ keydownYearCell(); delta: ${delta} elementRef${elementRef != null ? '!' : ''}=null key: ${event.key}`); // #
    console.log(`$$ keydownYearCell(); markedYear='${this.markedYear}'`); // #
    console.log(`$$ keydownYearCell(); yearFirst=${yearFirst} yearLast=${yearFirst + yearsPerPage - 1}`); // #
    if (delta != 0) {
      const newMarkedYear: number = this.markedYear + delta;
      const currElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, this.markedYear.toString());
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
      this.markedYear = newMarkedYear;
      console.log(`$$ keydownYearCell();new markedYear='${this.markedYear}'`); // #
      let isZoneOnStable: boolean = false;
      const yearLast: number = yearFirst + yearsPerPage - 1;
      if (newMarkedYear < yearFirst) {
        console.log(`$$ keydownYearCell; clickPrev(VIEW_YEAR);`); // #
        this.clickPrev(GlnCalendarUtil.VIEW_YEAR);
        isZoneOnStable = true;
      } else if (yearLast < newMarkedYear) {
        console.log(`$$ keydownYearCell; clickNext(VIEW_YEAR);`); // #
        this.clickNext(GlnCalendarUtil.VIEW_YEAR);
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
    if (this.isDisabledVal || this.isReadOnlyVal || GlnCalendarUtil.VIEW_MONTH !== this.viewMode) {
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
    if (this.viewMode !== GlnCalendarUtil.VIEW_DAY || this.markedDate == null) {
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
        console.log(`@@ keydownDayCell(); clickPrev(VIEW_MONTH);`); // #
        this.clickPrev(GlnCalendarUtil.VIEW_MONTH);
        isZoneOnStable = true;
      } else if (DateUtil.compare(dateEnd, newMarkedDate) === 1) {
        console.log(`@@ keydownDayCell(); clickNext(VIEW_MONTH);`); // #
        this.clickNext(GlnCalendarUtil.VIEW_MONTH);
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
  private updateViewYearCells(yearsPerPage: number, startDate: Date | null, selected: Date | null | undefined): void {
    const today: Date = new Date();
    this.todaysYear = today.getFullYear();
    this.calendarYearSelected = selected?.getFullYear() || this.todaysYear;
    this.calendarYearCurrent = this.todaysYear;

    const initDate: Date = this.currentDate(startDate, selected, new Date());
    let yearStart: number = GlnCalendarUtil.getFirstYearOfPeriod(initDate.getFullYear(), yearsPerPage);
    if (yearStart === -1) {
      yearStart = GlnCalendarUtil.getFirstYearOfPeriod((selected || today).getFullYear(), yearsPerPage);
    }
    this.calendarYearCellList = GlnCalendarUtil.getYearCellList(yearStart, yearsPerPage);
    this.calendarYearFirst = yearStart;
    this.calendarYearLast = yearStart + yearsPerPage - 1;

    this.markedYear = selected?.getFullYear() || today.getFullYear();
  }
  private updateViewYearPeriodLimits(yearsPerPage: number, yearPeriodMin: number, yearPeriodMax: number): void {
    this.YEAR_PERIOD_MIN = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMin, yearsPerPage);
    this.YEAR_PERIOD_MAX = GlnCalendarUtil.getFirstYearOfPeriod(yearPeriodMax - yearsPerPage, yearsPerPage) + yearsPerPage - 1;
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
  }
  private updateViewDayHeader(isStartSunday: boolean | null, sizeDayWeek: number | null): void {
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    const sizeDayWeekVal: number = sizeDayWeek || WEEKDAY_NUM_DEFAULT;
    this.calendarDayNameList = GlnCalendarUtil.getDayNameList(sizeDayWeekVal, dayStartWeek);
  }
  private updateViewDayCells(isStartSunday: boolean | null, currentMonth: Date, selected: Date | null | undefined): void {
    const today: Date = new Date();
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    this.calendarDayCellRowList = GlnCalendarUtil.getDayCellRowList(selected || null, dayStartWeek, currentMonth, today);
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

  private getPercentage(total: number, value: number): number | null {
    let result: number = (total / value) * 100;
    const residue: number = result % 10;
    result = Math.round(result) / 100;
    return result - (residue > 0 ? 0.01 : 0.0);
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
  private setCssColsByYears(colsByYears: number, elem: ElementRef<HTMLElement>): void {
    const yearWd: number | null = 0 < colsByYears && colsByYears < 11 ? this.getPercentage(100, colsByYears) : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_YEAR_WRAP_WD, yearWd?.toString()?.concat('%'));
  }
  private setCssRowsByYears(rowsByYears: number, elem: ElementRef<HTMLElement>): void {
    const yearHg: number | null = 0 < rowsByYears && rowsByYears < 11 ? this.getPercentage(100, rowsByYears) : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_YEAR_WRAP_HG, yearHg?.toString()?.concat('%'));
  }
  private setCssColsRowsByMonths(colsByMonths: number, rowsByMonths: number, elem: ElementRef<HTMLElement>): void {
    const monthWd: number | null = 0 < colsByMonths && colsByMonths < 13 ? this.getPercentage(100, colsByMonths) : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MONTH_WRAP_WD, monthWd?.toString()?.concat('%'));
    const monthHg: number | null = 0 < rowsByMonths && rowsByMonths < 13 ? this.getPercentage(100, rowsByMonths) : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_MONTH_WRAP_HG, monthHg?.toString()?.concat('%'));
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
