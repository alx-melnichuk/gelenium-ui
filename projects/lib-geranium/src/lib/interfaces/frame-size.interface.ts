export enum FrameSize {
  sizeShort = 'szShort',
  sizeSmall = 'szSmall',
  sizeMiddle = 'szMiddle', // 50px
  sizeWide = 'szWide', //     56px
  sizeLarge = 'szLarge',
  sizeHuge = 'szHuge',
}

export enum FrameSizeValue {
  sizeShort = 38, // 38px - bootstrap
  sizeSmall = 44,
  sizeMiddle = 50,
  sizeWide = 56,
  sizeLarge = 62,
  sizeHuge = 68,
}

export class FrameSizeUtil {
  public static create(value: string): FrameSize | null {
    let result: FrameSize | null = null;
    switch (value) {
      case FrameSize.sizeShort.valueOf():
        result = FrameSize.sizeShort;
        break;
      case FrameSize.sizeSmall.valueOf():
        result = FrameSize.sizeSmall;
        break;
      case FrameSize.sizeMiddle.valueOf():
        result = FrameSize.sizeMiddle;
        break;
      case FrameSize.sizeWide.valueOf():
        result = FrameSize.sizeWide;
        break;
      case FrameSize.sizeLarge.valueOf():
        result = FrameSize.sizeLarge;
        break;
      case FrameSize.sizeHuge.valueOf():
        result = FrameSize.sizeHuge;
        break;
    }
    return result;
  }
  public static isShort(value: FrameSize): boolean {
    return FrameSize.sizeShort === value;
  }
  public static isSmall(value: FrameSize): boolean {
    return FrameSize.sizeSmall === value;
  }
  public static isMiddle(value: FrameSize): boolean {
    return FrameSize.sizeMiddle === value;
  }
  public static isWide(value: FrameSize): boolean {
    return FrameSize.sizeWide === value;
  }
  public static isLarge(value: FrameSize): boolean {
    return FrameSize.sizeLarge === value;
  }
  public static isHuge(value: FrameSize): boolean {
    return FrameSize.sizeHuge === value;
  }
  public static setFrameSize(
    szShort: string | null,
    szSmall: string | null,
    szMiddle: string | null,
    szNormal: string | null,
    szLarge: string | null,
    szHuge: string | null
  ): FrameSize | null {
    let result: FrameSize | null = null;
    if (szShort !== null) {
      result = FrameSize.sizeShort;
    }
    if (szSmall !== null) {
      result = FrameSize.sizeSmall;
    }
    if (szMiddle !== null) {
      result = FrameSize.sizeMiddle;
    }
    if (szNormal !== null) {
      result = FrameSize.sizeWide;
    }
    if (szLarge !== null) {
      result = FrameSize.sizeLarge;
    }
    if (szHuge !== null) {
      result = FrameSize.sizeHuge;
    }
    return result;
  }
  public static getValue(frameSize: FrameSize | null): number | null {
    let result: number | null = null;
    switch (frameSize) {
      case FrameSize.sizeShort:
        result = FrameSizeValue.sizeShort;
        break;
      case FrameSize.sizeSmall:
        result = FrameSizeValue.sizeSmall;
        break;
      case FrameSize.sizeMiddle:
        result = FrameSizeValue.sizeMiddle;
        break;
      case FrameSize.sizeWide:
        result = FrameSizeValue.sizeWide;
        break;
      case FrameSize.sizeLarge:
        result = FrameSizeValue.sizeLarge;
        break;
      case FrameSize.sizeHuge:
        result = FrameSizeValue.sizeHuge;
        break;
    }
    return result;
  }
}
