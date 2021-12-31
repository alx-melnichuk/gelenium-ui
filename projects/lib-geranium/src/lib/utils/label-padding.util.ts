import { Exterior } from '../interfaces/exterior.interface';
import { GrnFrameInputConfig } from '../interfaces/grn-frame-input-config.interface';

export class LabelPaddingUtil {
  // Get the top or bottom padding for the GrnFrameInpu element.
  public static ver(isTop: boolean, exterior: Exterior | null, frameSize: number, lineHeight: number): string | null {
    let result: string | null = null;
    if (exterior != null && frameSize > 0 && lineHeight > 0) {
      switch (exterior) {
        case Exterior.outlined:
          result = String((frameSize - lineHeight) / 2) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))/2)
          break;
        case Exterior.underline:
          result = String((frameSize - lineHeight) * (isTop ? 0.75 : 0.25)) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
        case Exterior.standard:
          result = String((frameSize - lineHeight) * (isTop ? 0.75 : 0.25)) + 'px'; // calc((var(--size) - var(--gfi-ln-hg))*0.75)
          break;
      }
    }
    return result;
  }
  // Get left/right padding for the GrnFrameInpu element.
  public static hor(frameSizeVal: number, exterior: Exterior | null, config: GrnFrameInputConfig | null): number | null {
    let result: number | null = null;
    if (frameSizeVal > 0 && !!exterior) {
      switch (exterior) {
        case Exterior.outlined:
          result = config?.oLabelPd || Math.round(100 * 0.25 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.25*var(--size)); // TODO #2
          break;
        case Exterior.underline:
          result = config?.uLabelPd || Math.round(100 * 0.21428 * frameSizeVal) / 100; // --lbl-pd-lf: calc(0.21428*var(--size));// TODO #2
          break;
        case Exterior.standard:
          result = config?.sLabelPd || 0; // --lbl-pd: 0px;// TODO #2
          break;
      }
    }
    return result;
  }
}
