export enum FrameSize {
  sizeShort = 'szShort', //   34px - bootstrap
  sizeSmall = 'szSmall',
  sizeMiddle = 'szMiddle', // 50px
  sizeWide = 'szWide', //     56px
  sizeLarge = 'szLarge',
  sizeHuge = 'szHuge',
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
}
