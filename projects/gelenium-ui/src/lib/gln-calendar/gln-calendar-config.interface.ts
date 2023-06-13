export interface GlnCalendarConfig {
  cellSize?: number | string | undefined; // 'short','small','middle','wide','large','huge'
  isHideOldDays?: boolean | undefined;
  isHideDayoff?: boolean | undefined;
  isHorizont?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isStartSunday?: boolean | undefined;
  isWeekNumber?: boolean | undefined;
  sizeDayWeek?: number | string | undefined; // number (1, 2, 3, -1), 'narrow'-(T), 'short'-(Thu), 'long'-(Thursday)
}
