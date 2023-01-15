export type GlnSizeType = 'short' | 'small' | 'middle' | 'wide' | 'large' | 'huge';

export enum GlnSize {
  short = 'short',
  small = 'small',
  middle = 'middle',
  wide = 'wide',
  large = 'large',
  huge = 'huge',
}

export enum GlnSizeValue {
  short = 38,
  small = 44,
  middle = 50,
  wide = 56,
  large = 62,
  huge = 68,
}

export class GlnSizeUtil {
  public static create(value: GlnSize | string | null): GlnSize {
    return GlnSizeUtil.convert((value || '').toString()) || GlnSize.middle;
  }
  public static convert(value: string | null): GlnSize | null {
    let result: GlnSize | null = null;
    switch (value) {
      case GlnSize.short.valueOf():
        result = GlnSize.short;
        break;
      case GlnSize.small.valueOf():
        result = GlnSize.small;
        break;
      case GlnSize.middle.valueOf():
        result = GlnSize.middle;
        break;
      case GlnSize.wide.valueOf():
        result = GlnSize.wide;
        break;
      case GlnSize.large.valueOf():
        result = GlnSize.large;
        break;
      case GlnSize.huge.valueOf():
        result = GlnSize.huge;
        break;
    }
    return result;
  }
  public static isShort(value: GlnSize | null): boolean {
    return GlnSize.short === value;
  }
  public static isSmall(value: GlnSize | null): boolean {
    return GlnSize.small === value;
  }
  public static isMiddle(value: GlnSize | null): boolean {
    return GlnSize.middle === value;
  }
  public static isWide(value: GlnSize | null): boolean {
    return GlnSize.wide === value;
  }
  public static isLarge(value: GlnSize | null): boolean {
    return GlnSize.large === value;
  }
  public static isHuge(value: GlnSize | null): boolean {
    return GlnSize.huge === value;
  }
  public static getValue(spinnerSize: GlnSize | null): number | null {
    let result: number | null = null;
    switch (spinnerSize) {
      case GlnSize.short:
        result = GlnSizeValue.short;
        break;
      case GlnSize.small:
        result = GlnSizeValue.small;
        break;
      case GlnSize.middle:
        result = GlnSizeValue.middle;
        break;
      case GlnSize.wide:
        result = GlnSizeValue.wide;
        break;
      case GlnSize.large:
        result = GlnSizeValue.large;
        break;
      case GlnSize.huge:
        result = GlnSizeValue.huge;
        break;
    }
    return result;
  }
  public static getSizeValue(spinnerSize: string | null | undefined): number {
    let result: number = 0;
    const numberFromSpinnerSize = spinnerSize ? Number(spinnerSize) : 0;
    if (!isNaN(numberFromSpinnerSize) && numberFromSpinnerSize > 0) {
      result = numberFromSpinnerSize;
    } else {
      const spinnerSizeVal = GlnSizeUtil.create(GlnSizeUtil.convert(spinnerSize || null));
      result = GlnSizeUtil.getValue(spinnerSizeVal) || 0;
    }
    return result;
  }
}
