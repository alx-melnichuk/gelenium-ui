import { Exterior } from '../interfaces/exterior.interface';
import { FrameSize } from '../interfaces/frame-size.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';

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
