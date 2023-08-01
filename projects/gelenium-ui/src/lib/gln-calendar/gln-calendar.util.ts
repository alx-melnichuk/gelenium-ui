import { DateUtil } from '../_utils/date.util';
import { StringUtil } from '../_utils/string.util';

import { GlnCalendarCellClassesFun, GlnCalendarCellDisabledFun } from './gln-calendar.interface';

export const CALENDAR_YEAR_MIN = 1900; // 1960; // 1000
export const CALENDAR_YEAR_MAX = 2100; // 2120; // 2150

export const CALENDAR_VIEW_DAY = 'day';
export const CALENDAR_VIEW_MONTH = 'month';
export const CALENDAR_VIEW_YEAR = 'year';
export type CALENDAR_VIEW_TYPE = 'day' | 'month' | 'year';

export const CALENDAR_PERIOD_MONTH = 'period_month';
export const CALENDAR_PERIOD_YEAR = 'period_year';
export const CALENDAR_PERIOD_YEARS = 'period_years';

export const CALENDAR_WEEKDAY_NUM_DEFAULT = 2;

export interface CalendarDayName {
  name: string;
  dayWeek: number;
}

export const CALENDAR_FORMAT_BY_MONTH_DEFAULT = 'short';
export const CALENDAR_MONTH_FORMAT_DEFAULT = 'long';

export type CALENDAR_TINT_STATE = 'act' | 'psv' | 'slct';
export const CALENDAR_TINT_ACTIVE = 'act';
export const CALENDAR_TINT_PASSIVE = 'psv';
export const CALENDAR_TINT_SELECTED = 'slct';

// -- Interfaces for the mode "view month", "view year" --

export interface CalendarCell {
  classes: string[];
  date: Date;
  dayWeek: number;
  isCurrent?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isToday?: boolean | undefined;
  label: string;
  state: CALENDAR_TINT_STATE;
  value: number;
}

// -- Interfaces for the mode "view day" --

export interface CalendarDayCellRow {
  cellList: CalendarCell[];
  weekNumberObj: { weekNumber: number };
}

export interface CalendarViewParams {
  selected?: Date | null | undefined; // Selected date.
  minDate?: Date | null | undefined; // Minimum date.
  maxDate?: Date | null | undefined; // Maximum date.
  locales?: string | null | undefined; // Locale ('en-US', 'de-DE', 'fr-FR')
  dateClasses?: GlnCalendarCellClassesFun | null | undefined;
  dateDisabled?: GlnCalendarCellDisabledFun | null | undefined;
}

export class GlnCalendarUtil {
  public static COLS_BY_YEARS_DEFAULT = 4;
  public static ROWS_BY_YEARS_DEFAULT = 5;
  public static COLS_BY_MONTHS_DEFAULT = 3;

