export type ExteriorType = 'standard' | 'outlined' | 'underline';

export enum Exterior {
  standard = 'standard',
  outlined = 'outlined',
  underline = 'underline',
}

export class ExteriorUtil {
  public static create(value: Exterior | null): Exterior {
    return ExteriorUtil.convert((value || '').toString() || Exterior.outlined.toString()) as Exterior;
  }
  public static convert(value: string | null): Exterior | null {
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
  public static isOutlined(value: Exterior | null): boolean {
    return Exterior.outlined === value;
  }
  public static isUnderline(value: Exterior | null): boolean {
    return Exterior.underline === value;
  }
  public static isStandard(value: Exterior | null): boolean {
    return Exterior.standard === value;
  }
}
