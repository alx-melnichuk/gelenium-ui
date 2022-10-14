export type GlnFrameExteriorType = 'standard' | 'outlined' | 'underline';

export enum GlnFrameExterior {
  standard = 'standard',
  outlined = 'outlined',
  underline = 'underline',
}

export class GlnFrameExteriorUtil {
  public static create(value: GlnFrameExterior | string | null): GlnFrameExterior {
    return GlnFrameExteriorUtil.convert((value || '').toString()) || GlnFrameExterior.outlined;
  }
  public static convert(value: string | null): GlnFrameExterior | null {
    let result: GlnFrameExterior | null = null;
    switch (value) {
      case GlnFrameExterior.standard.valueOf():
        result = GlnFrameExterior.standard;
        break;
      case GlnFrameExterior.outlined.valueOf():
        result = GlnFrameExterior.outlined;
        break;
      case GlnFrameExterior.underline.valueOf():
        result = GlnFrameExterior.underline;
        break;
    }
    return result;
  }
  public static isOutlined(value: GlnFrameExterior | null): boolean {
    return GlnFrameExterior.outlined === value;
  }
  public static isUnderline(value: GlnFrameExterior | null): boolean {
    return GlnFrameExterior.underline === value;
  }
  public static isStandard(value: GlnFrameExterior | null): boolean {
    return GlnFrameExterior.standard === value;
  }
}
