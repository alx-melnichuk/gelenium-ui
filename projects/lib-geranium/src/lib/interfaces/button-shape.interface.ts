export type ButtonShapeType = 'text' | 'contained' | 'underline';

export enum ButtonShape {
  text = 'text',
  contained = 'contained',
  outlined = 'outlined',
}

export class ButtonShapeUtil {
  public static create(value: ButtonShape | null): ButtonShape {
    return ButtonShapeUtil.convert((value || '').toString() || ButtonShape.text.toString()) as ButtonShape;
  }
  public static convert(value: string | null): ButtonShape | null {
    let result: ButtonShape | null = null;
    switch (value) {
      case ButtonShape.text.valueOf():
        result = ButtonShape.text;
        break;
      case ButtonShape.contained.valueOf():
        result = ButtonShape.contained;
        break;
      case ButtonShape.outlined.valueOf():
        result = ButtonShape.outlined;
        break;
    }
    return result;
  }

  public static isText(value: ButtonShape | null): boolean {
    return ButtonShape.text === value;
  }
  public static isContained(value: ButtonShape | null): boolean {
    return ButtonShape.contained === value;
  }
  public static isOutlined(value: ButtonShape | null): boolean {
    return ButtonShape.outlined === value;
  }
}
