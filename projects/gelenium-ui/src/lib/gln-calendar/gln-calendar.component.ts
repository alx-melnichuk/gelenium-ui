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
import { GlnCalendarConfig } from './gln-calendar-config.interface';
import { CalendarDayCell, CalendarDayCellRow, CalendarDayName, CALENDAR_DAY_CURRENT, GlnCalendarUtil } from './gln-calendar.util';

const CELL_SIZE: { [key: string]: number } = { short: 28, small: 32, middle: 36, wide: 40, large: 44, huge: 48 };

const VIEW_DAY = 'day';
const VIEW_MONTH = 'month';
const VIEW_YEAR = 'year';
const AMOUNT_YEARS = 16;

const CSS_PROP_CELL_SIZE = '--glncn--item-size';
const CSS_PROP_FONT_SIZE_HEADER = '--glncnh--fn-sz';

export const GLN_CALENDAR_CONFIG = new InjectionToken<GlnCalendarConfig>('GLN_CALENDAR_CONFIG');

const WEEKDAY_NUM_DEFAULT = 2;

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
  public startDate: Date | null | undefined;
  @Input()
  public sizeDayWeek: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  @Input()
  public value: Date | null | undefined;
  @Input()
  public wdFull: string | null | undefined;

  @Output()
  readonly selected: EventEmitter<Date | null> = new EventEmitter();
  @Output()
  readonly monthSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  readonly yearSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  readonly viewChanged: EventEmitter<string> = new EventEmitter();

  @ViewChild('dayInfoRowListRef', { read: ElementRef<HTMLDivElement>, static: false })
  public dayInfoRowListRef: ElementRef<HTMLDivElement> | undefined;

  public calendarDayCellRowList: CalendarDayCellRow[] = [];
  public calendarDayNameList: CalendarDayName[] = [];
  public calendarDayCurrMonthName: string = '';
  public calendarDayCurrYearName: string = '';
  public calendarDateStart: Date = new Date();
  public calendarDateFinish: Date = new Date();
  public calendarMonthCellList: string[] = [];
  public calendarYearCellList: number[] = [];
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
  public selectedMonth: number = -1;
  public selectedYear: number = -1;
  public sizeDayWeekVal: number | null = null; // Binding attribute "sizeDayWeek".
  public startDateVal: Date | null = null; // Binding attribute "startDate".
  public todaysMonth: number = -1;
  public todaysYear: number = -1;
  public VIEW_DAY: string = VIEW_DAY;
  public VIEW_MONTH: string = VIEW_MONTH;
  public VIEW_YEAR: string = VIEW_YEAR;
  public view: string = VIEW_DAY;

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
    let isPrepareData: boolean = false;
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
    if (changes['isStartSunday'] || (changes['config'] && this.isStartSunday == null && this.currConfig.isStartSunday != null)) {
      this.isStartSundayVal = BooleanUtil.init(this.isStartSunday) ?? !!this.currConfig.isStartSunday;
      isPrepareData = true;
    }
    if (changes['isWeekNumber'] || (changes['config'] && this.isWeekNumber == null && this.currConfig.isWeekNumber != null)) {
      this.isWeekNumberVal = BooleanUtil.init(this.isWeekNumber) ?? !!this.currConfig.isWeekNumber;
    }
    if (changes['startDate'] || (changes['config'] && this.startDate == null && this.currConfig.startDate != null)) {
      this.startDateVal = this.startDate || this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        isPrepareData = true;
      }
    }
    if (changes['sizeDayWeek'] || (changes['config'] && this.sizeDayWeek == null && this.currConfig.sizeDayWeek != null)) {
      const sizeDayWeekStr: string = (this.sizeDayWeek?.toString() || this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      isPrepareData = true;
    }
    if (changes['value']) {
      this.markedDate = this.value || null;
      isPrepareData = true;
    }

    if (isPrepareData && this.sizeDayWeekVal != null) {
      this.updateViewDayCells(this.value || null, this.sizeDayWeekVal, !!this.isStartSundayVal, this.startDateVal);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

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
    if (this.isStartSundayVal == null) {
      this.isStartSundayVal = !!this.currConfig.isStartSunday;
      isPrepareData = true;
    }
    if (this.isWeekNumberVal == null) {
      this.isWeekNumberVal = !!this.currConfig.isWeekNumber;
    }
    if (this.startDateVal == null) {
      this.startDateVal = this.currConfig.startDate || null;
      if (!this.value && !!this.startDateVal) {
        isPrepareData = true;
      }
    }
    if (this.sizeDayWeekVal == null) {
      const sizeDayWeekStr: string = (this.currConfig.sizeDayWeek || '').toString();
      this.sizeDayWeekVal = this.convertSizeDayWeek(sizeDayWeekStr, WEEKDAY_NUM_DEFAULT);
      isPrepareData = true;
    }

    if (isPrepareData && this.sizeDayWeekVal != null) {
      this.updateViewDayCells(this.value || null, this.sizeDayWeekVal, !!this.isStartSundayVal, this.startDateVal);
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
      this.nextView();
    }
  }

  public clickPrev(): void {
    if (this.isDisabledVal || this.isReadOnlyVal || this.sizeDayWeekVal == null) {
      return;
    }
    if (this.view === VIEW_DAY) {
      const date: Date = DateUtil.addMonth(this.calendarDateStart, -1);
      this.updateViewDayCells(this.value || null, this.sizeDayWeekVal, !!this.isStartSundayVal, date);
    }
  }

  public clickNext(): void {
    if (this.isDisabledVal || this.isReadOnlyVal || this.sizeDayWeekVal == null) {
      return;
    }
    if (this.view === VIEW_DAY) {
      const date: Date = DateUtil.addMonth(this.calendarDateStart, 1);
      this.updateViewDayCells(this.value || null, this.sizeDayWeekVal, !!this.isStartSundayVal, date);
    }
  }

  public nextView(): void {
    if (this.view === VIEW_DAY) {
      this.view = VIEW_YEAR;
      this.updateViewYearCells(this.startDateVal, this.value, AMOUNT_YEARS);
    } else if (this.view === VIEW_YEAR) {
      this.view = VIEW_MONTH;
      this.updateViewMonthCells(this.value);
    } else if (this.view === VIEW_MONTH) {
      this.view = VIEW_DAY;
      // TODO this.updateViewDayCells();
    }
  }

  // -- Methods for the mode "view year" --

  public clickYearCell(year: number): void {
    console.log(`clickYearCell(${year})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || this.view !== VIEW_YEAR) {
      return;
    }
    const minYear: number = this.calendarYearCellList[0];
    const maxYear: number = this.calendarYearCellList[this.calendarYearCellList.length - 1];
    if (minYear <= year && year <= maxYear && this.sizeDayWeekVal != null) {
      this.selectedYear = year;
      this.yearSelected.emit(year);
      this.nextView();
    }
  }

  // -- Methods for the mode "view month" --

  public clickMonthCell(month: number): void {
    console.log(`clickMonthCell(${month})`); // #
    if (this.isDisabledVal || this.isReadOnlyVal || this.view !== VIEW_MONTH) {
      return;
    }
    if (-1 < month && month < 12 && this.sizeDayWeekVal != null) {
      this.selectedMonth = month;
      this.monthSelected.emit(month + 1);
      const startDate: Date = new Date(this.selectedYear, month, 1, 0, 0, 0, 0);
      this.updateViewDayCells(this.value || null, this.sizeDayWeekVal, !!this.isStartSundayVal, startDate);
      this.nextView();
    }
  }

  // -- Methods for the mode "view day" --

  public clickSelectItem(cell: CalendarDayCell | null): void {
    if (this.isDisabledVal || this.isReadOnlyVal || !cell || (this.isHideOldDaysVal && cell.state != CALENDAR_DAY_CURRENT)) {
      console.log(`clickSelectItem() return;`); // #
      return;
    }
    const newDate: Date | null = cell != null ? new Date(cell.year, cell.month, cell.day, 0, 0, 0, 0) : null;
    this.selected.emit(newDate);
  }

  public keydownDayInfoRowList(event: KeyboardEvent): void {
    console.log(`keydownDayInfoRowList()  data-label=${(event.target as HTMLElement)?.getAttribute('data-label')}`); // #
    // event.key === 'ArrowRight' 'ArrowLeft' 'ArrowUp' 'ArrowDown' 'Tab' 'Escape' 'Enter' 'June 6, 2023'
    if (this.view !== VIEW_DAY || this.markedDate == null) {
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
      if (DateUtil.compare(newMarkedDate, this.calendarDateStart) === 1) {
        console.log(`newMarkedDate < this.initDateStart`); // #
        // this.clickPrev();
      } else if (DateUtil.compare(this.calendarDateFinish, newMarkedDate) === 1) {
        console.log(`this.initDateFinish < newMarkedDate`); // #
        // this.clickNext();
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
        this.selected.emit(new Date(this.markedDate));
      }
    }

    if (delta != 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ** Private methods **

  // -- Methods for the mode "view year" --
  private updateViewYearCells(startDate: Date | null, selected: Date | null | undefined, amountYears: number): void {
    const today: Date = new Date();
    this.todaysYear = today.getFullYear();
    this.selectedYear = selected?.getFullYear() || this.todaysYear;

    const initDate: Date = startDate || selected || today;
    const yearStart: number = Math.round(initDate.getFullYear() / 10) * 10;
    this.calendarYearCellList = GlnCalendarUtil.getYearCellList(yearStart, amountYears);

    this.changeDetectorRef.markForCheck();
  }
  // -- Methods for the mode "view month" --
  private updateViewMonthCells(selected: Date | null | undefined): void {
    const today: Date = new Date();
    this.todaysMonth = today.getMonth();
    this.selectedMonth = selected?.getMonth() || this.todaysMonth;

    this.calendarMonthCellList = GlnCalendarUtil.getMonthCellList('short');

    this.changeDetectorRef.markForCheck();
  }

  // -- Methods for the mode "view day" --
  private updateViewDayCells(selected: Date | null, sizeDayWeek: number, isStartSunday: boolean, startDate: Date | null): void {
    const today: Date = new Date();
    const initDate: Date = startDate || selected || today;
    const year: number = initDate.getFullYear();
    const month = initDate.getMonth();
    this.calendarDateStart = new Date(year, month, 1, 0, 0, 0, 0);
    this.calendarDateFinish = DateUtil.addDay(new Date(year, month + 1, 1, 0, 0, 0, 0), -1);

    this.calendarDayCurrYearName = DateUtil.getYearName(this.calendarDateStart, 'numeric');
    this.calendarDayCurrMonthName = DateUtil.getMonthName(this.calendarDateStart, 'long');

    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;
    this.calendarDayNameList = GlnCalendarUtil.getDayNameList(sizeDayWeek, dayStartWeek);
    this.calendarDayCellRowList = GlnCalendarUtil.getDayCellRowList(selected, dayStartWeek, this.calendarDateStart, today);

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

  private convertSize(size: string, defaultValue: number): number {
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
}
