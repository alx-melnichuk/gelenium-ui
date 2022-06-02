export type ButtonExteriorType = 'text' | 'contained' | 'underline';

export enum ButtonExterior {
  contained = 'contained',
  outlined = 'outlined',
  text = 'text',
}

export class ButtonExteriorUtil {
  public static create(value: ButtonExterior | null): ButtonExterior {
    return ButtonExteriorUtil.convert((value || '').toString()) || ButtonExterior.text;
  }
  public static convert(value: string | null): ButtonExterior | null {
    let result: ButtonExterior | null = null;
    switch (value) {
      case ButtonExterior.contained.valueOf():
        result = ButtonExterior.contained;
        break;
      case ButtonExterior.outlined.valueOf():
        result = ButtonExterior.outlined;
        break;
      case ButtonExterior.text.valueOf():
        result = ButtonExterior.text;
        break;
    }
    return result;
  }

  public static isContained(value: ButtonExterior | null): boolean {
    return ButtonExterior.contained === value;
  }
  public static isOutlined(value: ButtonExterior | null): boolean {
    return ButtonExterior.outlined === value;
  }
  public static isText(value: ButtonExterior | null): boolean {
    return ButtonExterior.text === value;
  }
}