  // -- Methods for the mode: "view year", "view month", "view day" --
  public static getActiveMonthStr(currDate: Date, formatMonth: string | null, locales: string | null | undefined): string {
    const monthFormat = DateUtil.convertMonthFormat(formatMonth || CALENDAR_MONTH_FORMAT_DEFAULT);
    let monthStr: string = '';
    try {
      // Get the name of the month for the specified date.
      monthStr = DateUtil.formatDateTime(currDate, { month: monthFormat }, locales || undefined);
    } catch (e) {
      console.error(e);
      monthStr = DateUtil.formatDateTime(currDate, { month: monthFormat }, undefined);
    }
    return StringUtil.camelize(monthStr);
  }
  // -- Methods for the mode "view year" --
  /** Get a grid of years.
   * @param current: Date;                     // Current date.
   * @param params: CalendarViewParams;
   * @param today: Date,                       // Today's date.
   * @param yearPeriodStart: number;           // Start of the current period.
   * @param yearsPerPage: number;              // The number of years in the period.
   */
  public static getYearCellList(
    current: Date,
    params: CalendarViewParams,
    today: Date,
    yearPeriodStart: number,
    yearsPerPage: number
  ): CalendarCell[] {
    const result: CalendarCell[] = [];
    const currentYear: number = current.getFullYear();
    const selectedYear: number | undefined = params.selected?.getFullYear();
    const todayYear: number = today.getFullYear();
    let hasSelected: boolean = params.selected == null;
    let hasToday: boolean = false;
    let hasCurrent: boolean = false;

    let year: number = yearPeriodStart;
    const periodFinish: number = yearPeriodStart + yearsPerPage;
    while (year < periodFinish) {
      const date: Date = new Date(year, 0, 1, 0, 0, 0, 0);
      const dayWeek = date.getDay();

      const classes: string[] = params.dateClasses != null ? params.dateClasses(date, CALENDAR_VIEW_YEAR, current) : [];

      let yearStr: string = '';
      try {
        // Get the name of the year for the specified date.
        yearStr = DateUtil.formatDateTime(date, { year: 'numeric' }, params.locales || undefined);
      } catch (e) {
        console.error(e);
        yearStr = DateUtil.formatDateTime(date, { year: 'numeric' }, undefined);
      }
      const label: string = yearStr;

      const isSelected: boolean = !hasSelected && year === selectedYear;
      hasSelected = !hasSelected && isSelected ? true : hasSelected;
      const state = isSelected ? CALENDAR_TINT_SELECTED : CALENDAR_TINT_ACTIVE;

      const yearCell: CalendarCell = { classes, date, dayWeek, label, state, value: year };
      result.push(yearCell);

      const isCurrent: boolean | undefined = !hasCurrent && year === currentYear ? true : undefined;
      hasCurrent = !hasCurrent && isCurrent ? true : hasCurrent;
      if (!!isCurrent) {
        yearCell.isCurrent = true;
      }

      const isDisabled: boolean = params.dateDisabled != null ? params.dateDisabled(date, CALENDAR_VIEW_YEAR, current) : false;
      if (
        isDisabled ||
        !(GlnCalendarUtil.getPrevYearAvailability(date, params.minDate) <= 0) ||
        !(GlnCalendarUtil.getNextYearAvailability(date, params.maxDate) >= 0)
      ) {
        yearCell.isDisabled = true;
      }

      const isToday: boolean | undefined = !hasToday && year === todayYear ? true : undefined;
      hasToday = !hasToday && isToday ? true : hasToday;
      if (!!isToday) {
        yearCell.isToday = true;
      }

      year++;
    }
    return result;
  }
  public static getNextYearAvailability(currentDate: Date, maxDate: Date | null | undefined): number {
    return maxDate == null ? 1 : DateUtil.compareYear(maxDate, currentDate);
  }
  public static getPrevYearAvailability(currentDate: Date, minDate: Date | null | undefined): number {
    return minDate == null ? -1 : DateUtil.compareYear(minDate, currentDate);
  }

  // -- Methods for the mode "view month" --
  /** Get a grid of months in a year.
   * @param current: Date;                     // Current date.
   * @param today: Date,                       // Today's date.
   * @param params: CalendarViewParams;
   * @param formatByMonths: string | null;     // Month name format.
   */
  public static getMonthCellList(current: Date, params: CalendarViewParams, today: Date, formatByMonths: string | null): CalendarCell[] {
    const result: CalendarCell[] = [];
    const year: number = current.getFullYear();
    const currentMonth: number = current.getMonth();
    const selectedYear: number | undefined = params.selected?.getFullYear();
    const selectedMonth: number | undefined = params.selected?.getMonth();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const monthFormat = DateUtil.convertMonthFormat(formatByMonths || CALENDAR_FORMAT_BY_MONTH_DEFAULT);
    let hasSelected: boolean = params.selected == null;
    let hasToday: boolean = false;
    let hasCurrent: boolean = false;

    for (let month = 0; month < 12; month++) {
      const date: Date = new Date(year, month, 1, 0, 0, 0, 0);
      const dayWeek = date.getDay();

      const classes: string[] = params.dateClasses != null ? params.dateClasses(date, CALENDAR_VIEW_MONTH, current) : [];

      let monthStr: string = '';
      try {
        // Get the name of the month for the specified date.
        monthStr = DateUtil.formatDateTime(date, { month: monthFormat }, params.locales || undefined);
      } catch (e) {
        console.error(e);
        monthStr = DateUtil.formatDateTime(date, { month: monthFormat }, undefined);
      }
      const label: string = StringUtil.camelize(monthStr);

      const isSelected: boolean = !hasSelected && year === selectedYear && month === selectedMonth;
      hasSelected = !hasSelected && isSelected ? true : hasSelected;
      const state = isSelected ? CALENDAR_TINT_SELECTED : CALENDAR_TINT_ACTIVE;

      const monthCell: CalendarCell = { classes, date, dayWeek, label, state, value: month };
      result.push(monthCell);

      const isCurrent: boolean | undefined = !hasCurrent && month === currentMonth ? true : undefined;
      hasCurrent = !hasCurrent && isCurrent ? true : hasCurrent;
      if (!!isCurrent) {
        monthCell.isCurrent = true;
      }

      const isDisabled: boolean = params.dateDisabled != null ? params.dateDisabled(date, CALENDAR_VIEW_MONTH, current) : false;
      if (
        isDisabled ||
        !(GlnCalendarUtil.getPrevMonthAvailability(date, params.minDate) <= 0) ||
        !(GlnCalendarUtil.getNextMonthAvailability(date, params.maxDate) >= 0)
      ) {
        monthCell.isDisabled = true;
      }

      const isToday: boolean | undefined = !hasToday && year === todayYear && month === todayMonth ? true : undefined;
      hasToday = !hasToday && isToday ? true : hasToday;
      if (!!isToday) {
        monthCell.isToday = true;
      }
    }
    return result;
  }
  public static getNextMonthAvailability(currentDate: Date, maxDate: Date | null | undefined): number {
    return maxDate == null ? 1 : DateUtil.compareYearMonth(maxDate, currentDate);
  }
  public static getPrevMonthAvailability(currentDate: Date, minDate: Date | null | undefined): number {
    return minDate == null ? -1 : DateUtil.compareYearMonth(minDate, currentDate);
  }

