export type ButtonExteriorType = 'text' | 'contained' | 'underline';

export enum ButtonExterior {
  text = 'text',
  contained = 'contained',
  outlined = 'outlined',
}

export class ButtonExteriorUtil {
  public static create(value: ButtonExterior | null): ButtonExterior {
    return ButtonExteriorUtil.convert((value || '').toString() || ButtonExterior.text.toString()) as ButtonExterior;
  }
  public static convert(value: string | null): ButtonExterior | null {
    let result: ButtonExterior | null = null;
    switch (value) {
      case ButtonExterior.text.valueOf():
        result = ButtonExterior.text;
        break;
      case ButtonExterior.contained.valueOf():
        result = ButtonExterior.contained;
        break;
      case ButtonExterior.outlined.valueOf():
        result = ButtonExterior.outlined;
        break;
    }
    return result;
  }

  public static isText(value: ButtonExterior | null): boolean {
    return ButtonExterior.text === value;
  }
  public static isContained(value: ButtonExterior | null): boolean {
    return ButtonExterior.contained === value;
  }
  public static isOutlined(value: ButtonExterior | null): boolean {
    return ButtonExterior.outlined === value;
  }
}
