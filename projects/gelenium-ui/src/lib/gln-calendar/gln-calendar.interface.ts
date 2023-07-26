export type GlnCalendarCellClassesFun = (date: Date, view: 'day' | 'month' | 'year', current: Date) => string[];

export type GlnCalendarCellDisabledFun = (date: Date, view: 'day' | 'month' | 'year', current: Date) => boolean;