  // -- Methods for the mode "view day" --
  /** Get a grid of days in a month.
   * @param current: Date;                     // Current date.
   * @param params: CalendarViewParams;
   * @param today: Date;                       // Today's date.
   * @param isStartSunday: boolean | null;
   */
  public static getDayCellRowList(
    current: Date,
    params: CalendarViewParams,
    today: Date,
    isStartSunday: boolean | null
  ): CalendarDayCellRow[] {
    const result: CalendarDayCellRow[] = [];

    const currentYear: number = current.getFullYear();
    const currentMonth: number = current.getMonth();
    const currentDay: number = current.getDate();
    const selectedYear: number | undefined = params.selected?.getFullYear();
    const selectedMonth: number | undefined = params.selected?.getMonth();
    const selectedDay: number | undefined = params.selected?.getDate();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const todayDay: number = today.getDate();
    const minYear: number | null = params.minDate?.getFullYear() || null;
    const minMonth: number | null = params.minDate?.getMonth() || null;
    const minDay: number | null = params.minDate?.getDate() || null;
    const maxYear: number | null = params.maxDate?.getFullYear() || null;
    const maxMonth: number | null = params.maxDate?.getMonth() || null;
    const maxDay: number | null = params.maxDate?.getDate() || null;
    const dayStartWeek: number = !isStartSunday ? DateUtil.getDayStartWeekByLocale() : 0;

    const innerDate: Date = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0, 0);
    const currMonth: number = innerDate.getMonth();
    // Date.getDay() 0-Sun, 1-Mon, 2-Tue, 3-Wed, 4-Thu, 5-Fri, 6-Sat;
    const dayWeek1: number = innerDate.getDay();
    innerDate.setDate(dayStartWeek !== dayWeek1 ? dayStartWeek - dayWeek1 : -7);
    let hasSelected: boolean = params.selected == null;
    let hasToday: boolean = false;
    let hasCurrent: boolean = false;
    let calendarRow: CalendarDayCellRow | undefined;
    let idx: number = 0;
    while (idx < 42) {
      innerDate.setDate(innerDate.getDate() + 1);
      const date: Date = new Date(innerDate.getFullYear(), innerDate.getMonth(), innerDate.getDate(), 0, 0, 0, 0);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const dayWeek = date.getDay();

      if (dayStartWeek === dayWeek) {
        calendarRow = { cellList: [], weekNumberObj: { weekNumber: DateUtil.getWeekNumber(date) } };
        result.push(calendarRow);
      }

      const classes: string[] = params.dateClasses != null ? params.dateClasses(date, CALENDAR_VIEW_DAY, current) : [];

      const label: string = GlnCalendarUtil.getLabelByDate(date) || '';

      const isSelected: boolean | undefined = !hasSelected && year === selectedYear && month === selectedMonth && day === selectedDay;
      hasSelected = !hasSelected && isSelected ? true : hasSelected;
      const state = isSelected ? CALENDAR_TINT_SELECTED : month === currMonth ? CALENDAR_TINT_ACTIVE : CALENDAR_TINT_PASSIVE;

      const dayCell: CalendarCell = { classes, date, dayWeek, label, state, value: day };
      calendarRow?.cellList.push(dayCell);

      const isCurrent: boolean = !hasCurrent && year === currentYear && month === currentMonth && day === currentDay ? true : false;
      hasCurrent = !hasCurrent && isCurrent ? true : hasCurrent;
      if (!!isCurrent) {
        dayCell.isCurrent = true;
      }

      const isDisabled: boolean = params.dateDisabled != null ? params.dateDisabled(date, CALENDAR_VIEW_DAY, current) : false;
      let isMinDate: boolean = false;
      if (minYear !== null && minMonth !== null && minDay !== null) {
        isMinDate = year < minYear || (year === minYear && (month < minMonth || (month === minMonth && day < minDay)));
      }
      let isMaxDate: boolean = false;
      if (maxYear !== null && maxMonth !== null && maxDay !== null) {
        isMaxDate = maxYear < year || (maxYear === year && (maxMonth < month || (maxMonth === month && maxDay < day)));
      }
      if (isDisabled || isMinDate || isMaxDate) {
        dayCell.isDisabled = true;
      }

      const isToday: boolean = !hasToday && year === todayYear && month === todayMonth && day === todayDay ? true : false;
      hasToday = !hasToday && isToday ? true : hasToday;
      if (!!isToday) {
        dayCell.isToday = true;
      }

      idx++;
    }
    return result;
  }
  // 'Thu, June 8, 2023'
  public static getLabelByDate(date: Date | null): string | null {
    let result: string | null = null;
    if (date != null) {
      // Get year, month and day in short form.
      result = DateUtil.formatDateTime(date, { year: 'numeric', month: 'long', day: 'numeric' }, 'default');
    }
    return result;
  }
  /** Get a list of days of the week.
   * @param sizeDayWeek: number;   // 1-'narrow'(T); 2,3-'short'(Thu); -1-'long'(Thursday);
   * @param dayStartWeek: number;  // 0-Sunday (default), 1-Monday;
   * @param locales: string | null; // Locale ('en-US', 'de-DE', 'fr-FR')
   */
  public static getDayNameList(sizeDayWeek: number | null, dayStartWeek: number, locales: string | null): CalendarDayName[] {
    const result: CalendarDayName[] = [];
    const szDayWeek: number = sizeDayWeek || CALENDAR_WEEKDAY_NUM_DEFAULT;
    const dayWeekRes: 'long' | 'short' | 'narrow' = szDayWeek <= 0 || 3 < szDayWeek ? 'long' : 1 === szDayWeek ? 'narrow' : 'short';
    const now: Date = new Date();
    const current: Date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    current.setDate(current.getDate() - current.getDay() - 1 + dayStartWeek);
    for (let i = 1; i < 8; i++) {
      current.setDate(current.getDate() + 1);
      let value: string = '';
      try {
        // Get the name of the day of the week for the specified date.
        value = DateUtil.formatDateTime(current, { weekday: dayWeekRes }, locales || undefined);
      } catch (e) {
        console.error(e);
        value = DateUtil.formatDateTime(current, { weekday: dayWeekRes });
      }
      const dayWeek: number = current.getDay();
      const name: string = StringUtil.camelize(szDayWeek > 0 ? value.substring(0, szDayWeek) : value);
      result.push({ name, dayWeek });
    }
    return result;
  }

  public static checkYearMonthDayAsDate(year: number, month: number, day: number): boolean {
    const date: Date = new Date(year, month, day, 0, 0, 0, 0);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }
  public static getLastDayOfMonth(year: number, month: number): Date {
    const date: Date = new Date(year, month + 1, 1, 0, 0, 0, 0);
    return DateUtil.addDay(date, -1);
  }
  public static getDateByItsDetails(year: number, month: number, day: number): Date {
    const isCorrectYearMonthDay: boolean = GlnCalendarUtil.checkYearMonthDayAsDate(year, month, day);
    return isCorrectYearMonthDay ? new Date(year, month, day, 0, 0, 0, 0) : GlnCalendarUtil.getLastDayOfMonth(year, month);
  }

  public static getPeriodLimits(yearsPerPage: number, yearMin: number | null, yearMax: number | null): { start: number; finish: number } {
    let start: number = -1;
    let finish: number = -1;
    const yearMin2: number = yearMin || CALENDAR_YEAR_MIN;
    const yearMax2: number = yearMax || CALENDAR_YEAR_MAX;
    if (0 < yearsPerPage && yearsPerPage < 101 && CALENDAR_YEAR_MIN <= yearMin2 && yearMax2 <= CALENDAR_YEAR_MAX && yearMin2 < yearMax2) {
      start = Math.trunc(yearMin2 / yearsPerPage) * yearsPerPage;
      const delta: number = yearMax2 / yearsPerPage;
      const truncDelta: number = Math.trunc(delta);
      finish = (truncDelta + (delta - truncDelta > 0 ? 1 : 0)) * yearsPerPage - 1;
    }
    return { start, finish };
  }

  public static getYearCurrInLimits(yearStart: number, yearFinish: number, yearCurr: number, yearsPerPage: number): number {
    let result: number = -1;
    if (yearStart > 0 && yearFinish > 0 && yearStart <= yearFinish && yearCurr > 0 && yearsPerPage > 0) {
      const yearValue: number =
        yearStart <= yearCurr && yearCurr <= yearFinish ? yearCurr : yearStart + Math.trunc((yearFinish - yearStart) / 2);
      result = Math.trunc(yearValue / yearsPerPage) * yearsPerPage;
    }
    return result;
  }

  public static getElementByLabel(elementListRef: HTMLDivElement | undefined, label: string | null): HTMLElement | null {
    return label != null ? (elementListRef?.querySelector(`button[data-label='${label}']`) as HTMLElement) || null : null;
  }

  public static getColsByYears(value: number): number {
    return 0 < value && value < 13 ? value : GlnCalendarUtil.COLS_BY_YEARS_DEFAULT;
  }
  public static getRowsByYears(value: number): number {
    return 0 < value && value < 13 ? value : GlnCalendarUtil.ROWS_BY_YEARS_DEFAULT;
  }
  public static getColsByMonths(value: number): number {
    return 0 < value && value < 13 ? value : GlnCalendarUtil.COLS_BY_MONTHS_DEFAULT;
  }
  public static getRowsByMonthsByCols(value: number): number {
    return Math.round((12 / value) * 100) / 100;
  }

  public static convertSizeDayWeek(sizeDayWeek: string | undefined, defaultWeekdayNum: number): number {
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

  public static getViewModes(): CALENDAR_VIEW_TYPE[] {
    return [CALENDAR_VIEW_DAY, CALENDAR_VIEW_YEAR, CALENDAR_VIEW_MONTH];
  }
  public static convertView(view: string): CALENDAR_VIEW_TYPE | null {
    return CALENDAR_VIEW_DAY === view || CALENDAR_VIEW_MONTH === view || CALENDAR_VIEW_YEAR === view ? view : null;
  }
  public static convertViews(views: string[]): CALENDAR_VIEW_TYPE[] {
    const result: CALENDAR_VIEW_TYPE[] = [];
    const list: CALENDAR_VIEW_TYPE[] = GlnCalendarUtil.getViewModes();
    for (let index = 0; index < views.length; index++) {
      const viewType: CALENDAR_VIEW_TYPE | null = GlnCalendarUtil.convertView(views[index]);
      if (viewType != null && list.indexOf(viewType) > -1) {
        result.push(viewType);
      }
    }
    return result;
  }
  public static getNextView(views: CALENDAR_VIEW_TYPE[], currView: CALENDAR_VIEW_TYPE): CALENDAR_VIEW_TYPE {
    const index: number = views.indexOf(currView);
    return views.length > 0 && index > -1 ? views[index === views.length - 1 ? 0 : index + 1] : currView;
  }
}
