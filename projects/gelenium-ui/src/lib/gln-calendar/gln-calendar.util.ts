import { DateUtil } from '../_utils/date.util';
import { StringUtil } from '../_utils/string.util';

// export const CALENDAR_YEAR_MIN = 1000;
// export const CALENDAR_YEAR_MAX = 9999;
export const CALENDAR_YEAR_MIN = 1955; // 1960; // 1000
export const CALENDAR_YEAR_MAX = 2115; // 2120; // 2150

export const CALENDAR_VIEW_DAY = 'day';
export const CALENDAR_VIEW_MONTH = 'month';
export const CALENDAR_VIEW_YEAR = 'year';

export const CALENDAR_PERIOD_MONTH = 'period_month';
export const CALENDAR_PERIOD_YEAR = 'period_year';
export const CALENDAR_PERIOD_YEARS = 'period_years';

export interface CalendarDayName {
  name: string;
  dayWeek: number;
  isDayoff: boolean | undefined;
}

export const CALENDAR_FORMAT_BY_MONTH_DEFAULT = 'short';

export type CALENDAR_TINT_STATE = 'act' | 'psv' | 'slct';
export const CALENDAR_TINT_ACTIVE = 'act';
export const CALENDAR_TINT_PASSIVE = 'psv';
export const CALENDAR_TINT_SELECTED = 'slct';

// -- Interfaces for the mode "view day" --

export interface CalendarDayCellRow {
  cellList: CalendarDayCell[];
  weekNumberObj: { weekNumber: number };
}

export interface CalendarDayCell {
  day: number;
  dayWeek: number;
  isDayoff?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isToday?: boolean | undefined;
  label: string;
  month: number;
  note: string;
  state: CALENDAR_TINT_STATE;
  year: number;
}

// -- Interfaces for the mode "view month" --

export interface CalendarMonthCell {
  isDisabled?: boolean | undefined;
  isSelected?: boolean | undefined;
  isToday?: boolean | undefined;
  label: string;
  month: number;
  state: CALENDAR_TINT_STATE;
}

export class GlnCalendarUtil {
  public static COLS_BY_YEARS_DEFAULT = 4;
  public static ROWS_BY_YEARS_DEFAULT = 5;
  public static COLS_BY_MONTHS_DEFAULT = 3;

  // -- Methods for the mode "view year" --

  public static getYearCellList(yearStart: number, amountYears: number): number[] {
    const result: number[] = [];
    let year: number = yearStart;
    const yearFinish: number = yearStart + amountYears;
    while (year < yearFinish) {
      result.push(year++);
    }
    return result;
  }

  // -- Methods for the mode "view month" --

