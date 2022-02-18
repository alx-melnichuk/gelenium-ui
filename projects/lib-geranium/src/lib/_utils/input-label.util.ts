import { InputExterior } from '../_interfaces/input-exterior.interface';

export interface TranslateVerRes {
  translateY: number | null;
  translateY2: number | null;
}

export class InputLabelUtil {
  // Determines the y transform value at the shrink position (top).
  public static translateY(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round(lineHeight * 0.25 * 100) / 100;
      if (exterior === InputExterior.standard) {
        result = Math.round((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4 * 100) / 100;
      } else if (exterior === InputExterior.outlined) {
        result = Math.round(((-0.75 * lineHeight) / 2) * 100) / 100;
      } else if (exterior === InputExterior.underline) {
        result = Math.round((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45 * 100) / 100;
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public static translate2Y(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round((frameSizeValue - lineHeight) * (InputExterior.standard === exterior ? 0.75 : 0.5) * 100) / 100;
    }
    return result;
  }

  public static translateVer(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): TranslateVerRes {
    const translateY = InputLabelUtil.translateY(exterior, frameSizeValue, lineHeight);
    const translateY2 = InputLabelUtil.translate2Y(exterior, frameSizeValue, lineHeight);
    return { translateY, translateY2 };
  }
}
