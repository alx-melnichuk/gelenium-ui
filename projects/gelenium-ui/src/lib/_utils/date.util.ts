export class DateUtil {
  /** Compare two dates (d1 > d2 = -1; d1 == d2 = 0; d1 < d2 = 1;) */
  public static compare(date1: Date | null | undefined, date2: Date | null | undefined): number {
    let result: number = -1;
    if (date1 == null && date2 != null) {
      result = 1;
    } else if (date1 != null && date2 != null) {
      const num1: number = date1.getFullYear() * 10000 + date1.getMonth() * 100 + date1.getDate();
      const num2: number = date2.getFullYear() * 10000 + date2.getMonth() * 100 + date2.getDate();
      result = num1 === num2 ? 0 : num1 < num2 ? 1 : -1;
    }
    return result;
  }
  /** Equality of two dates. */
  public static equality(date1: Date | null | undefined, date2: Date | null | undefined): boolean {
    return DateUtil.compare(date1, date2) === 0;
  }
  /** Get the week number for the specified date. */
  public static getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  }
  /** Get the name of the year for the specified date. */
  public static getNameYear(date: Date, year?: 'numeric' | '2-digit' | undefined): string {
    return new Intl.DateTimeFormat('default', { year: year }).format(date);
  }
  /** Get the name of the month for the specified date. */
  public static getNameMonth(date: Date, month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined): string {
    return new Intl.DateTimeFormat('default', { month: month }).format(date);
  }

  public static getNameWeekday(date: Date, weekday?: 'long' | 'short' | 'narrow' | undefined): string {
    return new Intl.DateTimeFormat('default', { weekday: weekday }).format(date);
  }

  public static addMonth(date: Date, delta: number = 1): Date {
    return new Date(date.getFullYear(), date.getMonth() + delta, 1, 0, 0, 0, 0);
  }
}
