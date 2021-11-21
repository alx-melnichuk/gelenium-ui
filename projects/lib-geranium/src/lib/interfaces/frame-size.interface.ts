export type FrameSizeType = 'short' | 'small' | 'middle' | 'wide' | 'large' | 'huge';

export enum FrameSize {
  short = 'short',
  small = 'small',
  middle = 'middle',
  wide = 'wide',
  large = 'large',
  huge = 'huge',
}

export enum FrameSizeValue {
  short = 38, // 38px - bootstrap
  small = 44,
  middle = 50,
  wide = 56,
  large = 62,
  huge = 68,
}

export class FrameSizeUtil {
  public static create(value: string): FrameSize | null {
    let result: FrameSize | null = null;
    switch (value) {
      case FrameSize.short.valueOf():
        result = FrameSize.short;
        break;
      case FrameSize.small.valueOf():
        result = FrameSize.small;
        break;
      case FrameSize.middle.valueOf():
        result = FrameSize.middle;
        break;
      case FrameSize.wide.valueOf():
        result = FrameSize.wide;
        break;
      case FrameSize.large.valueOf():
        result = FrameSize.large;
        break;
      case FrameSize.huge.valueOf():
        result = FrameSize.huge;
        break;
    }
    return result;
  }
  public static isShort(value: FrameSize): boolean {
    return FrameSize.short === value;
  }
  public static isSmall(value: FrameSize): boolean {
    return FrameSize.small === value;
  }
  public static isMiddle(value: FrameSize): boolean {
    return FrameSize.middle === value;
  }
  public static isWide(value: FrameSize): boolean {
    return FrameSize.wide === value;
  }
  public static isLarge(value: FrameSize): boolean {
    return FrameSize.large === value;
  }
  public static isHuge(value: FrameSize): boolean {
    return FrameSize.huge === value;
  }
  public static getValue(frameSize: FrameSize | null): number | null {
    let result: number | null = null;
    switch (frameSize) {
      case FrameSize.short:
        result = FrameSizeValue.short;
        break;
      case FrameSize.small:
        result = FrameSizeValue.small;
        break;
      case FrameSize.middle:
        result = FrameSizeValue.middle;
        break;
      case FrameSize.wide:
        result = FrameSizeValue.wide;
        break;
      case FrameSize.large:
        result = FrameSizeValue.large;
        break;
      case FrameSize.huge:
        result = FrameSizeValue.huge;
        break;
    }
    return result;
  }
}
