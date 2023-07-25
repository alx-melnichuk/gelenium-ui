export interface GlnCalendarConfig {
  cellSize?: number | string | undefined; // 'short','small','middle','wide','large','huge'
  colsByYears?: number | undefined; // [1 - 12]  default 4
  colsByMonths?: number | undefined; // [1 - 12] default 3
  dateClasses?: ((date: Date, view: string, current: Date) => string[]) | undefined;
  formatByMonths?: string | undefined; // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
  formatMonth?: string | undefined; // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
  isHideOldDays?: boolean | undefined;
  isHideDayoff?: boolean | undefined;
  isHorizont?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isStartSunday?: boolean | undefined;
  isTwoDigitDay?: boolean | undefined;
  isWeekNumber?: boolean | undefined;
  locale?: string | undefined; // Locale ('en-US', 'de-DE', 'fr-FR')
  rowsByYears?: number | undefined; // [1 - 12] default 5
  startDate?: Date | undefined;
  sizeDayWeek?: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
  view?: string | undefined; // 'day','month','year' default 'day'
  views?: string[] | undefined; // Array<'day' | 'month' | 'year'>, default ['day', 'year', 'month']
}