  /** Get a grid of months in a year.
   * @param current: Date;                     // Current date.
   * @param selected: Date | null | undefined; // Selected date.
   * @param today: Date,                       // Today's date.
   * @param minDate: Date | null | undefined;  // Minimum date.
   * @param maxDate: Date | null | undefined;  // Maximum date.
   * @param locale: string | null;             // Locale ('en-US', 'de-DE', 'fr-FR')
   * @param formatByMonths: string | null;     // Month name format.
   */
  public static getMonthCellList(
    current: Date,
    selected: Date | null,
    today: Date,
    minDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    locale: string | null,
    formatByMonths: string | null
  ): CalendarMonthCell[] {
    const result: CalendarMonthCell[] = [];
    const year: number = current.getFullYear();
    const selectedYear: number | undefined = selected?.getFullYear();
    const selectedMonth: number | undefined = selected?.getMonth();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const formatMonth = DateUtil.convertMonthFormat(formatByMonths || CALENDAR_FORMAT_BY_MONTH_DEFAULT);

    for (let month = 0; month < 12; month++) {
      const isDisabledMinDate: boolean = GlnCalendarUtil.isDisabledMonthByMin(year, month, minDate);
      const isDisabledMaxDate: boolean = GlnCalendarUtil.isDisabledMonthByMax(year, month, maxDate);
      const isDisabled: boolean | undefined = isDisabledMinDate || isDisabledMaxDate ? true : undefined;
      const isSelected: boolean | undefined = year === selectedYear && month === selectedMonth ? true : undefined;
      const isToday: boolean | undefined = year === todayYear && month === todayMonth ? true : undefined;
      const date: Date = new Date(year, month, 1, 0, 0, 0, 0);
      let monthStr: string = '';
      try {
        // Get the name of the month for the specified date.
        monthStr = DateUtil.formatDateTime(date, { month: formatMonth }, locale || undefined);
      } catch (e) {
        console.error(e);
        monthStr = DateUtil.formatDateTime(date, { month: formatMonth }, undefined);
      }
      const label: string = StringUtil.camelize(monthStr);
      const state = isSelected ? CALENDAR_TINT_SELECTED : CALENDAR_TINT_ACTIVE;
      result.push({ isDisabled, isSelected, isToday, label, month, state });
    }
    return result;
  }
  // d1 < d2 = -1 (<0);  d1 == d2 = (==0);  d1 > d2 = 1 (>0)
  public static compareYearMonthByDate(year1: number, month1: number, date2: Date): number {
    const year2: number = date2.getFullYear();
    const month2: number = date2.getMonth();
    return year1 < year2 ? -1 : year1 > year2 ? 1 : month1 < month2 ? -1 : month1 > month2 ? 1 : 0;
  }
  public static isDisabledMonthByMin(year: number, month: number, minDate: Date | null | undefined): boolean {
    const minYear: number | null = minDate?.getFullYear() || null;
    const minMonth: number | null = minDate?.getMonth() || null;
    return minYear !== null && minMonth !== null && (year < minYear || (year === minYear && month < minMonth));
  }
  public static isDisabledMonthByMax(year: number, month: number, maxDate: Date | null | undefined): boolean {
    const maxYear: number | null = maxDate?.getFullYear() || null;
    const maxMonth: number | null = maxDate?.getMonth() || null;
    return maxYear !== null && maxMonth !== null && (maxYear < year || (maxYear === year && maxMonth < month));
  }

  // -- Methods for the mode "view day" --

