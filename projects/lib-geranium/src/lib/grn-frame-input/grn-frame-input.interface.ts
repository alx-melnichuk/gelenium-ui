import { Exterior } from '../interfaces/exterior.interface';
import { FrameSize } from '../interfaces/frame-size.interface';
import { OrnamAlign } from '../interfaces/ornam-align.interface';

export interface GrnFrameInputConfig {
  exterior?: Exterior;
  frameSize?: FrameSize;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
  ornamAlign?: OrnamAlign;
  ornamEndAlign?: OrnamAlign;
}
