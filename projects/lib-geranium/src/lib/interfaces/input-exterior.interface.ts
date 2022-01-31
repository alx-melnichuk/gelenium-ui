export type InputExteriorType = 'standard' | 'outlined' | 'underline';

export enum InputExterior {
  standard = 'standard',
  outlined = 'outlined',
  underline = 'underline',
}

export class InputExteriorUtil {
  public static create(value: InputExterior | null): InputExterior {
    return InputExteriorUtil.convert((value || '').toString()) || InputExterior.outlined;
  }
  public static convert(value: string | null): InputExterior | null {
    let result: InputExterior | null = null;
    switch (value) {
      case InputExterior.standard.valueOf():
        result = InputExterior.standard;
        break;
      case InputExterior.outlined.valueOf():
        result = InputExterior.outlined;
        break;
      case InputExterior.underline.valueOf():
        result = InputExterior.underline;
        break;
    }
    return result;
  }
  public static isOutlined(value: InputExterior | null): boolean {
    return InputExterior.outlined === value;
  }
  public static isUnderline(value: InputExterior | null): boolean {
    return InputExterior.underline === value;
  }
  public static isStandard(value: InputExterior | null): boolean {
    return InputExterior.standard === value;
  }
}
