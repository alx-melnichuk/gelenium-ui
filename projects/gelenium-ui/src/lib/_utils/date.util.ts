export class DateUtil {
  /** Get the week number for the specified date. */
  public static getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  }
}
