// Horizontal position
export type GlnOptionListPositionType = 'start' | 'center' | 'end';

/** Horizontal position = 'start' | 'center' | 'end'; */
export enum GlnOptionListPosition {
  start = 'start',
  center = 'center',
  end = 'end',
}

export class GlnOptionListPositionUtil {
  public static create(value: GlnOptionListPosition | string | null): GlnOptionListPosition {
    return GlnOptionListPositionUtil.convert((value || '').toString()) || GlnOptionListPosition.start;
  }
  public static convert(value: string | null): GlnOptionListPosition | null {
    let result: GlnOptionListPosition | null = null;
    switch (value) {
      case GlnOptionListPosition.start.valueOf():
        result = GlnOptionListPosition.start;
        break;
      case GlnOptionListPosition.center.valueOf():
        result = GlnOptionListPosition.center;
        break;
      case GlnOptionListPosition.end.valueOf():
        result = GlnOptionListPosition.end;
        break;
    }
    return result;
  }
}
