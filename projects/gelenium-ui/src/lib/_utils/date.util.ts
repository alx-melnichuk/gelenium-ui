export class DateUtil {
  /** Compare two dates (d1 < d2 = -1; d1 == d2 = 0; d1 > d2 = 1;) */
  public static compare(date1: Date | null | undefined, date2: Date | null | undefined): number {
    let result: number = 0;
    if (date1 == null && date2 != null) {
      result = -1;
    } else if (date1 != null && date2 == null) {
      result = 1;
    } else if (date1 != null && date2 != null) {
      const num1: number = date1.getFullYear() * 10000 + date1.getMonth() * 100 + date1.getDate();
      const num2: number = date2.getFullYear() * 10000 + date2.getMonth() * 100 + date2.getDate();
      result = num1 === num2 ? 0 : num1 > num2 ? 1 : -1;
    }
    return result;
  }
  /** Get the day number of the start of the week by locale. */
  public static getDayStartWeekByLocale(): number {
    const he1: any = new Intl.Locale('default'); // dayStartWeek
    return he1.weekInfo?.firstDay || 0;
  }
  /** Get the week number for the specified date. */
  public static getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  }
  public static convertMonthFormat(month: string | undefined): 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined {
    let result: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
    if (!!month) {
      result = !result ? (month === 'numeric' ? 'numeric' : month === '2-digit' ? '2-digit' : undefined) : result;
      result = !result ? (month === 'long' ? 'long' : month === 'short' ? 'short' : month === 'narrow' ? 'narrow' : undefined) : result;
    }
    return result;
  }
  /** Get date information in the specified format. */
  /*interface DateTimeFormatOptions {
      localeMatcher?: "best fit" | "lookup" | undefined;
      weekday?: "long" | "short" | "narrow" | undefined;
      era?: "long" | "short" | "narrow" | undefined;
      year?: "numeric" | "2-digit" | undefined;
      month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
      day?: "numeric" | "2-digit" | undefined;
      hour?: "numeric" | "2-digit" | undefined;
      minute?: "numeric" | "2-digit" | undefined;
      second?: "numeric" | "2-digit" | undefined;
      timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
      formatMatcher?: "best fit" | "basic" | undefined;
      hour12?: boolean | undefined;
      timeZone?: string | undefined;
  }*/
  public static formatDateTime(d: Date, options: Intl.DateTimeFormatOptions | undefined, locales?: string | string[] | undefined): string {
    return new Intl.DateTimeFormat(locales || 'default', options).format(d);
  }

  /** Add "delta" years for the specified date. */
  public static addYear(d: Date, delta: number = 1): Date {
    return new Date(d.getFullYear() + delta, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  }
  /** Add "delta" months for the specified date. */
  public static addMonth(d: Date, delta: number = 1): Date {
    return new Date(d.getFullYear(), d.getMonth() + delta, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  }
  /** Add "delta" days for the specified date. */
  public static addDay(d: Date, delta: number = 1): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  }
}