  /** Get a grid of days in a month.
   * @param current: Date;                     // Current date.
   * @param selected: Date | null | undefined; // Selected date.
   * @param today: Date,                       // Today's date.
   * @param minDate: Date | null | undefined;  // Minimum date.
   * @param maxDate: Date | null | undefined;  // Maximum date.
   * @param dayStartWeek: number;              // 0-Sunday (default), 1-Monday;
   */
  public static getDayCellRowList(
    current: Date,
    selected: Date | null,
    today: Date,
    minDate: Date | null | undefined,
    maxDate: Date | null | undefined,
    dayStartWeek: number
  ): CalendarDayCellRow[] {
    const result: CalendarDayCellRow[] = [];

    const selectedYear: number | undefined = selected?.getFullYear();
    const selectedMonth: number | undefined = selected?.getMonth();
    const selectedDay: number | undefined = selected?.getDate();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const todayDay: number = today.getDate();
    const minYear: number | null = minDate?.getFullYear() || null;
    const minMonth: number | null = minDate?.getMonth() || null;
    const minDay: number | null = minDate?.getDate() || null;
    const maxYear: number | null = maxDate?.getFullYear() || null;
    const maxMonth: number | null = maxDate?.getMonth() || null;
    const maxDay: number | null = maxDate?.getDate() || null;

    const itemDate: Date = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0, 0);
    const currMonth: number = itemDate.getMonth();
    // Date.getDay() 0-Sun, 1-Mon, 2-Tue, 3-Wed, 4-Thu, 5-Fri, 6-Sat;
    const dayWeek1: number = itemDate.getDay();
    itemDate.setDate(dayStartWeek !== dayWeek1 ? dayStartWeek - dayWeek1 : -7);
    let hasSelected: boolean = selected == null;
    let hasToday: boolean = false;
    let calendarRow: CalendarDayCellRow | undefined;
    let idx: number = 0;
    while (idx < 42) {
      itemDate.setDate(itemDate.getDate() + 1);
      const year = itemDate.getFullYear();
      const month = itemDate.getMonth();
      const day = itemDate.getDate();
      const dayWeek = itemDate.getDay();

      const isSelected: boolean | undefined = !hasSelected && year === selectedYear && month === selectedMonth && day === selectedDay;
      if (!hasSelected && isSelected) {
        hasSelected = true;
      }
      const state = isSelected ? CALENDAR_TINT_SELECTED : month === currMonth ? CALENDAR_TINT_ACTIVE : CALENDAR_TINT_PASSIVE;

      const isToday: boolean | undefined = !hasToday && year === todayYear && month === todayMonth && day === todayDay ? true : undefined;
      if (!hasToday && isToday) {
        hasToday = true;
      }
      if (dayStartWeek === dayWeek) {
        calendarRow = { cellList: [], weekNumberObj: { weekNumber: DateUtil.getWeekNumber(itemDate) } };
        result.push(calendarRow);
      }

      let isMinDate: boolean = false;
      if (minYear !== null && minMonth !== null && minDay !== null) {
        isMinDate = year < minYear || (year === minYear && (month < minMonth || (month === minMonth && day < minDay)));
      }
      let isMaxDate: boolean = false;
      if (maxYear !== null && maxMonth !== null && maxDay !== null) {
        isMaxDate = maxYear < year || (maxYear === year && (maxMonth < month || (maxMonth === month && maxDay < day)));
      }
      const isDisabled: boolean | undefined = isMinDate || isMaxDate ? true : undefined;

      const label: string = GlnCalendarUtil.getLabelByDate(itemDate) || '';
      const isDayoff = dayWeek == 0 || dayWeek == 6 ? true : undefined;
      const note: string = ('0' + day.toString()).slice(-2);

      calendarRow?.cellList.push({ day, dayWeek, isDayoff, isDisabled, isToday, label, month, note, state, year });
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
   * @param locale: string | null; // Locale ('en-US', 'de-DE', 'fr-FR')
   */
  public static getDayNameList(sizeDayWeek: number, dayStartWeek: number, locale: string | null): CalendarDayName[] {
    const result: CalendarDayName[] = [];
    const dayWeekRes: 'long' | 'short' | 'narrow' = sizeDayWeek <= 0 || 3 < sizeDayWeek ? 'long' : 1 === sizeDayWeek ? 'narrow' : 'short';
    const now: Date = new Date();
    const current: Date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    current.setDate(current.getDate() - current.getDay() - 1 + dayStartWeek);
    for (let i = 1; i < 8; i++) {
      current.setDate(current.getDate() + 1);
      let value: string = '';
      try {
        // Get the name of the day of the week for the specified date.
        value = DateUtil.formatDateTime(current, { weekday: dayWeekRes }, locale || undefined);
      } catch (e) {
        console.error(e);
        value = DateUtil.formatDateTime(current, { weekday: dayWeekRes });
      }
      const dayWeek: number = current.getDay();
      const name: string = StringUtil.camelize(sizeDayWeek > 0 ? value.substring(0, sizeDayWeek) : value);
      result.push({ name, dayWeek, isDayoff: dayWeek == 0 || dayWeek == 6 });
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

  public static getPeriodLimits(yearsPerPage: number, yearMin: number, yearMax: number): { start: number; finish: number } {
    let start: number = -1;
    let finish: number = -1;
    if (0 < yearsPerPage && yearsPerPage < 101 && CALENDAR_YEAR_MIN <= yearMin && yearMax <= CALENDAR_YEAR_MAX && yearMin < yearMax) {
      start = Math.trunc(yearMin / yearsPerPage) * yearsPerPage;
      const delta: number = yearMax / yearsPerPage;
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
    return (elementListRef?.querySelector(`button[data-label='${label}']`) as HTMLElement) || null;
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

  public static getViewModes(): string[] {
    return [CALENDAR_VIEW_DAY, CALENDAR_VIEW_YEAR, CALENDAR_VIEW_MONTH];
  }
  public static checkViews(views: string[] | null | undefined): string[] {
    const result: string[] = [];
    if (Array.isArray(views)) {
      const modes: string[] = GlnCalendarUtil.getViewModes();
      for (let index = 0; index < views.length; index++) {
        if (modes.indexOf(views[index]) > -1) {
          result.push(views[index]);
        }
      }
    }
    return result;
  }
  public static getNextView(views: string[], currView: string): string {
    let result: string = currView;
    const index: number = views.indexOf(currView);
    if (views.length > 0 && index > -1) {
      const nextIndex: number = index === views.length - 1 ? 0 : index + 1;
      const modes: string[] = GlnCalendarUtil.getViewModes();
      if (modes.indexOf(views[nextIndex]) > -1) {
        result = views[nextIndex];
      }
    }
    return result;
  }
}
