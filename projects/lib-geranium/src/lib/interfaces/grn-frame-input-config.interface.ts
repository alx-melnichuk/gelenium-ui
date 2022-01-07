import { Exterior } from './exterior.interface';
import { FrameSize } from './frame-size.interface';
import { OrnamAlign } from './ornam-align.interface';

export interface GrnFrameInputConfig {
  exterior?: Exterior;
  frameSize?: FrameSize;
  frameSizeValue?: number;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  labelPd?: number; // px
  ornamLfAlign?: OrnamAlign;
  ornamRgAlign?: OrnamAlign;
}
