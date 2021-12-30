import { Exterior } from './exterior.interface';
import { FrameSize } from './frame-size.interface';
import { OrnamAlign } from './ornam-align.interface';

export interface GrnFrameInputConfig {
  exterior?: Exterior;
  frameSize?: FrameSize;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  ornamLfAlign?: OrnamAlign;
  ornamRgAlign?: OrnamAlign;
  // For "outlined" mode.
  oLabelPd?: number; // px
  // For "underline" mode.
  uLabelPd?: number; // px
  // For "standard" mode.
  sLabelPd?: number; // px
}

export class GrnFrameInputConfigUtil {
  public static getLabelPaddingHor(frameSizeVal: number, exterior: Exterior | null, config: GrnFrameInputConfig | null): number | null {
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
