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
