export type OrnamAlignType = 'default' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';

export enum OrnamAlign {
  default = 'default',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  baseline = 'baseline',
  stretch = 'stretch',
}

export class OrnamAlignUtil {
  public static create(value: OrnamAlign | null, defaultValue: OrnamAlign | null): OrnamAlign {
    return OrnamAlignUtil.convert((value || defaultValue || '').toString(), OrnamAlign.default) as OrnamAlign;
  }
  public static convert(value: string | null, defaultValue: OrnamAlign | null = null): OrnamAlign | null {
    let result: OrnamAlign | null = defaultValue;
    switch (value) {
      case OrnamAlign.default.valueOf():
        result = OrnamAlign.default;
        break;
      case OrnamAlign.center.valueOf():
        result = OrnamAlign.center;
        break;
      case OrnamAlign.flexStart.valueOf():
        result = OrnamAlign.flexStart;
        break;
      case OrnamAlign.flexEnd.valueOf():
        result = OrnamAlign.flexEnd;
        break;
      case OrnamAlign.baseline.valueOf():
        result = OrnamAlign.baseline;
        break;
      case OrnamAlign.stretch.valueOf():
        result = OrnamAlign.stretch;
        break;
    }
    return result;
  }
}
