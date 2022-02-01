import { InputExterior } from '../interfaces/input-exterior.interface';

export interface PaddingVerRes {
  labelPaddingTop: number | null;
  labelPaddingBottom: number | null;
}

export interface TranslateVerRes {
  labelTranslateY: number | null;
  label2TranslateY: number | null;
}

export class InputLabelUtil {
  // Get the top or bottom padding for the GrnFrameInpu element.
  public static paddingTpBt(isTop: boolean, exterior: InputExterior | null, frameSize: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSize > 0 && lineHeight != null) {
      if (exterior === InputExterior.outlined) {
        result = (frameSize - lineHeight) / 2;
      } else {
        result = (frameSize - lineHeight) * (isTop ? 0.75 : 0.25);
      }
    }
    return result;
  }

  public static paddingVer(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): PaddingVerRes {
    const labelPaddingTop = InputLabelUtil.paddingTpBt(true, exterior, frameSizeValue, lineHeight);
    const labelPaddingBottom = InputLabelUtil.paddingTpBt(false, exterior, frameSizeValue, lineHeight);
    return { labelPaddingTop, labelPaddingBottom };
  }
  // Get left/right padding for the GrnFrameInpu element.
  public static paddingLfRg(exterior: InputExterior, frameSizeVal: number, configLabelPd: number | undefined): number | null {
    let result: number | null = configLabelPd || null;
    if (frameSizeVal > 0 && (!result || result <= 0)) {
      if (exterior === InputExterior.outlined) {
        result = Math.round(100 * 0.25 * frameSizeVal) / 100;
      } else if (exterior === InputExterior.underline) {
        result = Math.round(100 * 0.21428 * frameSizeVal) / 100;
      }
    }
    return result;
  }
  // Determines the y transform value at the shrink position (top).
  public static translateY(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round(100 * lineHeight * 0.25) / 100;
      if (exterior === InputExterior.standard) {
        result = Math.round(100 * ((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4)) / 100;
      } else if (exterior === InputExterior.outlined) {
        result = Math.round(100 * ((-0.75 * lineHeight) / 2)) / 100;
      } else if (exterior === InputExterior.underline) {
        result = Math.round(100 * ((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45)) / 100;
      }
    }
    return result;
  }
  // Determines the y transform value at the unshrink position (in the middle).
  public static translate2Y(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight != null) {
      result = Math.round(100 * ((frameSizeValue - lineHeight) * (InputExterior.standard === exterior ? 0.75 : 0.5))) / 100;
    }
    return result;
  }

  public static translateVer(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number | null): TranslateVerRes {
    const labelTranslateY = InputLabelUtil.translateY(exterior, frameSizeValue, lineHeight);
    const label2TranslateY = InputLabelUtil.translate2Y(exterior, frameSizeValue, lineHeight);
    return { labelTranslateY, label2TranslateY };
  }
}
