export type GlnFrameOrnamAlignType = 'default' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';

export enum GlnFrameOrnamAlign {
  default = 'default',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  baseline = 'baseline',
  stretch = 'stretch',
}

export class GlnFrameOrnamAlignUtil {
  public static create(value: GlnFrameOrnamAlign | null, defaultValue: GlnFrameOrnamAlign | null): GlnFrameOrnamAlign {
    return GlnFrameOrnamAlignUtil.convert((value || defaultValue || '').toString(), GlnFrameOrnamAlign.default) as GlnFrameOrnamAlign;
  }
  public static convert(value: string | null, defaultValue: GlnFrameOrnamAlign | null = null): GlnFrameOrnamAlign | null {
    let result: GlnFrameOrnamAlign | null = defaultValue;
    switch (value) {
      case GlnFrameOrnamAlign.default.valueOf():
        result = GlnFrameOrnamAlign.default;
        break;
      case GlnFrameOrnamAlign.center.valueOf():
        result = GlnFrameOrnamAlign.center;
        break;
      case GlnFrameOrnamAlign.flexStart.valueOf():
        result = GlnFrameOrnamAlign.flexStart;
        break;
      case GlnFrameOrnamAlign.flexEnd.valueOf():
        result = GlnFrameOrnamAlign.flexEnd;
        break;
      case GlnFrameOrnamAlign.baseline.valueOf():
        result = GlnFrameOrnamAlign.baseline;
        break;
      case GlnFrameOrnamAlign.stretch.valueOf():
        result = GlnFrameOrnamAlign.stretch;
        break;
    }
    return result;
  }
}
