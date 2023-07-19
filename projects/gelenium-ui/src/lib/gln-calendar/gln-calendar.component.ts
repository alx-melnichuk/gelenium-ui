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
import { StringUtil } from '../_utils/string.util';

import {
  CALENDAR_PERIOD_MONTH,
  CALENDAR_PERIOD_YEAR,
  CALENDAR_PERIOD_YEARS,
  CALENDAR_TINT_ACTIVE,
  CALENDAR_TINT_PASSIVE,
  CALENDAR_TINT_SELECTED,
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_YEAR,
  CALENDAR_YEAR_MAX,
  CALENDAR_YEAR_MIN,
  CalendarDayCell,
  CalendarDayCellRow,
  CalendarDayName,
  CalendarMonthCell,
  GlnCalendarUtil,
} from './gln-calendar.util';
import { GlnCalendarConfig } from './gln-calendar-config.interface';

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const CSS_PROP_CELL_SIZE = '--glncn--item-size';
const CSS_PROP_YEAR_WRAP_WD = '--glncn--year-wrapper-wd';
const CSS_PROP_YEAR_WRAP_HG = '--glncn--year-wrapper-hg';
const CSS_PROP_MONTH_WRAP_WD = '--glncn--month-wrapper-wd';
const CSS_PROP_MONTH_WRAP_HG = '--glncn--month-wrapper-hg';

const WEEKDAY_NUM_DEFAULT = 2;
const MONTH_FORMAT_DEFAULT = 'long';
const YEAR_MIN = CALENDAR_YEAR_MIN;
const YEAR_MAX = CALENDAR_YEAR_MAX;

