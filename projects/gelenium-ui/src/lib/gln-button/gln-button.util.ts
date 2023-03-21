export class GlnButtonUtil {
  /** Get css parameters for the button. */
  public static getCssParams(exterior: string, size: number | null, lineHeight: number): { borderRadius?: number; paddingLeft?: number } {
    let borderRadius: number | undefined;
    let paddingLeft: number | undefined;

    if (size != null && size > 0 && lineHeight > 0) {
      borderRadius = Math.round(0.1 * size * 100) / 100;
      const param = (size - lineHeight) / 2;
      if (exterior === 'contained') {
        paddingLeft = Math.round(0.3636 * size * 100) / 100;
      } else if (exterior === 'outlined') {
        paddingLeft = Math.round(0.3409 * size * 100) / 100;
      } else if (exterior === 'text') {
        paddingLeft = Math.round(0.2045 * size * 100) / 100;
      }
    }
    return { borderRadius, paddingLeft };
  }
}
