export interface GlnCalendarConfig {
  cellSize?: number | string | undefined; // 'short','small','middle','wide','large','huge'
  formatByMonths?: string | undefined; // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
  formatForMonth?: string | undefined; // 'numeric' (6), '2-digit' (06), 'long' (June) 'short' (Jun), 'narrow' (J)
  isHideOldDays?: boolean | undefined;
  isHideDayoff?: boolean | undefined;
  isHorizont?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isStartSunday?: boolean | undefined;
  isTwoDigitDay?: boolean | undefined;
  isWeekNumber?: boolean | undefined;
  numberOfYears?: number | undefined;
  startDate?: Date | undefined;
  sizeDayWeek?: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
}