export interface GlnCalendarChange {
  date: Date;
  year: number;
  month: number;
  day: number;
}

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
  public formatMonth: string | null | undefined; // 'numeric'(6),'2-digit'(06),'long'(June),'short'(Jun),'narrow'(J)
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
  public locale: string | null | undefined; // Locale ('en-US', 'de-DE', 'fr-FR')
  @Input()
  public maxDate: Date | null | undefined; // The maximum selectable date.
  @Input()
  public minDate: Date | null | undefined; // The minimum selectable date.
  @Input()
  public rowsByYears: number | string | null | undefined; // [1 - 12] default 5
  @Input()
  public sizeDayWeek: number | string | null | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  @Input()
  public startDate: Date | null | undefined; // # TODO ?? no example
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
  @Output()
  readonly change2: EventEmitter<Date | null> = new EventEmitter();
  @Output() // Emits selected month from the list. This does not mean that the selected date has changed.
  readonly monthSelected: EventEmitter<GlnCalendarChange> = new EventEmitter();
  @Output() // Emits selected year from the list. This does not mean that the selected date has changed.
  readonly yearSelected: EventEmitter<GlnCalendarChange> = new EventEmitter();

  @ViewChild('dayInfoRowListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public dayInfoRowListRef: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('yearCellListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public yearCellListRef: ElementRef<HTMLDivElement> | undefined;

  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public colsByYearsVal: number | null = null; // Binding attribute "colsByYears".
  public colsByMonthsVal: number | null = null; // Binding attribute "colsByMonths".
  public currConfig: GlnCalendarConfig;
  public currDate: Date = new Date();
  public currMonthStr: string = '';
  public currYear: number = -1;
  public errors: ValidationErrors | null = null;
  public formatByMonthsVal: string | null = null; // Binding attribute "formatByMonths".
  public formatMonthVal: string | null = null; // Binding attribute "formatMonth".
  public frameDayCellRows: CalendarDayCellRow[] = [];
  public frameDayNames: CalendarDayName[] = [];
  public frameMonthCells: CalendarMonthCell[] = [];
  public frameYearCells: number[] = [];
  public frameYearCurrYear: number | null = null;
  public frameYearFinish: number = -1;
  public frameYearMaxDate: number | null = null;
  public frameYearMinDate: number | null = null;
  public frameYearStart: number = -1;
  public frameYearValue: number = -1;
  public frameYearToday: number = -1;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isStartSundayVal: boolean | null = null; // Binding attribute "isStartSunday".
  public isTwoDigitDayVal: boolean | null = null; // Binding attribute "isTwoDigitDay".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public localeVal: string | null = null; // Binding attribute "locale".
  public markedDate: Date | null = null;
  public markedYear: number | null = null;
  public rowsByYearsVal: number | null = null; // Binding attribute "rowsByYears".
  public rowsByMonthsVal: number | null = null;
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public STATE_ACT: string = CALENDAR_TINT_ACTIVE;
  public STATE_PSV: string = CALENDAR_TINT_PASSIVE;
  public STATE_SLCT: string = CALENDAR_TINT_SELECTED;
  public VIEW_DAY: string = CALENDAR_VIEW_DAY;
  public VIEW_MONTH: string = CALENDAR_VIEW_MONTH;
  public VIEW_YEAR: string = CALENDAR_VIEW_YEAR;
  public viewMode: string = CALENDAR_VIEW_DAY;
  public viewVal: string | null = null; // Binding attribute "view".
  public viewsVal: string[] = []; // Binding attribute "views".
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
    let hasFormatMonth: boolean = false;
    let hasIsStartSunday: boolean = false;
    let hasLocale: boolean = false;
    let hasMinDateOrMaxDate: boolean = false;
    let hasSizeDayWeek: boolean = false;
    let hasStartDate: boolean = false;
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
    if (changes['formatMonth'] || ChangeUtil.check(changes['config'], 'formatMonth')) {
      this.formatMonthVal = this.formatMonth || this.currConfig.formatMonth || '';
      hasFormatMonth = true;
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
    if (changes['locale'] || ChangeUtil.check(changes['config'], 'locale')) {
      this.localeVal = this.locale || this.currConfig.locale || '';
      hasLocale = true;
    }
    if (!!changes['maxDate']) {
      this.frameYearMaxDate = this.maxDate?.getFullYear() || null;
      this.log(`OnChange(); frameYearMaxDate=${this.frameYearMaxDate}`); // #
      hasMinDateOrMaxDate = true;
    }
    if (!!changes['minDate']) {
      this.frameYearMinDate = this.minDate?.getFullYear() || null;
      this.log(`OnChange(); frameYearMinDate=${this.frameYearMinDate}`); // #
      this.log(`OnChange(); minDate?.Year=${this.minDate?.getFullYear() || null} minDate?.Month=${this.minDate?.getMonth()}`); // #
      this.log(`OnChange(); maxDate?.Year=${this.maxDate?.getFullYear() || null} maxDate?.Month=${this.maxDate?.getMonth()}`); // #
      hasMinDateOrMaxDate = true;
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
      this.markedDate = this.value || new Date();
      this.log(`OnChange(); value=${this.value != null ? this.value.toString().substring(4, 31) : 'null'}`);
      this.frameYearValue = this.value?.getFullYear() || -1;
    }
    if (!!changes['views'] || ChangeUtil.check(changes['config'], 'views')) {
      const viewsInput: string[] = GlnCalendarUtil.checkViews(this.views);
      const viewsConfig: string[] = GlnCalendarUtil.checkViews(this.currConfig.views);
      this.viewsVal.push(...(!!viewsInput.length ? viewsInput : !!viewsConfig.length ? viewsConfig : GlnCalendarUtil.getViewModes()));
      if (this.viewsVal.length > 0 && this.viewsVal.indexOf(this.viewMode) === -1) {
        this.viewMode = this.viewsVal[0];
      }
    }

    if (hasIsStartSunday || hasLocale || hasSizeDayWeek) {
      this.log(`OnChange(); updateViewDayHeader();`); // #
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal, this.localeVal);
    }
    const todayDate: Date = new Date();
    const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);
    const date: Date = new Date(/*this.startDateVal || */ this.value || today);
    const current: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

    if (hasFormatMonth || hasLocale || changes['value']) {
      this.log(`OnChange(); updateViewCurrent();`); // #
      this.updateViewCurrent(current, this.formatMonthVal, this.localeVal);
    }
    if (hasIsStartSunday || hasMinDateOrMaxDate || changes['value']) {
      this.log(`OnChange(); updateViewDayCells();`); // #
      this.updateViewDayCells(current, this.value || null, today, this.minDate, this.maxDate, this.isStartSundayVal);
    }
    if (hasFormatByMonths || hasMinDateOrMaxDate || hasLocale || changes['value']) {
      this.log(`OnChange(); updateViewMonthCells();`); // #
      this.updateViewMonthCells(current, this.value || null, today, this.minDate, this.maxDate, this.localeVal, this.formatByMonthsVal);
    }
    if ((hasYearsPerPage || hasMinDateOrMaxDate) && this.yearsPerPage > -1) {
      this.log(`OnChange(); updateViewYearStartFinish();`); // #
      this.updateViewYearStartFinish(this.yearsPerPage, this.frameYearMinDate || YEAR_MIN, this.frameYearMaxDate || YEAR_MAX);
    }
    if ((hasYearsPerPage || hasMinDateOrMaxDate || changes['value']) && this.yearsPerPage > -1) {
      const yearCurr: number = current.getFullYear();
      const year: number = GlnCalendarUtil.getYearCurrInLimits(this.frameYearStart, this.frameYearFinish, yearCurr, this.yearsPerPage);
      this.log(`OnChange(); updateViewYearCells();`); // #
      this.updateViewYearCells(this.yearsPerPage, year);
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
      this.formatByMonthsVal = this.currConfig.formatByMonths || null;
    }
    if (this.formatMonthVal == null) {
      this.formatMonthVal = this.currConfig.formatMonth || '';
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
    if (this.localeVal == null) {
      this.localeVal = this.currConfig.locale || '';
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

    if (this.frameDayNames.length === 0) {
      this.log(`OnInit(); updateViewDayHeader();`); // #
      this.updateViewDayHeader(this.isStartSundayVal, this.sizeDayWeekVal, this.localeVal);
    }
    const todayDate: Date = new Date();
    const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);
    const date: Date = new Date(/*this.startDateVal || */ this.value || today);
    const current: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

    if (!this.currMonthStr) {
      this.log(`OnInit(); updateViewCurrent();`); // #
      this.updateViewCurrent(current, this.formatMonthVal, this.localeVal);
    }
    if (this.frameDayCellRows.length === 0) {
      this.log(`OnInit(); updateViewDayCells();`); // #
      this.updateViewDayCells(current, this.value || null, today, this.minDate, this.maxDate, this.isStartSundayVal);
    }
    if (this.frameMonthCells.length === 0) {
      this.log(`OnInit(); updateViewMonthCells();`); // #
      this.updateViewMonthCells(current, this.value || null, today, this.minDate, this.maxDate, this.localeVal, this.formatByMonthsVal);
    }
    if ((this.frameYearStart === -1 || this.frameYearFinish === -1) && this.yearsPerPage > -1) {
      this.log(`OnInit(); updateViewYearStartFinish();`); // #
      this.updateViewYearStartFinish(this.yearsPerPage, this.frameYearMinDate || YEAR_MIN, this.frameYearMaxDate || YEAR_MAX);
    }
    if (this.frameYearCells.length === 0 && this.yearsPerPage > -1) {
      const yearCurr: number = current.getFullYear();
      const year: number = GlnCalendarUtil.getYearCurrInLimits(this.frameYearStart, this.frameYearFinish, yearCurr, this.yearsPerPage);
      this.log(`OnInit(); updateViewYearCells();`); // #
      this.updateViewYearCells(this.yearsPerPage, year);
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
  public trackByMonthCell(index: number, monthCell: CalendarMonthCell) {
    return monthCell.month;
  }
  public isEmpty(): boolean {
    return this.value == null;
  }
  public getPeriodByViewMode(viewMode: string): string {
    let result: string = '';
    result = viewMode === CALENDAR_VIEW_DAY ? CALENDAR_PERIOD_MONTH : result;
    result = viewMode === CALENDAR_VIEW_MONTH ? CALENDAR_PERIOD_YEAR : result;
    result = viewMode === CALENDAR_VIEW_YEAR ? CALENDAR_PERIOD_YEARS : result;
    return result;
  }
  public isEnabledPrev(): boolean {
    let result: boolean = false;
    if (this.viewMode === CALENDAR_VIEW_DAY) {
      result = this.minDate == null || GlnCalendarUtil.compareYearMonthByDate(this.currYear, this.currDate.getMonth(), this.minDate) > 0;
    } else if (this.viewMode === CALENDAR_VIEW_MONTH) {
      result = this.minDate == null || this.minDate.getFullYear() < this.currYear;
    }
    return result;
  }
  public isEnabledNext(): boolean {
    let result: boolean = false;
    if (this.viewMode === CALENDAR_VIEW_DAY) {
      result = this.maxDate == null || GlnCalendarUtil.compareYearMonthByDate(this.currYear, this.currDate.getMonth(), this.maxDate) < 0;
    } else if (this.viewMode === CALENDAR_VIEW_MONTH) {
      result = this.maxDate == null || this.currYear < this.maxDate.getFullYear();
    }
    return result;
  }

  public isEnabledPrevViewYear(): boolean {
    this.log(`isEnabledPrevViewYear(${this.frameYearStart} < ${this.frameYearCells[0]})=${this.frameYearStart < this.frameYearCells[0]}`); // #
    return this.frameYearStart < this.frameYearCells[0];
  }
  public isEnabledNextViewYear(): boolean {
    this.log(
      `isEnabledNextViewYear(${this.frameYearCells[this.frameYearCells.length - 1]} < ${this.frameYearFinish})`,
      `=${this.frameYearCells[this.frameYearCells.length - 1] < this.frameYearFinish}`
    ); // #
    return this.frameYearCells[this.frameYearCells.length - 1] < this.frameYearFinish;
  }

  public switchViewMode(): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal && this.viewsVal.length > 1) {
      this.viewMode = GlnCalendarUtil.getNextView(this.viewsVal, this.viewMode);
    }
  }
  /** Transition to the previous period. */
  public prevPeriod(period: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    this.changePeriod(period, false);
  }
  /** Transition to the next period. */
  public nextPeriod(period: string): void {
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    this.changePeriod(period, true);
  }

  // -- Methods for the mode "view year" --

  public clickYearCell(year: number): void {
    this.log(`clickYearCell(${year})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || CALENDAR_VIEW_YEAR !== this.viewMode) {
      return;
    }
    const firstYear: number = this.frameYearCells.at(0) || -1;
    const lastYear: number = this.frameYearCells.at(-1) || -1;
    if (firstYear > 0 && lastYear > 0 && firstYear <= year && year <= lastYear) {
      const yearValue: number = this.value?.getFullYear() || -1;
      if (year !== yearValue) {
        this.frameYearCurrYear = year;
        const date: Date = new Date(year, 0, 1, 0, 0, 0, 0);
        this.yearSelected.emit({ date, year, month: 0, day: 1 });
        this.log(` yearSelected.emit("${date.toString().substring(4, 31)}");`);
      }
      this.switchViewMode();
    }
  }
  public keydownYearCellList(event: KeyboardEvent, elementRef: HTMLDivElement, yearFirst: number, yearsPerPage: number): void {
    this.log(``); // #
    this.log(`$$ keydownYearCell()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (CALENDAR_VIEW_YEAR !== this.viewMode || this.markedYear == null) {
      return;
    }
    let delta: number = 0;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : yearsPerPage;
    const deltaUpDown: number = !this.isHorizontVal ? -yearsPerPage : -1;
    delta = 'ArrowRight' === event.key ? deltaRightLeft : 'ArrowLeft' === event.key ? -deltaRightLeft : delta;
    delta = 'ArrowUp' === event.key ? deltaUpDown : 'ArrowDown' === event.key ? -deltaUpDown : delta;
    this.log(`$$ keydownYearCell(); delta: ${delta} elementRef${elementRef != null ? '!' : ''}=null key: ${event.key}`); // #
    this.log(`$$ keydownYearCell(); markedYear='${this.markedYear}'`); // #
    this.log(`$$ keydownYearCell(); yearFirst=${yearFirst} yearLast=${yearFirst + yearsPerPage - 1}`); // #
    if (delta != 0) {
      const newMarkedYear: number = this.markedYear + delta;
      const currElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, this.markedYear.toString());
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
      this.markedYear = newMarkedYear;
      this.log(`$$ keydownYearCell();new markedYear='${this.markedYear}'`); // #
      let isZoneOnStable: boolean = false;
      const yearLast: number = yearFirst + yearsPerPage - 1;
      if (newMarkedYear < yearFirst) {
        this.log(`$$ keydownYearCell; clickPrev (VIEW_YEAR);`); // #
        // this.clickPrev (CALENDAR_VIEW_YEAR);
        isZoneOnStable = true;
      } else if (yearLast < newMarkedYear) {
        this.log(`$$ keydownYearCell; clickNext (VIEW_YEAR);`); // #
        // this.clickNext (CALENDAR_VIEW_YEAR);
        isZoneOnStable = true;
      } else {
        this.log(`$$ keydownYearCell(); 1moveFocusToAnotherElement(${newMarkedYear});`); // #
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
    this.log(`clickMonthCell(${month})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || CALENDAR_VIEW_MONTH !== this.viewMode) {
      return;
    }
    const monthValue: number = this.value?.getMonth() || -1;
    const yearValue: number = this.value?.getFullYear() || -1;
    if (-1 < month && month < 12 && (month !== monthValue || this.currYear !== yearValue)) {
      if (month !== monthValue) {
        const year: number = this.currYear;
        const date: Date = new Date(year, month, 1, 0, 0, 0, 0);
        this.monthSelected.emit({ date, year, month, day: 1 });
        this.log(`monthSelected.emit("${date.toString().substring(4, 31)}");`);
      }
      this.switchViewMode();
    }
  }
  // -- Methods for the mode "view day" --
  public clickSelectItem(cell: CalendarDayCell | null): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal && !!cell) {
      const newValue: Date | null = cell == null ? null : new Date(cell.year, cell.month, cell.day, 0, 0, 0, 0);
      if (!DateUtil.equality(this.value, newValue)) {
        this.change.emit(newValue);
        const date: Date = new Date(cell.year, cell.month, cell.day, 0, 0, 0, 0);
        this.change2.emit(date);
        this.log(`   change2.emit("${date.toString().substring(4, 31)}");`);
      } else {
        this.markedDate = newValue;
      }
    }
  }
  public keydownDayCellRowList(event: KeyboardEvent, elementRef: HTMLDivElement): void {
    this.log(``); // #
    this.log(`@@ keydownDayCellRowList()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.viewMode !== CALENDAR_VIEW_DAY || this.markedDate == null) {
      return;
    }
    let delta: number = 0;
    const deltaRightLeft: number = !this.isHorizontVal ? 1 : 7;
    const deltaUpDown: number = !this.isHorizontVal ? -7 : -1;
    delta = 'ArrowRight' === event.key ? deltaRightLeft : 'ArrowLeft' === event.key ? -deltaRightLeft : delta;
    delta = 'ArrowUp' === event.key ? deltaUpDown : 'ArrowDown' === event.key ? -deltaUpDown : delta;
    this.log(`@@ keydownDayCell(); delta: ${delta} elementRef${elementRef != null ? '!' : ''}=null key: ${event.key}`); // #
    this.log(`@@ keydownDayCell(); markedDate='${GlnCalendarUtil.getLabelByDate(this.markedDate)}'`); // #
    this.log(`@@ keydownDayCell(); currDate=${this.currDate.toDateString().substring(4)}`); // #
    if (delta != 0) {
      const newMarkedDate: Date = DateUtil.addDay(this.markedDate, delta);
      const currElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
      HtmlElemUtil.setAttr(this.renderer, HtmlElemUtil.getElementRef(currElem), 'tabindex', '-1');
      this.markedDate = newMarkedDate;
      this.log(`@@ keydownDayCell();new markedDate='${GlnCalendarUtil.getLabelByDate(this.markedDate)}'`); // #
      let isZoneOnStable: boolean = false;
      const year: number = this.currDate.getFullYear();
      const month: number = this.currDate.getMonth();
      const dateBegin: Date = new Date(year, month, 1, 0, 0, 0, 0);
      const dateEnd: Date = DateUtil.addDay(new Date(year, month + 1, 1, 0, 0, 0, 0), -1);
      // TODO change compare
      if (DateUtil.compare(newMarkedDate, dateBegin) < 0) {
        this.log(`@@ keydownDayCell(); clickPrev (VIEW_MONTH);`); // #
        // this.clickPrev (CALENDAR_VIEW_MONTH);
        isZoneOnStable = true;
      } else if (DateUtil.compare(dateEnd, newMarkedDate) < 0) {
        this.log(`@@ keydownDayCell(); clickNext (VIEW_MONTH);`); // #
        // this.clickNext (CALENDAR_VIEW_MONTH);
        isZoneOnStable = true;
      } else {
        this.log(`@@ keydownDayCell(); 1moveFocusToAnotherElement(${GlnCalendarUtil.getLabelByDate(newMarkedDate) || ''});`); // #
        this.moveFocusToAnotherElement(elementRef, GlnCalendarUtil.getLabelByDate(newMarkedDate) || '');
      }

      if (isZoneOnStable) {
        // Update the position once the zone is stable so that the component will be fully rendered.
        this.ngZone.onStable.pipe(first()).subscribe(() => {
          this.log(`@@ keydownDayCell(); 2moveFocusToAnotherElement(${GlnCalendarUtil.getLabelByDate(newMarkedDate) || ''});`); // #
          this.moveFocusToAnotherElement(elementRef, GlnCalendarUtil.getLabelByDate(newMarkedDate) || '');
        });
      }
    } else if (' ' === event.key || 'Enter' === event.key) {
      const elem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, GlnCalendarUtil.getLabelByDate(this.markedDate));
      if (elem != null) {
        delta = 9;
        // ??this.change.emit(new Date(this.markedDate));
      }
    }
    if (delta != 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ** Private methods **

  // -- Methods for the mode: "view year", "view month", "view day" --
  private updateViewCurrent(currentDate: Date, formatMonth: string | null, locale: string | null): void {
    this.currYear = currentDate.getFullYear();
    this.currDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    const monthFormat = DateUtil.convertMonthFormat(formatMonth || MONTH_FORMAT_DEFAULT);
    let monthStr: string = '';
    try {
      // Get the name of the month for the specified date.
      monthStr = DateUtil.formatDateTime(this.currDate, { month: monthFormat }, locale || undefined);
    } catch (e) {
      console.error(e);
      monthStr = DateUtil.formatDateTime(this.currDate, { month: monthFormat }, undefined);
    }
    this.currMonthStr = StringUtil.camelize(monthStr);
    this.log(`updateViewCurrent();   currDate="${this.currDate.toString().substring(4, 31)}"`); // #
  }
  // -- Methods for the mode "view year" --
  private updateViewYearStartFinish(yearsPerPage: number, yearMin: number, yearMax: number): void {
    if (yearsPerPage > 0 && yearMin > 0 && yearMax > 0) {
      const limit = GlnCalendarUtil.getPeriodLimits(this.yearsPerPage, yearMin, yearMax);
      this.frameYearStart = limit.start;
      this.frameYearFinish = limit.finish;
      this.log(`updateViewYearStartFinish(); frameYearStart=${this.frameYearStart}`); // #
      this.log(`updateViewYearStartFinish(); frameYearFinish=${this.frameYearFinish}`); // #
    }
  }
  private updateViewYearCells(yearsPerPage: number, yearPeriodMin: number): void {
    if (yearsPerPage > 0 && yearPeriodMin > 0) {
      this.frameYearCells = GlnCalendarUtil.getYearCellList(yearPeriodMin, yearsPerPage);
      this.log(`updateViewYearCells(); yearPeriodMin=${yearPeriodMin} yearPeriodMax=${yearPeriodMin + yearsPerPage - 1}`); // #
    }
  }
  // -- Methods for the mode "view month" --
  private updateViewMonthCells(
    current: Date,
    selected: Date | null,
    today: Date,
    minDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    locale: string | null,
    formatByMonths: string | null
  ): void {
    this.frameMonthCells = GlnCalendarUtil.getMonthCellList(current, selected, today, minDate, maxDate, locale, formatByMonths);
    const currentStr = current.toString().substring(4, 31);
    const selectedStr = !!selected ? selected.toString().substring(4, 31) : 'null';
    this.log(`updateViewMonthCells(); current="${currentStr}", selected="${selectedStr}"`); // #
  }

  // -- Methods for the mode "view day" --
  private updateViewDayHeader(isStartSunday: boolean | null, sizeDayWeek: number | null, locale: string | null): void {
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    const sizeDayWeekVal: number = sizeDayWeek || WEEKDAY_NUM_DEFAULT;
    this.frameDayNames = GlnCalendarUtil.getDayNameList(sizeDayWeekVal, dayStartWeek, locale);
  }
  private updateViewDayCells(
    current: Date,
    selected: Date | null,
    today: Date,
    minDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    isStartSunday: boolean | null
  ): void {
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    this.frameDayCellRows = GlnCalendarUtil.getDayCellRowList(current, selected, today, minDate, maxDate, dayStartWeek);
  }
  // -- --
  /** Transition to the next or previous period.
   * @param period: string;  // 'period_month' - previous month (view = 'day');
   *                         // 'period_year'  - previous year (view = 'month');
   *                         // 'period_years' - previous years (view = 'year');
   * @param isNext: boolean; // true - next period; false - previous period;
   */
  private changePeriod(period: string, isNext: boolean): void {
    let currYear: number = this.currDate.getFullYear();
    let currMonth: number = this.currDate.getMonth();
    let isCompareMonth: boolean = false;
    if (CALENDAR_PERIOD_MONTH === period) {
      currMonth = currMonth + (isNext ? 1 : -1);
      isCompareMonth = true;
    } else if (CALENDAR_PERIOD_YEAR === period) {
      currYear = currYear + (isNext ? 1 : -1);
    }
    const todayDate: Date = new Date();
    const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);

    // const current: Date = new Date(currYear, currMonth, this.currDate.getDate(), 0, 0, 0, 0);
    const current: Date = GlnCalendarUtil.getDateByItsDetails(currYear, currMonth, this.currDate.getDate());
    const year: number = current.getFullYear();
    const month: number = current.getMonth();

    let resultCompare: boolean = false;
    if (isNext) {
      resultCompare =
        this.maxDate == null ||
        (isCompareMonth ? GlnCalendarUtil.compareYearMonthByDate(year, month, this.maxDate) <= 0 : year <= this.maxDate.getFullYear());
    } else {
      resultCompare =
        this.minDate == null ||
        (isCompareMonth ? GlnCalendarUtil.compareYearMonthByDate(year, month, this.minDate) >= 0 : this.minDate.getFullYear() <= year);
    }

    if (resultCompare) {
      this.updateViewCurrent(current, this.formatMonthVal, this.localeVal);
      // Refresh the grid details of the days of the month.
      this.updateViewDayCells(current, this.value || null, today, this.minDate, this.maxDate, this.isStartSundayVal);
      // Refresh the details of the grid of months of the year.
      this.updateViewMonthCells(current, this.value || null, today, this.minDate, this.maxDate, this.localeVal, this.formatByMonthsVal);
    }
  }

  private moveFocusToAnotherElement(elementRef: HTMLDivElement, newMarkedLabel: string): void {
    const newElem: HTMLElement | null = GlnCalendarUtil.getElementByLabel(elementRef, newMarkedLabel);
    this.log(`moveFocusToAnotherElement(${newMarkedLabel}) newElem${newElem != null ? '!' : ''}=null`); // #
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
  private log(...arg: any): void {
    console.log(...arg);
  }
}
