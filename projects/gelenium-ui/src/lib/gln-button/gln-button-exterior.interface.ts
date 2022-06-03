export type GlnButtonExteriorType = 'text' | 'contained' | 'underline';

export enum GlnButtonExterior {
  contained = 'contained',
  outlined = 'outlined',
  text = 'text',
}

export class GlnButtonExteriorUtil {
  public static create(value: GlnButtonExterior | null): GlnButtonExterior {
    return GlnButtonExteriorUtil.convert((value || '').toString()) || GlnButtonExterior.text;
  }
  public static convert(value: string | null): GlnButtonExterior | null {
    let result: GlnButtonExterior | null = null;
    switch (value) {
      case GlnButtonExterior.contained.valueOf():
        result = GlnButtonExterior.contained;
        break;
      case GlnButtonExterior.outlined.valueOf():
        result = GlnButtonExterior.outlined;
        break;
      case GlnButtonExterior.text.valueOf():
        result = GlnButtonExterior.text;
        break;
    }
    return result;
  }

  public static isContained(value: GlnButtonExterior | null): boolean {
    return GlnButtonExterior.contained === value;
  }
  public static isOutlined(value: GlnButtonExterior | null): boolean {
    return GlnButtonExterior.outlined === value;
  }
  public static isText(value: GlnButtonExterior | null): boolean {
    return GlnButtonExterior.text === value;
  }
}
