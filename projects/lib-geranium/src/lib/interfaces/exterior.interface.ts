export enum Exterior {
  standard = 'standard',
  outlined = 'outlined',
  underline = 'underline',
}

export class ExteriorUtil {
  public static create(value: string): Exterior | null {
    let result: Exterior | null = null;
    switch (value) {
      case Exterior.standard.valueOf():
        result = Exterior.standard;
        break;
      case Exterior.outlined.valueOf():
        result = Exterior.outlined;
        break;
      case Exterior.underline.valueOf():
        result = Exterior.underline;
        break;
    }
    return result;
  }
  public static isOutlined(value: Exterior): boolean {
    return Exterior.outlined === value;
  }
  public static isUnderline(value: Exterior): boolean {
    return Exterior.underline === value;
  }
  public static isStandard(value: Exterior): boolean {
    return Exterior.standard === value;
  }
  public static setExterior(exterOutlined: string | null, exterUnderline: string | null, exterStandard: string | null): Exterior {
    let result = Exterior.standard;
    result = exterOutlined !== null ? Exterior.outlined : result;
    result = exterUnderline !== null ? Exterior.underline : result;
    result = exterStandard !== null ? Exterior.standard : result;
    return result;
  }
}
