import { GlnButtonExterior } from './gln-button-exterior.interface';

export class GlnButtonUtil {
  /** Get css parameters for the button. */
  public static getCssParams(
    exterior: string,
    size: number | null,
    lineHeight: number
  ): { borderRadius?: number; paddingLeft?: number; paddingTop?: number } {
    let borderRadius: number | undefined;
    let paddingLeft: number | undefined;
    let paddingTop: number | undefined;

    if (size != null && size > 0 && lineHeight > 0) {
      borderRadius = Math.round(0.1 * size * 100) / 100;
      const param = (size - lineHeight) / 2;
      if (exterior === GlnButtonExterior.contained) {
        paddingLeft = Math.round(0.3636 * size * 100) / 100;
        paddingTop = param;
      } else if (exterior === GlnButtonExterior.outlined) {
        paddingLeft = Math.round(0.3409 * size * 100) / 100;
        paddingTop = param - 1;
      } else if (exterior === GlnButtonExterior.text) {
        paddingLeft = Math.round(0.2045 * size * 100) / 100;
        paddingTop = param;
      }
    }
    return { borderRadius, paddingLeft, paddingTop };
  }
}
