export const CALENDAR_VIEW_DAY = 'day';
export const CALENDAR_VIEW_MONTH = 'month';
export const CALENDAR_VIEW_YEAR = 'year';

export interface GlnCalendarChange {
  changed: 'year' | 'month' | 'day';
  value: Date | null;
}
