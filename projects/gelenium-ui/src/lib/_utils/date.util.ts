export class DateUtil {
  /** Get the week number for the specified date. */
  public static getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  }
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
  public static equality(date1: Date | null | undefined, date2: Date | null | undefined): boolean {
    let result: boolean = false;
    if (date1 != null && date2 != null) {
      const num1: number = date1.getFullYear() * 10000 + date1.getMonth() * 100 + date1.getDate();
      const num2: number = date2.getFullYear() * 10000 + date2.getMonth() * 100 + date2.getDate();
      result = num1 === num2;
    }
    return result;
  }
}
