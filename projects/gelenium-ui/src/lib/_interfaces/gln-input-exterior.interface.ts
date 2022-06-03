export type GlnInputExteriorType = 'standard' | 'outlined' | 'underline';

export enum GlnInputExterior {
  standard = 'standard',
  outlined = 'outlined',
  underline = 'underline',
}

export class GlnInputExteriorUtil {
  public static create(value: GlnInputExterior | null): GlnInputExterior {
    return GlnInputExteriorUtil.convert((value || '').toString()) || GlnInputExterior.outlined;
  }
  public static convert(value: string | null): GlnInputExterior | null {
    let result: GlnInputExterior | null = null;
    switch (value) {
      case GlnInputExterior.standard.valueOf():
        result = GlnInputExterior.standard;
        break;
      case GlnInputExterior.outlined.valueOf():
        result = GlnInputExterior.outlined;
        break;
      case GlnInputExterior.underline.valueOf():
        result = GlnInputExterior.underline;
        break;
    }
    return result;
  }
  public static isOutlined(value: GlnInputExterior | null): boolean {
    return GlnInputExterior.outlined === value;
  }
  public static isUnderline(value: GlnInputExterior | null): boolean {
    return GlnInputExterior.underline === value;
  }
  public static isStandard(value: GlnInputExterior | null): boolean {
    return GlnInputExterior.standard === value;
  }
}
