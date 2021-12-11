import { Exterior } from '../interfaces/exterior.interface';
import { FrameSize } from '../interfaces/frame-size.interface';

export interface GrnFrameInputConfig {
  exterior?: Exterior;
  frameSize?: FrameSize;
  isLabelShrink?: boolean;
  hiddenLabel?: boolean;
}
