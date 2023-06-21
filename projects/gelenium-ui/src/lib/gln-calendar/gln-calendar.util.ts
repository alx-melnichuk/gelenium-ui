import { DateUtil } from '../_utils/date.util';

export interface CalendarViewDay {
  yearValue: number;
  yearName: string;
  monthValue: number;
  monthName: string;
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
}
