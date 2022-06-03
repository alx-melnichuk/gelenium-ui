export type GlnFrameSizeType = 'short' | 'small' | 'middle' | 'wide' | 'large' | 'huge';

export enum GlnFrameSize {
  short = 'short',
  small = 'small',
  middle = 'middle',
  wide = 'wide',
  large = 'large',
  huge = 'huge',
}

export enum GlnFrameSizeValue {
  short = 38, // 38px - bootstrap
  small = 44,
  middle = 50,
  wide = 56,
  large = 62,
  huge = 68,
}

export class GlnFrameSizeUtil {
  public static create(value: GlnFrameSize | null): GlnFrameSize {
    return GlnFrameSizeUtil.convert(value ? value.toString() : null) || GlnFrameSize.middle;
  }
  public static convert(value: string | null): GlnFrameSize | null {
    let result: GlnFrameSize | null = null;
    switch (value) {
      case GlnFrameSize.short.valueOf():
        result = GlnFrameSize.short;
        break;
      case GlnFrameSize.small.valueOf():
        result = GlnFrameSize.small;
        break;
      case GlnFrameSize.middle.valueOf():
        result = GlnFrameSize.middle;
        break;
      case GlnFrameSize.wide.valueOf():
        result = GlnFrameSize.wide;
        break;
      case GlnFrameSize.large.valueOf():
        result = GlnFrameSize.large;
        break;
      case GlnFrameSize.huge.valueOf():
        result = GlnFrameSize.huge;
        break;
    }
    return result;
  }
  public static isShort(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.short === value;
  }
  public static isSmall(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.small === value;
  }
  public static isMiddle(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.middle === value;
  }
  public static isWide(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.wide === value;
  }
  public static isLarge(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.large === value;
  }
  public static isHuge(value: GlnFrameSize | null): boolean {
    return GlnFrameSize.huge === value;
  }
  public static getValue(frameSize: GlnFrameSize | null): number | null {
    let result: number | null = null;
    switch (frameSize) {
      case GlnFrameSize.short:
        result = GlnFrameSizeValue.short;
        break;
      case GlnFrameSize.small:
        result = GlnFrameSizeValue.small;
        break;
      case GlnFrameSize.middle:
        result = GlnFrameSizeValue.middle;
        break;
      case GlnFrameSize.wide:
        result = GlnFrameSizeValue.wide;
        break;
      case GlnFrameSize.large:
        result = GlnFrameSizeValue.large;
        break;
      case GlnFrameSize.huge:
        result = GlnFrameSizeValue.huge;
        break;
    }
    return result;
  }
}
