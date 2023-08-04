import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { first } from 'rxjs/operators';

import { BooleanUtil } from '../_utils/boolean.util';
import { ChangeUtil } from '../_utils/change.util';
import { DateUtil } from '../_utils/date.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnCalendarCellClassesFun, GlnCalendarCellDisabledFun } from './gln-calendar.interface';
import {
  CALENDAR_PERIOD_MONTH,
  CALENDAR_PERIOD_YEAR,
  CALENDAR_PERIOD_YEARS,
  CALENDAR_TINT_ACTIVE,
  CALENDAR_TINT_PASSIVE,
  CALENDAR_TINT_SELECTED,
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_TYPE,
  CALENDAR_VIEW_YEAR,
  CALENDAR_WEEKDAY_NUM_DEFAULT,
  CalendarCell,
  CalendarDayCellRow,
  CalendarDayName,
  CalendarViewParams,
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
  public dateClasses: GlnCalendarCellClassesFun | undefined;
  @Input()
  public dateDisabled: GlnCalendarCellDisabledFun | undefined;
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
  public locales: string | null | undefined; // Locales ('en-US', 'de-DE', 'fr-FR')
  @Input()
  public maxDate: Date | null | undefined;
  @Input()
  public minDate: Date | null | undefined;
  @Input()
  public rowsByYears: number | string | null | undefined; // [1 - 12] default 5
  @Input()
  public sizeDayWeek: number | string | null | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  @Input()
  public startDate: Date | null | undefined; // # TODO ?? no example
  @Input()
  public value: Date | null | undefined; // # TODO ?? no example
  @Input()
  public view: string | null | undefined; // 'day','month','year' default 'day'
  @Input()
  public views: string[] | null | undefined; // default ['day', 'year', 'month']
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly selected: EventEmitter<Date | null> = new EventEmitter();
  @Output() // Emits selected month from the list. This does not mean that the selected date has changed.
  readonly monthSelected: EventEmitter<Date> = new EventEmitter();
  @Output() // Emits selected year from the list. This does not mean that the selected date has changed.
  readonly yearSelected: EventEmitter<Date> = new EventEmitter();

  @ViewChild('dayInfoRowListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public dayInfoRowListRef: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('yearCellListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public yearCellListRef: ElementRef<HTMLDivElement> | undefined;

  public get markedDate(): Date {
    return this.currentDate;
  }
  public set markedDate(value: Date) {}
  public get activeView(): 'day' | 'month' | 'year' {
    return this.viewMode;
  }
  public set activeView(value: 'day' | 'month' | 'year') {}

  public cellSizeVal: number | null = null; // Binding attribute "cellSize".
  public colsByYearsVal: number | null = null; // Binding attribute "colsByYears".
  public colsByMonthsVal: number | null = null; // Binding attribute "colsByMonths".
  public dateClassesVal: GlnCalendarCellClassesFun | null = null; // Binding attribute "dateClasses".
  public dateDisabledVal: GlnCalendarCellDisabledFun | null = null; // Binding attribute "dateDisabled".
  public formatByMonthsVal: string | null = null; // Binding attribute "formatByMonths".
  public formatMonthVal: string | null = null; // Binding attribute "formatMonth".
  public frameDayCellRows: CalendarDayCellRow[] = [];
  public frameDayNames: CalendarDayName[] = [];
  public frameMonthCells: CalendarCell[] = [];
  public frameYearCells: CalendarCell[] = [];
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isHideDayoffVal: boolean | null = null; // Binding attribute "isHideDayoff".
  public isHideOldDaysVal: boolean | null = null; // Binding attribute "isHideOldDays".
  public isHorizontVal: boolean | null = null; // Binding attribute "isHorizont".
  public isNextMonthAvailable: boolean = false;
  public isNextYearAvailable: boolean = false;
  public isNextYearsAvailable: boolean = false;
  public isPrevMonthAvailable: boolean = false;
  public isPrevYearAvailable: boolean = false;
  public isPrevYearsAvailable: boolean = false;
  public isReadOnlyVal: boolean | null = null; // Binding attribute "isReadOnly".
  public isStartSundayVal: boolean | null = null; // Binding attribute "isStartSunday".
  public isTwoDigitDayVal: boolean | null = null; // Binding attribute "isTwoDigitDay".
  public isWeekNumberVal: boolean | null = null; // Binding attribute "isWeekNumber".
  public localesVal: string | null = null; // Binding attribute "locales".
  public maxDateVal: Date | null = null; // Binding attribute "maxDate".
  public minDateVal: Date | null = null; // Binding attribute "minDate".
  public rowsByYearsVal: number | null = null; // Binding attribute "rowsByYears".
  public rowsByMonthsVal: number | null = null;
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public viewVal: CALENDAR_VIEW_TYPE | null = null; // Binding attribute "view".
  public viewsVal: CALENDAR_VIEW_TYPE[] = []; // Binding attribute "views".

  private currConfig: GlnCalendarConfig;
  private currentDate: Date = new Date();
  private currentMonthStr: string = '';
  private currentYearStr: string = '';
  private frameYearFinish: number = -1;
  private frameYearStart: number = -1;
  private viewMode: CALENDAR_VIEW_TYPE = CALENDAR_VIEW_DAY;
  private yearsPerPage: number = -1;

  private get dayStartWeek(): number {
    return !this.isStartSundayVal ? DateUtil.getDayStartWeekByLocale() : 0;
  }
  private set dayStartWeek(value: number) {}

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Optional() @Inject(GLN_CALENDAR_CONFIG) private rootConfig: GlnCalendarConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-calendar');
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-control');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let hasDateClasses: boolean = false;
    let hasDateDisabled: boolean = false;
    let hasFormatByMonths: boolean = false;
    let hasFormatMonth: boolean = false;
    let hasIsStartSunday: boolean = false;
    let hasLocales: boolean = false;
    let hasMinOrMaxDate: boolean = false;
    let hasSizeDayWeek: boolean = false;
    let hasStartDate: boolean = false;
    let hasYearsPerPage: boolean = false;

    if (!!changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (!!changes['cellSize'] || ChangeUtil.check(changes['config'], 'cellSize')) {
      const cellSizeStr: string = (this.cellSize || this.currConfig.cellSize || '').toString();
      this.cellSizeVal = NumberUtil.converInt(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (!!changes['colsByYears'] || ChangeUtil.check(changes['config'], 'colsByYears')) {
      const colsByYearsVal: number = NumberUtil.converInt((this.colsByYears || this.currConfig.colsByYears || '').toString(), -1);
      this.colsByYearsVal = GlnCalendarUtil.getColsByYears(colsByYearsVal);
      this.yearsPerPage = this.colsByYearsVal * GlnCalendarUtil.getRowsByYears(this.rowsByYearsVal || -1);
      this.setCssColsByYears(this.colsByYearsVal, this.hostRef);
      hasYearsPerPage = true;
    }
    if (!!changes['colsByMonths'] || ChangeUtil.check(changes['config'], 'colsByMonths')) {
      const colsByMonthsVal: number = NumberUtil.converInt((this.colsByMonths || this.currConfig.colsByMonths || '').toString(), -1);
      this.colsByMonthsVal = GlnCalendarUtil.getColsByMonths(colsByMonthsVal);
      this.rowsByMonthsVal = GlnCalendarUtil.getRowsByMonthsByCols(this.colsByMonthsVal);
      this.setCssColsRowsByMonths(this.colsByMonthsVal, this.rowsByMonthsVal, this.hostRef);
    }
    if (!!changes['dateClasses'] || ChangeUtil.check(changes['config'], 'dateClasses')) {
      this.dateClassesVal = this.dateClasses || this.currConfig.dateClasses || null;
      hasDateClasses = true;
    }
    if (!!changes['dateDisabled'] || ChangeUtil.check(changes['config'], 'dateDisabled')) {
      this.dateDisabledVal = this.dateDisabled || this.currConfig.dateDisabled || null;
      hasDateDisabled = true;
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
    if (!!changes['locales'] || ChangeUtil.check(changes['config'], 'locales')) {
      this.localesVal = this.locales || this.currConfig.locales || '';
      hasLocales = true;
    }
    if (!!changes['maxDate'] || ChangeUtil.check(changes['config'], 'maxDate')) {
      this.maxDateVal = this.maxDate || this.currConfig.maxDate || null;
      hasMinOrMaxDate = true;
    }
    if (!!changes['minDate'] || ChangeUtil.check(changes['config'], 'minDate')) {
      this.minDateVal = this.minDate || this.currConfig.minDate || null;
      hasMinOrMaxDate = true;
    }
    if (!!changes['rowsByYears'] || ChangeUtil.check(changes['config'], 'rowsByYears')) {
      const rowsByYearsVal: number = NumberUtil.converInt((this.rowsByYears || this.currConfig.rowsByYears || '').toString(), -1);
      this.rowsByYearsVal = GlnCalendarUtil.getRowsByYears(rowsByYearsVal);
      this.yearsPerPage = GlnCalendarUtil.getColsByYears(this.colsByYearsVal || -1) * this.rowsByYearsVal;
      this.setCssRowsByYears(this.rowsByYearsVal, this.hostRef);
      hasYearsPerPage = true;
    }
    if (!!changes['sizeDayWeek'] || ChangeUtil.check(changes['config'], 'sizeDayWeek')) {
      const sizeDayWeekStr: string = (this.sizeDayWeek?.toString() || this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = GlnCalendarUtil.convertSizeDayWeek(sizeDayWeekStr, CALENDAR_WEEKDAY_NUM_DEFAULT);
      hasSizeDayWeek = true;
    }
    if (!!changes['startDate'] || ChangeUtil.check(changes['config'], 'startDate')) {
      this.startDateVal = this.startDate || this.currConfig.startDate || null;
      hasStartDate = true;
    }
    if (!!changes['views'] || ChangeUtil.check(changes['config'], 'views')) {
      const viewsInput: CALENDAR_VIEW_TYPE[] = GlnCalendarUtil.convertViews(this.views || []);
      const viewsConfig: CALENDAR_VIEW_TYPE[] = GlnCalendarUtil.convertViews(this.currConfig.views || []);
      this.viewsVal = !!viewsInput.length ? viewsInput : !!viewsConfig.length ? viewsConfig : GlnCalendarUtil.getViewModes();
      if (this.viewsVal.length > 0 && this.viewsVal.indexOf(this.viewMode) === -1 && this.viewMode != this.viewsVal[0]) {
        this.viewMode = this.viewsVal[0];
      }
    }
    if (!!changes['view'] || ChangeUtil.check(changes['config'], 'view')) {
      const viewVal = GlnCalendarUtil.convertView(this.view || '') || GlnCalendarUtil.convertView(this.currConfig.view || '');
      if (viewVal != null && this.viewsVal.length > 0 && this.viewsVal.indexOf(viewVal) > -1 && this.viewMode != viewVal) {
        this.viewVal = viewVal;
        this.viewMode = viewVal;
      }
    }

    if (hasIsStartSunday || hasLocales || hasSizeDayWeek) {
      this.log(`OnChange(); frameDayNames = getDayNameList();`); // #
      this.frameDayNames = GlnCalendarUtil.getDayNameList(this.sizeDayWeekVal, this.dayStartWeek, this.localesVal);
    }
    const todayDate: Date = new Date();
    const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);

    const viewParams: CalendarViewParams = {
      selected: this.value,
      minDate: this.minDateVal,
      maxDate: this.maxDateVal,
      locales: this.localesVal,
      dateClasses: this.dateClassesVal,
      dateDisabled: this.dateDisabledVal,
    };

    if (!!changes['value'] || hasStartDate || hasMinOrMaxDate || hasFormatMonth || hasLocales || hasStartDate) {
      this.log(`OnChange(); updateViewCurrent();`); // #
      const isFirstChange: boolean = changes[Object.keys(changes)[0]].firstChange;
      const date: Date = new Date(isFirstChange ? this.startDateVal || today : this.currentDate);
      const current: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      this.updateViewCurrentDate(current, viewParams, this.formatMonthVal);
    }
    const currentDate: Date = this.currentDate;

    if (!!changes['value'] || hasMinOrMaxDate || hasDateClasses || hasDateDisabled || hasIsStartSunday || hasStartDate) {
      this.log(`OnChange(); getDayCellRowList();`); // #
      this.frameDayCellRows = GlnCalendarUtil.getDayCellRowList(currentDate, viewParams, today, this.isStartSundayVal); // !!??
    }
    if (!!changes['value'] || hasMinOrMaxDate || hasDateClasses || hasDateDisabled || hasFormatByMonths || hasLocales || hasStartDate) {
      this.log(`OnChange(); getMonthCellList();`); // #
      this.frameMonthCells = GlnCalendarUtil.getMonthCellList(currentDate, viewParams, today, this.formatByMonthsVal);
    }
    if ((hasYearsPerPage || hasMinOrMaxDate) && this.yearsPerPage > -1) {
      this.log(`OnChange(); updateViewYearStartFinish();`); // #
      this.updateViewYearStartFinish(this.yearsPerPage, this.minDateVal?.getFullYear() || null, this.maxDateVal?.getFullYear() || null);
    }
    const isYearsPerPage: boolean = this.yearsPerPage > -1;
    if ((!!changes['value'] || hasMinOrMaxDate || hasDateClasses || hasDateDisabled || hasYearsPerPage || hasStartDate) && isYearsPerPage) {
      this.log(`OnChange(); updateViewYearCell();`); // #
      this.updateViewYearCell(currentDate, viewParams, today, this.frameYearStart, this.frameYearFinish, this.yearsPerPage);
    }
  }
  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.cellSizeVal == null) {
      const cellSizeStr: string = (this.currConfig.cellSize || '').toString();
      this.cellSizeVal = NumberUtil.converInt(cellSizeStr, CELL_SIZE[cellSizeStr] || CELL_SIZE['middle']);
      this.setCssCellSize(this.cellSizeVal, this.hostRef);
    }
    if (this.colsByYearsVal == null) {
      const colsByYearsVal: number = NumberUtil.converInt((this.currConfig.colsByYears || '').toString(), -1);
      this.colsByYearsVal = GlnCalendarUtil.getColsByYears(colsByYearsVal);
      this.yearsPerPage = this.colsByYearsVal * GlnCalendarUtil.getRowsByYears(this.rowsByYearsVal || -1);
      this.setCssColsByYears(this.colsByYearsVal, this.hostRef);
    }
    if (this.colsByMonthsVal == null) {
      const colsByMonthsVal: number = NumberUtil.converInt((this.currConfig.colsByMonths || '').toString(), -1);
      this.colsByMonthsVal = GlnCalendarUtil.getColsByMonths(colsByMonthsVal);
      this.rowsByMonthsVal = GlnCalendarUtil.getRowsByMonthsByCols(this.colsByMonthsVal);
      this.setCssColsRowsByMonths(this.colsByMonthsVal, this.rowsByMonthsVal, this.hostRef);
    }
    if (this.dateClassesVal == null) {
      this.dateClassesVal = this.currConfig.dateClasses || null;
    }
    if (this.dateDisabledVal == null) {
      this.dateDisabledVal = this.currConfig.dateDisabled || null;
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
    if (this.localesVal == null) {
      this.localesVal = this.currConfig.locales || '';
    }
    if (this.maxDateVal == null) {
      this.maxDateVal = this.currConfig.maxDate || null;
    }
    if (this.minDateVal == null) {
      this.minDateVal = this.currConfig.minDate || null;
    }
    if (this.rowsByYearsVal == null) {
      const rowsByYearsVal: number = NumberUtil.converInt((this.currConfig.rowsByYears || '').toString(), -1);
      this.rowsByYearsVal = GlnCalendarUtil.getRowsByYears(rowsByYearsVal);
      this.yearsPerPage = GlnCalendarUtil.getColsByYears(this.colsByYearsVal || -1) * this.rowsByYearsVal;
      this.setCssRowsByYears(this.rowsByYearsVal, this.hostRef);
    }
    if (this.sizeDayWeekVal == null) {
      const sizeDayWeekStr: string = (this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = GlnCalendarUtil.convertSizeDayWeek(sizeDayWeekStr, CALENDAR_WEEKDAY_NUM_DEFAULT);
    }
    if (this.startDateVal == null) {
      this.startDateVal = this.currConfig.startDate || null;
    }
    if (this.viewsVal.length === 0) {
      const viewsConfig: CALENDAR_VIEW_TYPE[] = GlnCalendarUtil.convertViews(this.currConfig.views || []);
      this.viewsVal = !!viewsConfig.length ? viewsConfig : GlnCalendarUtil.getViewModes();
      if (this.viewsVal.length > 0 && this.viewsVal.indexOf(this.viewMode) === -1) {
        this.viewMode = this.viewsVal[0];
      }
    }
    if (this.viewVal == null) {
      const viewVal = GlnCalendarUtil.convertView(this.view || '') || GlnCalendarUtil.convertView(this.currConfig.view || '');
      if (viewVal != null && this.viewsVal.length > 0 && this.viewsVal.indexOf(viewVal) > -1 && this.viewMode != viewVal) {
        this.viewVal = viewVal;
        this.viewMode = viewVal;
      }
    }

    if (this.frameDayNames.length === 0) {
      this.log(`OnInit(); frameDayNames = getDayNameList();`); // #
      this.frameDayNames = GlnCalendarUtil.getDayNameList(this.sizeDayWeekVal, this.dayStartWeek, this.localesVal);
    }
    const todayDate: Date = new Date();
    const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);

    const viewParams: CalendarViewParams = {
      selected: this.value,
      minDate: this.minDateVal,
      maxDate: this.maxDateVal,
      locales: this.localesVal,
      dateClasses: this.dateClassesVal,
      dateDisabled: this.dateDisabledVal,
    };

    if (!this.currentMonthStr) {
      this.log(`OnInit(); updateViewCurrent();`); // #
      const date: Date = new Date(this.startDateVal || today);
      const current: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      this.updateViewCurrentDate(current, viewParams, this.formatMonthVal);
    }
    const currentDate: Date = this.currentDate;

    if (this.frameDayCellRows.length === 0) {
      this.log(`OnInit();  getDayCellRowList();`); // #
      this.frameDayCellRows = GlnCalendarUtil.getDayCellRowList(currentDate, viewParams, today, this.isStartSundayVal);
    }
    if (this.frameMonthCells.length === 0) {
      this.log(`OnInit(); getMonthCellList();`); // #
      this.frameMonthCells = GlnCalendarUtil.getMonthCellList(currentDate, viewParams, today, this.formatByMonthsVal);
    }
    if ((this.frameYearStart === -1 || this.frameYearFinish === -1) && this.yearsPerPage > -1) {
      this.log(`OnInit(); updateViewYearStartFinish();`); // #
      this.updateViewYearStartFinish(this.yearsPerPage, this.minDateVal?.getFullYear() || null, this.maxDateVal?.getFullYear() || null);
    }
    if (this.frameYearCells.length === 0 && this.yearsPerPage > -1) {
      this.log(`OnInit(); updateViewYearCell();`); // #
      this.updateViewYearCell(currentDate, viewParams, today, this.frameYearStart, this.frameYearFinish, this.yearsPerPage);
    }
  }
  // ** Public methods **

  public trackByIndex(index: number): number {
    return index;
  }
  public trackByCell(index: number, cell: CalendarCell) {
    return cell.date.getTime();
  }
  public isEmpty(): boolean {
    return this.value == null;
  }
  public isViewModeDay(): boolean {
    return this.viewMode === CALENDAR_VIEW_DAY;
  }
  public isViewModeMonth(): boolean {
    return this.viewMode === CALENDAR_VIEW_MONTH;
  }
  public isViewModeYear(): boolean {
    return this.viewMode === CALENDAR_VIEW_YEAR;
  }
  public isStateActive(cell: CalendarCell): boolean {
    return CALENDAR_TINT_ACTIVE === cell.state;
  }
  public isStatePassive(cell: CalendarCell): boolean {
    return CALENDAR_TINT_PASSIVE === cell.state;
  }
  public isStateSelected(cell: CalendarCell): boolean {
    return CALENDAR_TINT_SELECTED === cell.state;
  }
  public getYearsPerPage(): number {
    return this.yearsPerPage;
  }
  public get2Digit(value: number): string {
    return NumberUtil.getDigit(value, 2);
  }
  public isDayoff(dayWeek: number): boolean {
    return dayWeek == 0 || dayWeek == 6;
  }
  public getPeriodByViewMode(): string {
    let result: string = '';
    result = this.viewMode === CALENDAR_VIEW_DAY ? CALENDAR_PERIOD_MONTH : result;
    result = this.viewMode === CALENDAR_VIEW_MONTH ? CALENDAR_PERIOD_YEAR : result;
    result = this.viewMode === CALENDAR_VIEW_YEAR ? CALENDAR_PERIOD_YEARS : result;
    return result;
  }
  public focus(): void {
    const labelMarkedDate: string | null = GlnCalendarUtil.getLabelByDate(this.currentDate);
    this.log(`@@ focus(); labelMarkedDate=${labelMarkedDate}`); // #
    if (!this.isDisabledVal && isPlatformBrowser(this.platformId) && !!labelMarkedDate) {
      const viewElement: HTMLDivElement | undefined = this.getElementRefCurrentView()?.nativeElement;
      const buttonElement: HTMLElement | null = GlnCalendarUtil.getElementByLabel(viewElement, labelMarkedDate);
      this.log(`@@ focus(); buttonElement${buttonElement != null ? '!' : ''}=null`); // #
      buttonElement?.focus();
    }
  }
  public getCaption(activeView: 'day' | 'month' | 'year' = this.viewMode): string {
    return activeView === CALENDAR_VIEW_DAY
      ? this.currentMonthStr + ' ' + this.currentYearStr
      : activeView === CALENDAR_VIEW_YEAR
      ? this.frameYearCells[0].label + ' - ' + this.frameYearCells[this.frameYearCells.length - 1].label
      : activeView === CALENDAR_VIEW_MONTH
      ? this.currentYearStr
      : '';
  }
  public switchViewMode(activeView: 'day' | 'month' | 'year' = this.viewMode): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal && this.viewsVal.length > 1) {
      this.viewMode = GlnCalendarUtil.getNextView(this.viewsVal, activeView);
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

  public clickYearCell(newYear: number): void {
    this.log(`clickYearCell(${newYear})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || CALENDAR_VIEW_YEAR !== this.viewMode) {
      return;
    }
    const firstYear: number = this.frameYearCells[0].value || -1;
    const lastYear: number = this.frameYearCells[this.frameYearCells.length - 1].value;
    if (firstYear > 0 && lastYear > 0 && firstYear <= newYear && newYear <= lastYear) {
      const yearValue: number = this.value?.getFullYear() || -1;
      if (newYear !== yearValue) {
        const date: Date = GlnCalendarUtil.getDateByItsDetails(newYear, this.currentDate.getMonth(), this.currentDate.getDate());
        this.yearSelected.emit(date);
        this.log(` yearSelected.emit("${date.toString().substring(4, 31)}");`);
        this.updateViewAllCells(date);
      }
      this.switchViewMode();
    }
  }
  public keydownYearCell(event: KeyboardEvent, incrementX: number, incrementY: number): void {
    this.log(``); // #
    this.log(`$$ keydownYearCell() key: ${event.key} data-label: ${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (this.viewMode !== CALENDAR_VIEW_YEAR || this.currentDate == null) {
      return;
    }
    let isStopPropagation: boolean = false;
    const deltaRightOrLeft: number = !this.isHorizontVal ? 1 : incrementY;
    const deltaUpOrDown: number = !this.isHorizontVal ? incrementX : 1;
    let delta: number = 0;
    delta = 'ArrowRight' === event.key ? deltaRightOrLeft : delta;
    delta = 'ArrowLeft' === event.key ? -deltaRightOrLeft : delta;
    delta = 'ArrowUp' === event.key ? -deltaUpOrDown : delta;
    delta = 'ArrowDown' === event.key ? deltaUpOrDown : delta;

    if (delta != 0) {
      this.log(`$$ keydownYearCell();  delta: ${delta} `); // #
      const newMarkedDate: Date = DateUtil.addYear(this.currentDate, delta);
      this.updateViewAllCells(newMarkedDate);
      this.changeDetectorRef.markForCheck();

      /** Transfer focus to the active cell after the microtask queue is empty. */
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        setTimeout(() => {
          this.focus();
        }, 200);
      });
      isStopPropagation = true;
    } else if (' ' === event.key || 'Enter' === event.key) {
      const date: Date = new Date(this.currentDate.getFullYear(), 0, 1, 0, 0, 0, 0);
      this.yearSelected.emit(date);
      isStopPropagation = true;
    }

    if (isStopPropagation) {
      // Cancel subsequent processing of the event.
      event.preventDefault();
      event.stopPropagation();
    }
  }
  // -- Methods for the mode "view month" --
  public clickMonthCell(newMonth: number): void {
    this.log(`clickMonthCell(${newMonth})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || CALENDAR_VIEW_MONTH !== this.viewMode) {
      return;
    }
    const year: number = this.currentDate.getFullYear();
    if (-1 < newMonth && newMonth < 12) {
      const monthValue: number = this.value?.getMonth() || -1;
      const yearValue: number = this.value?.getFullYear() || -1;
      if (newMonth !== monthValue || year !== yearValue) {
        const date: Date = GlnCalendarUtil.getDateByItsDetails(year, newMonth, this.currentDate.getDate());
        this.monthSelected.emit(date);
        this.log(`monthSelected.emit("${date.toString().substring(4, 31)}");`);
        this.updateViewAllCells(date);
      }
      this.switchViewMode();
    }
  }
  public keydownMonthCell(event: KeyboardEvent, incrementX: number, incrementY: number): void {
    this.log(``); // #
    this.log(`^^ keydownMonthCell() key: ${event.key} data-label: ${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (this.viewMode !== CALENDAR_VIEW_MONTH || this.currentDate == null) {
      return;
    }
    let isStopPropagation: boolean = false;
    const deltaRightOrLeft: number = !this.isHorizontVal ? 1 : incrementY;
    const deltaUpOrDown: number = !this.isHorizontVal ? incrementX : 1;
    let delta: number = 0;
    delta = 'ArrowRight' === event.key ? deltaRightOrLeft : delta;
    delta = 'ArrowLeft' === event.key ? -deltaRightOrLeft : delta;
    delta = 'ArrowUp' === event.key ? -deltaUpOrDown : delta;
    delta = 'ArrowDown' === event.key ? deltaUpOrDown : delta;

    if (delta != 0) {
      this.log(`^^ keydownMonthCell(); Month delta: ${delta}`); // #
      const newMarkedDate: Date = DateUtil.addMonth(this.currentDate, delta);
      this.updateViewAllCells(newMarkedDate);
      this.changeDetectorRef.markForCheck();

      /** Transfer focus to the active cell after the microtask queue is empty. */
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        setTimeout(() => {
          this.focus();
        }, 200);
      });
      isStopPropagation = true;
    } else if (' ' === event.key || 'Enter' === event.key) {
      const date: Date = new Date(this.currentDate.getFullYear(), 0, 1, 0, 0, 0, 0);
      this.monthSelected.emit(date);
      isStopPropagation = true;
    }

    if (isStopPropagation) {
      // Cancel subsequent processing of the event.
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // -- Methods for the mode "view day" --
  public clickSelectItem(cell: CalendarCell | null): void {
    if (!this.isDisabledVal && !this.isReadOnlyVal) {
      const result: Date | null = !!cell ? new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate(), 0, 0, 0, 0) : null;
      this.selected.emit(result);
      this.log(`   change.emit("${result?.toString().substring(4, 31) || 'null'}");`);
      this.updateViewAllCells(result || this.currentDate);
    }
  }
  public keydownDayCell(event: KeyboardEvent, incrementX: number, incrementY: number): void {
    this.log(``); // #
    this.log(`@@ keydownDayCell() key: ${event.key} data-label: ${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    if (this.isDisabledVal || this.isReadOnlyVal) {
      return;
    }
    if (this.viewMode !== CALENDAR_VIEW_DAY || this.currentDate == null) {
      return;
    }
    let isStopPropagation: boolean = false;
    const deltaRightOrLeft: number = !this.isHorizontVal ? 1 : incrementY;
    const deltaUpOrDown: number = !this.isHorizontVal ? incrementX : 1;
    let delta: number = 0;
    delta = 'ArrowRight' === event.key ? deltaRightOrLeft : delta;
    delta = 'ArrowLeft' === event.key ? -deltaRightOrLeft : delta;
    delta = 'ArrowUp' === event.key ? -deltaUpOrDown : delta;
    delta = 'ArrowDown' === event.key ? deltaUpOrDown : delta;

    if (delta != 0) {
      this.log(`@@ keydownDayCell(); delta: ${delta} `); // #
      const newMarkedDate: Date = DateUtil.addDay(this.currentDate, delta);
      this.updateViewAllCells(newMarkedDate);
      this.changeDetectorRef.markForCheck();

      /** Transfer focus to the active cell after the microtask queue is empty. */
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.focus();
      });
      isStopPropagation = true;
    } else if (' ' === event.key || 'Enter' === event.key) {
      const date: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0, 0);
      this.selected.emit(date);
      isStopPropagation = true;
    }

    if (isStopPropagation) {
      // Cancel subsequent processing of the event.
      event.preventDefault();
      event.stopPropagation();
    }
  }
  // ** Private methods **

  // -- Methods for the mode: "view year", "view month", "view day" --
  private updateViewCurrentDate(currentDate: Date, params: CalendarViewParams, formatMonth: string | null): void {
    let newCurrentDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    if (params.minDate != null && DateUtil.compare(newCurrentDate, params.minDate) < 0) {
      newCurrentDate = params.minDate;
    } else if (params.maxDate != null && DateUtil.compare(params.maxDate, newCurrentDate) < 0) {
      newCurrentDate = params.maxDate;
    }
    this.currentDate = newCurrentDate;
    this.currentYearStr = currentDate.getFullYear().toString();
    this.currentMonthStr = GlnCalendarUtil.getActiveMonthStr(this.currentDate, formatMonth, params.locales);
    this.log(`updateViewCurrent();  currDate="${this.currentDate.toString().substring(4, 31)}"`); // #

    this.isPrevMonthAvailable = GlnCalendarUtil.getPrevMonthAvailability(this.currentDate, this.minDateVal) < 0;
    this.isNextMonthAvailable = GlnCalendarUtil.getNextMonthAvailability(this.currentDate, this.maxDateVal) > 0;

    this.isPrevYearAvailable = GlnCalendarUtil.getPrevYearAvailability(this.currentDate, this.minDateVal) < 0;
    this.isNextYearAvailable = GlnCalendarUtil.getNextYearAvailability(this.currentDate, this.maxDateVal) > 0;
  }

  // -- Methods for the mode "view year" --
  private updateViewYearStartFinish(yearsPerPage: number, yearMin: number | null, yearMax: number | null): void {
    if (yearsPerPage > 0) {
      const limit = GlnCalendarUtil.getPeriodLimits(this.yearsPerPage, yearMin, yearMax);
      this.frameYearStart = limit.start;
      this.frameYearFinish = limit.finish;
    }
  }
  private updateViewYearCell(current: Date, params: CalendarViewParams, today: Date, start: number, finish: number, perPage: number): void {
    const yearCurr: number = current.getFullYear();
    const yearStart: number = GlnCalendarUtil.getYearCurrInLimits(start, finish, yearCurr, perPage);
    this.frameYearCells = GlnCalendarUtil.getYearCellList(current, params, today, yearStart, perPage);

    // let year: number = yearPeriodStart;
    const yearFinish: number = yearStart + perPage;
    this.isPrevYearsAvailable = this.frameYearStart < yearStart /*this.frameYearCells[0].value*/;
    this.isNextYearsAvailable = /*this.frameYearCells[this.frameYearCells.length - 1].value*/ yearFinish < this.frameYearFinish;
  }
  // -- --
  /** Transition to the next or previous period.
   * @param period: string;  // 'period_month' - previous month (view = 'day');
   *                         // 'period_year'  - previous year (view = 'month');
   *                         // 'period_years' - previous years (view = 'year');
   * @param isNext: boolean; // true - next period; false - previous period;
   */
  private changePeriod(period: string, isNext: boolean): void {
    let currYear: number = this.currentDate.getFullYear();
    let currMonth: number = this.currentDate.getMonth();
    let yearPeriod: number = 0;
    if (CALENDAR_PERIOD_MONTH === period) {
      currMonth = currMonth + (isNext ? 1 : -1);
    } else if (CALENDAR_PERIOD_YEAR === period) {
      currYear = currYear + (isNext ? 1 : -1);
    } else if (CALENDAR_PERIOD_YEARS === period) {
      const delta: number = isNext ? this.yearsPerPage : -this.yearsPerPage;
      currYear = currYear + delta;
      yearPeriod = this.frameYearCells[0].value + delta;
    }
    const current: Date = GlnCalendarUtil.getDateByItsDetails(currYear, currMonth, this.currentDate.getDate());
    const year: number = current.getFullYear();
    const month: number = current.getMonth();

    let resultCompare: boolean = false;
    if (CALENDAR_PERIOD_MONTH === period) {
      if (isNext) {
        resultCompare =
          this.maxDateVal == null || DateUtil.compare(new Date(year, month, this.maxDateVal.getDate(), 0, 0, 0, 0), this.maxDateVal) <= 0;
      } else {
        resultCompare =
          this.minDateVal == null || DateUtil.compare(new Date(year, month, this.minDateVal.getDate(), 0, 0, 0, 0), this.minDateVal) >= 0;
      }
    } else if (CALENDAR_PERIOD_YEAR === period) {
      if (isNext) {
        resultCompare = this.maxDateVal == null || year <= this.maxDateVal.getFullYear();
      } else {
        resultCompare = this.minDateVal == null || this.minDateVal.getFullYear() <= year;
      }
    } else if (CALENDAR_PERIOD_YEARS === period) {
      if (isNext) {
        resultCompare = this.maxDateVal == null || yearPeriod < this.frameYearFinish;
      } else {
        resultCompare = this.minDateVal == null || this.frameYearStart <= yearPeriod;
      }
    }

    if (resultCompare) {
      this.updateViewAllCells(current);
    }
  }

  private updateViewAllCells(newCurrent: Date): void {
    const oldCurrentDate: Date = this.currentDate;
    const viewParams: CalendarViewParams = {
      selected: this.value,
      minDate: this.minDateVal,
      maxDate: this.maxDateVal,
      locales: this.localesVal,
      dateClasses: this.dateClassesVal,
      dateDisabled: this.dateDisabledVal,
    };

    this.updateViewCurrentDate(newCurrent, viewParams, this.formatMonthVal);

    if (DateUtil.compare(oldCurrentDate, this.currentDate) !== 0) {
      const todayDate: Date = new Date();
      const today: Date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);

      // Refresh the grid details of the days of the month.
      this.log(`updateViewDate(); getDayCellRowList();`); // #
      this.frameDayCellRows = GlnCalendarUtil.getDayCellRowList(this.currentDate, viewParams, today, this.isStartSundayVal);

      if (DateUtil.compareYearMonth(oldCurrentDate, this.currentDate) !== 0) {
        // Refresh the details of the grid of months of the year.
        this.log(`updateViewDate(); getMonthCellList();`); // #
        this.frameMonthCells = GlnCalendarUtil.getMonthCellList(this.currentDate, viewParams, today, this.formatByMonthsVal);
      }

      if (oldCurrentDate.getFullYear() != this.currentDate.getFullYear()) {
        // Refresh the details of the grid of years.
        this.log(`updateViewDate(); updateViewYearCell();`); // #
        this.updateViewYearCell(this.currentDate, viewParams, today, this.frameYearStart, this.frameYearFinish, this.yearsPerPage);
      }
    }
  }
  private getElementRefCurrentView(): ElementRef<HTMLDivElement> | undefined {
    return this.isViewModeYear() ? this.yearCellListRef /*: this.isViewModeMonth() ? this.monthCellListRef*/ : this.dayInfoRowListRef;
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
