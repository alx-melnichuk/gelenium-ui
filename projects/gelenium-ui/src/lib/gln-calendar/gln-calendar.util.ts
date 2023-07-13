import { DateUtil } from '../_utils/date.util';

export interface CalendarDayCellRow {
  cellList: CalendarDayCell[];
  weekNumberObj: { weekNumber: number };
}

export type CALENDAR_DAY_STATE = 'curr' | 'old' | 'slct';
export const CALENDAR_DAY_CURRENT = 'curr';
export const CALENDAR_DAY_PREVIOUS = 'old';
export const CALENDAR_DAY_SELECTED = 'slct';

// export const CALENDAR_YEAR_MIN = 1000;
// export const CALENDAR_YEAR_MAX = 2150;
export const CALENDAR_YEAR_MIN = 1958; // 1960;
export const CALENDAR_YEAR_MAX = 2110; // 2120;

export interface CalendarDayCell {
  year: number;
  month: number;
  day: number;
  day2d: string;
  dayWeek: number;
  state: CALENDAR_DAY_STATE;
  label: string;
  isToday?: boolean | undefined;
  isDayoff?: boolean | undefined;
}

export interface CalendarDayName {
  name: string;
  dayWeek: number;
  isDayoff: boolean | undefined;
}

export class GlnCalendarUtil {
  public static COLS_BY_YEARS_DEFAULT = 4;
  public static ROWS_BY_YEARS_DEFAULT = 5;
  public static COLS_BY_MONTHS_DEFAULT = 3;
  public static VIEW_DAY = 'day';
  public static VIEW_MONTH = 'month';
  public static VIEW_YEAR = 'year';

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

