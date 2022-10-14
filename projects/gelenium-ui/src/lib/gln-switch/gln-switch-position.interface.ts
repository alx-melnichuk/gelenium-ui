export enum GlnSwitchPosition {
  top = 'top',
  bottom = 'bottom',
  start = 'start',
  end = 'end',
}
export class GlnSwitchPositionUtil {
  public static create(value: GlnSwitchPosition | null): GlnSwitchPosition {
    return GlnSwitchPositionUtil.convert((value || '').toString()) || GlnSwitchPosition.end;
  }
  public static convert(value: string | null): GlnSwitchPosition | null {
    let result: GlnSwitchPosition | null = null;
    switch (value) {
      case GlnSwitchPosition.top.valueOf():
        result = GlnSwitchPosition.top;
        break;
      case GlnSwitchPosition.bottom.valueOf():
        result = GlnSwitchPosition.bottom;
        break;
      case GlnSwitchPosition.start.valueOf():
        result = GlnSwitchPosition.start;
        break;
      case GlnSwitchPosition.end.valueOf():
        result = GlnSwitchPosition.end;
        break;
    }
    return result;
  }
}
