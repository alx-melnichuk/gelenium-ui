import { ButtonExterior } from './button-exterior.interface';
import { FrameSize } from './frame-size.interface';

export interface GrnButtonConfig {
  exterior?: ButtonExterior;
  frameSize?: FrameSize;
  frameSizeValue?: number;
  labelPd?: number; // px
  isNoRipple?: boolean;
}