  public static getMonthCellList(month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined): string[] {
    const result: string[] = [];
    const year: number = new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      result.push(DateUtil.getMonthName(new Date(year, i, 1, 0, 0, 0, 0), month));
    }
    return result;
  }

  // -- Methods for the mode "view day" --

  /** Get a grid of days in a month.
   * @param selected: Date | null | undefined; // Selected date.
   * @param dayStartWeek: number; // 0-Sunday (default), 1-Monday;
   * @param initDate: Date; // Start date, used if "selected date" is not specified.
   * @param today: Date; // Today's date
   */
  public static getDayCellRowList(selected: Date | null, dayStartWeek: number, initDate: Date, today: Date): CalendarDayCellRow[] {
    const result: CalendarDayCellRow[] = [];
    const selectedYear: number | undefined = selected?.getFullYear();
    const selectedMonth: number | undefined = selected?.getMonth();
    const selectedDay: number | undefined = selected?.getDate();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    const todayDay: number = today.getDate();

    const itemDate: Date = new Date(initDate.getFullYear(), initDate.getMonth(), 1, 0, 0, 0, 0);
    const currMonth: number = itemDate.getMonth();
    // Date.getDay() 0-Sun, 1-Mon, 2-Tue, 3-Wed, 4-Thu, 5-Fri, 6-Sat;
    const dayWeek1: number = itemDate.getDay();
    itemDate.setDate(dayStartWeek !== dayWeek1 ? dayStartWeek - dayWeek1 : -7);
    let hasSelected: boolean = selected == null;
    let hasToday: boolean = false;
    let calendarRow: CalendarDayCellRow | undefined;
    let state: CALENDAR_DAY_STATE = CALENDAR_DAY_PREVIOUS;
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
      state = isSelected ? CALENDAR_DAY_SELECTED : month === currMonth ? CALENDAR_DAY_CURRENT : CALENDAR_DAY_PREVIOUS;

      const isToday: boolean | undefined = !hasToday && year === todayYear && month === todayMonth && day === todayDay ? true : undefined;
      if (!hasToday && isToday) {
        hasToday = true;
      }
      if (dayStartWeek === dayWeek) {
        calendarRow = { cellList: [], weekNumberObj: { weekNumber: DateUtil.getWeekNumber(itemDate) } };
        result.push(calendarRow);
      }
      const label: string = GlnCalendarUtil.getLabelByDate(itemDate) || '';
      const isDayoff = dayWeek == 0 || dayWeek == 6 ? true : undefined;
      const day2d: string = ('0' + day.toString()).slice(-2);

      calendarRow?.cellList.push({ year, month, day, day2d, dayWeek, state, label, isToday, isDayoff });
      idx++;
    }
    return result;
  }
  public static getLabelByDate(date: Date | null): string | null {
    let result: string | null = null;
    if (date != null) {
      result = new Intl.DateTimeFormat('default', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } // 'Thu, June 8, 2023'
    return result;
  }
  /** Get a list of days of the week.
   * @param sizeDayWeek: number; // 1-'narrow'(T); 2,3-'short'(Thu); -1-'long'(Thursday);
   * @param dayStartWeek: number; // 0-Sunday (default), 1-Monday;
   */
  public static getDayNameList(sizeDayWeek: number, dayStartWeek: number): CalendarDayName[] {
    const result: CalendarDayName[] = [];
    const dayWeekRes: 'long' | 'short' | 'narrow' = sizeDayWeek <= 0 || 3 < sizeDayWeek ? 'long' : 1 === sizeDayWeek ? 'narrow' : 'short';
    const now: Date = new Date();
    const current: Date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    current.setDate(current.getDate() - current.getDay() - 1 + dayStartWeek);
    for (let i = 1; i < 8; i++) {
      current.setDate(current.getDate() + 1);
      const value: string = DateUtil.getNameWeekday(current, dayWeekRes);
      const dayWeek: number = current.getDay();
      const name: string = sizeDayWeek > 0 ? value.substring(0, sizeDayWeek) : value;
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

  public static getDateByItsDetails(value: Date, year: number | null, month: number | null, day: number | null): Date {
    const newYear: number = year || value.getFullYear();
    const newMonth: number = month || value.getMonth();
    const newDay: number = day || value.getDate();
    const isCorrectYearMonthDay: boolean = GlnCalendarUtil.checkYearMonthDayAsDate(newYear, newMonth, newDay);
    return isCorrectYearMonthDay ? new Date(newYear, newMonth, newDay, 0, 0, 0, 0) : GlnCalendarUtil.getLastDayOfMonth(newYear, newMonth);
  }
  public static getFirstYearOfPeriod(years: number, yearsPerPage: number): number {
    let result: number = -1;
    if (0 < years && CALENDAR_YEAR_MIN <= years && years <= CALENDAR_YEAR_MAX && 0 < yearsPerPage && yearsPerPage < 101) {
      const delta: number = years - CALENDAR_YEAR_MIN;
      const valueResult = CALENDAR_YEAR_MIN + Math.trunc(delta / yearsPerPage) * yearsPerPage;
      result = valueResult <= CALENDAR_YEAR_MAX - yearsPerPage ? valueResult : result;
    }
    return result;
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
    return [GlnCalendarUtil.VIEW_DAY, GlnCalendarUtil.VIEW_YEAR, GlnCalendarUtil.VIEW_MONTH];
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
  public static isMoreMinDate(date: Date, minDate: Date | null | undefined): boolean {
    const currYear: number = date.getFullYear();
    const minYear: number = (minDate || date).getFullYear();
    const currMonth: number = date.getMonth();
    const minMonth: number = (minDate || date).getMonth();
    return minYear < currYear || (minYear === currYear && minMonth <= currMonth);
  }
  public static isLessMaxDate(date: Date, maxDate: Date | null | undefined): boolean {
    const currYear: number = date.getFullYear();
    const maxYear: number = (maxDate || date).getFullYear();
    const currMonth: number = date.getMonth();
    const maxMonth: number = (maxDate || date).getMonth();
    return currYear < maxYear || (currYear === maxYear && currMonth <= maxMonth);
  }
}
