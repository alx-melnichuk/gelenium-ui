export type GlnOrnamAlignType = 'default' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';

export enum GlnOrnamAlign {
  default = 'default',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  baseline = 'baseline',
  stretch = 'stretch',
}

export class GlnOrnamAlignUtil {
  public static create(value: GlnOrnamAlign | null, defaultValue: GlnOrnamAlign | null): GlnOrnamAlign {
    return GlnOrnamAlignUtil.convert((value || defaultValue || '').toString(), GlnOrnamAlign.default) as GlnOrnamAlign;
  }
  public static convert(value: string | null, defaultValue: GlnOrnamAlign | null = null): GlnOrnamAlign | null {
    let result: GlnOrnamAlign | null = defaultValue;
    switch (value) {
      case GlnOrnamAlign.default.valueOf():
        result = GlnOrnamAlign.default;
        break;
      case GlnOrnamAlign.center.valueOf():
        result = GlnOrnamAlign.center;
        break;
      case GlnOrnamAlign.flexStart.valueOf():
        result = GlnOrnamAlign.flexStart;
        break;
      case GlnOrnamAlign.flexEnd.valueOf():
        result = GlnOrnamAlign.flexEnd;
        break;
      case GlnOrnamAlign.baseline.valueOf():
        result = GlnOrnamAlign.baseline;
        break;
      case GlnOrnamAlign.stretch.valueOf():
        result = GlnOrnamAlign.stretch;
        break;
    }
    return result;
  }
}
