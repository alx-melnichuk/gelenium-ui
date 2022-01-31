import { InputExterior } from '../interfaces/input-exterior.interface';

export interface PaddingVertical {
  labelPaddingTop: number | null;
  labelPaddingBottom: number | null;
}

export interface TranslateVertical {
  labelTranslateY: number | null;
  label2TranslateY: number | null;
}

export class InputLabelUtil {
  // Get the top or bottom padding for the GrnFrameInpu element.
  public static paddingVer(isTop: boolean, exterior: InputExterior | null, frameSize: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      switch (exterior) {
        case InputExterior.outlined:
          result = (frameSize - lineHeight) / 2; // calc((var(--size) - var(--gfi-ln-hg))/2)
          break;
        case InputExterior.underline:
          result = (frameSize - lineHeight) * (isTop ? 0.75 : 0.25); // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
        case InputExterior.standard:
          result = (frameSize - lineHeight) * (isTop ? 0.75 : 0.25); // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
      }
    }
    return result;
  }
  // Get left/right padding for the GrnFrameInpu element.
  public static paddingHor(exterior: InputExterior, frameSizeVal: number, configLabelPd: number | undefined): number | null {
    let result: number | null = configLabelPd || null;
    if (frameSizeVal > 0 && (!result || result <= 0)) {
      if (exterior === InputExterior.outlined) {
        result = Math.round(100 * 0.25 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.25*var(--size)); // TODO #2
      } else if (exterior === InputExterior.underline) {
        result = Math.round(100 * 0.21428 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.21428*var(--size));// TODO #2
      }
    }
    return result;
  }

  public static paddingVertical(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number): PaddingVertical {
    const labelPaddingTop = InputLabelUtil.paddingVer(true, exterior, frameSizeValue, lineHeight);
    const labelPaddingBottom = InputLabelUtil.paddingVer(false, exterior, frameSizeValue, lineHeight);
    return { labelPaddingTop, labelPaddingBottom };
  }

  // Determines the y transform value at the shrink position (top).
  public static translateY(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight > 0) {
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
  public static translate2Y(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number): number | null {
    let result: number | null = null;
    if (exterior != null && frameSizeValue > 0 && lineHeight > 0) {
      result = Math.round(100 * ((frameSizeValue - lineHeight) * (InputExterior.standard === exterior ? 0.75 : 0.5))) / 100;
    }
    return result;
  }

  public static translateVertical(exterior: InputExterior | null, frameSizeValue: number, lineHeight: number): TranslateVertical {
    const labelTranslateY = InputLabelUtil.translateY(exterior, frameSizeValue, lineHeight);
    const label2TranslateY = InputLabelUtil.translate2Y(exterior, frameSizeValue, lineHeight);
    return { labelTranslateY, label2TranslateY };
  }
}
