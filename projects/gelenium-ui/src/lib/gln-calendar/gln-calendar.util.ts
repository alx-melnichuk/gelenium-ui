import { DateUtil } from '../_utils/date.util';

export interface CalendarDayCellRow {
  cellList: CalendarDayCell[];
  weekNumberObj: { weekNumber: number };
}

export type CALENDAR_DAY_STATE = 'curr' | 'old' | 'slct';
export const CALENDAR_DAY_CURRENT = 'curr';
export const CALENDAR_DAY_PREVIOUS = 'old';
export const CALENDAR_DAY_SELECTED = 'slct';

export interface CalendarDayCell {
  year: number;
  month: number;
  day: number;
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

      calendarRow?.cellList.push({ year, month, day, dayWeek, state, label, isToday, isDayoff });
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

  public static updateDateByParts(value: Date, year: number | null, month: number | null, day: number | null): Date {
    const newYear: number = year || value.getFullYear();
    const newMonth: number = month || value.getMonth();
    const newDay: number = day || value.getDate();
    const isCorrectYearMonthDay: boolean = GlnCalendarUtil.checkYearMonthDayAsDate(newYear, newMonth, newDay);
    return isCorrectYearMonthDay ? new Date(newYear, newMonth, newDay, 0, 0, 0, 0) : GlnCalendarUtil.getLastDayOfMonth(newYear, newMonth);
  }
}
